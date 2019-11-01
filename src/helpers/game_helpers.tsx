import * as PIXI from 'pixi.js'
import { Container, Player, Enemy } from '../types/game_types'

export const margin = 5;

export interface Key {
    value: any;
    isDown: boolean;
    isUp: boolean;
    press: Function;
    release: Function;
    downHandler: Function;
    upHandler: Function;
    unsubscribe: Function;
}

export const keyboard = (value: string): Key => {
    let key = {
        value: value,
        isDown: false,
        isUp: false,
        press: () => {},
        release: () => {},
        upHandler: (event: any) => {},
        downHandler: (event: any) => {},
        unsubscribe: () => {},
    } as Key;
    //The `downHandler`
    key.downHandler = (event: any) => {
      if (event.key === key.value) {
        if (key.isUp && key.press) key.press();
        key.isDown = true;
        key.isUp = false;
        event.preventDefault();
      }
    };
  
    //The `upHandler`
    key.upHandler = (event: any) => {
      if (event.key === key.value) {
        if (key.isDown && key.release) key.release();
        key.isDown = false;
        key.isUp = true;
        event.preventDefault();
      }
    };
  
    //Attach event listeners
    const downListener = key.downHandler.bind(key);
    const upListener = key.upHandler.bind(key);
    
    window.addEventListener(
      "keydown", downListener, false
    );
    window.addEventListener(
      "keyup", upListener, false
    );
    
    // Detach event listeners
    key.unsubscribe = () => {
      window.removeEventListener("keydown", downListener);
      window.removeEventListener("keyup", upListener);
    };
    
    return key;
  }


export const hitWall = (player: Player, container: Container) => {
    const sprite = player.sprite;
    const walls = [];
    // left collision
    if (sprite.x + player.xVelocity < container.x){
        walls.push("left");
    }
    // right collision
    if ((sprite.x + sprite.width) + player.xVelocity > (container.x + container.width)){
        walls.push("right");
    }
    // top collision
    if (sprite.y + player.yVelocity < container.y){
      walls.push("top");
    }
    // bootm collision
    if ((sprite.y + sprite.height) + player.yVelocity > (container.y + container.height)){
      walls.push("bottom");
    }
    return walls;
}

export const collided = (player: Player | Enemy, object: Container | PIXI.Sprite) => {
  // Check if player collided with given object
  if (player.sprite.y< (object.y + object.height) &&
      (player.sprite.y + player.sprite.height) > object.y &&
      player.sprite.x < (object.x + object.width) &&
      (player.sprite.x + player.sprite.width) > object.x){  

        // Player is on top of given object, allow movement in x
        if ((player.sprite.y + player.sprite.height - margin) >= object.y){
          player.sprite.x -= player.xVelocity;
        }        

        // Player is against side
        if (player.sprite.x >= (object.x + object.width) ||
        (player.sprite.x + player.sprite.width) <= object.x){
          player.sprite.y += player.yVelocity;
          console.log('do somthing here')
        }
        // if ((player.sprite.x + player.sprite.width) <= object.x){
        //   player.sprite.y += player.yVelocity;
        // }
        player.sprite.y -= player.yVelocity;
        player.yVelocity = 0;
        console.log('not moving y')
        return true;
      }
    return false;
}


export const contain = (player: Player | Enemy, container: Container) => {

  let collision = undefined;
  const sprite = player.sprite;
  //Left
  if (sprite.x < container.x) {
    sprite.x = container.x;
    collision = "left";
  }

  //Top
  if (sprite.y < container.y) {
    sprite.y = container.y;
    collision = "top";
  }

  //Right
  if (sprite.x + sprite.width > container.width) {
    sprite.x = container.width - sprite.width;
    collision = "right";
  }

  //Bottom
  if (sprite.y + sprite.height > container.height) {
    sprite.y = container.height - sprite.height;
    collision = "bottom";
    player.yVelocity = 0;
    
  }

  //Return the `collision` value
  return collision;
}