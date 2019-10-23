import * as PIXI from 'pixi.js'
import { Container, Player } from '../types/game_types'


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

export const collided = (player: Player, object: Container | PIXI.Sprite) => {

  if (player.sprite.y < (object.y + object.height) &&
      (player.sprite.y + player.sprite.height) > object.y &&
      player.sprite.x < (object.x + object.width) &&
      (player.sprite.x + player.sprite.width) > object.x){
        console.log('collision')
        return true;
      }
  // check if PLAYER BOTTOM hit OBJECT top
  // if (player.sprite.y + player.sprite.width > object.y){
  //   // console.log('collided top')
  // }
  // // check if PLAYER TOP hit OBJECT bottom
  // if (player.sprite.y < object.y + object.height){
  //   console.log('collided bottom')
  // }
}