import * as PIXI from 'pixi.js'
import { Container, Player, Enemy, Tile } from '../types/game_types'
import { Creature } from '../units/creature';
import { GAME_HEIGHT, GAME_WIDTH } from '../helpers/contants';


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

export const generateTiles = (stage: string): Tile[] => {
  const tiles = [];
  const stageRows = stage.split('\n');
  const tileWidth = GAME_WIDTH / stageRows.length;
  const tileHeight = GAME_HEIGHT / stageRows.length;
  for (let i = 0; i < stageRows.length; ++i){
      const y = i * tileHeight;
      const stageRow = stageRows[i];
      for (let k = 0; k < stageRow.length; ++k){
          const x = k * tileWidth;
          const tile = stageRow.charAt(k);
          if (tile === '1'){
              tiles.push(new Tile(x, y, tileWidth, tileHeight))
          }

      }
  }
  return tiles;
}


export const hitWall = (creature: Creature, container: Container) => {
    const sprite = creature.sprite;
    const walls = [];
    // left collision
    if (sprite.x + creature.xVelocity < container.x){
        walls.push("left");
    }
    // right collision
    if ((sprite.x + sprite.width) + creature.xVelocity > (container.x + container.width)){
        walls.push("right");
    }
    // top collision
    if (sprite.y + creature.yVelocity < container.y){
      walls.push("top");
    }
    // bootm collision
    if ((sprite.y + sprite.height) + creature.yVelocity > (container.y + container.height)){
      walls.push("bottom");
    }
    return walls;
}

export const collided = (creature: Creature, object: Container | PIXI.Sprite) => {
  // Check if player collided with given object
  if (creature.sprite.y< (object.y + object.height) &&
      (creature.sprite.y + creature.sprite.height) > object.y &&
      creature.sprite.x < (object.x + object.width) &&
      (creature.sprite.x + creature.sprite.width) > object.x){  

        // Player is on top of given object, allow movement in x
        if ((creature.sprite.y + creature.sprite.height - margin) >= object.y){
          creature.sprite.x -= creature.xVelocity;
        }        

        // Player is against side
        if (creature.sprite.x >= (object.x + object.width) ||
        (creature.sprite.x + creature.sprite.width) <= object.x){
          creature.sprite.y += creature.yVelocity;
          console.log('do somthing here')
        }
        // if ((player.sprite.x + player.sprite.width) <= object.x){
        //   player.sprite.y += player.yVelocity;
        // }
        creature.sprite.y -= creature.yVelocity;
        creature.yVelocity = 0;
        console.log('not moving y')
        return true;
      }
    return false;
}


export const contain = (creature: Creature, container: Container) => {

  let collision = undefined;
  const sprite = creature.sprite;
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
    creature.yVelocity = 0;
    
  }

  //Return the `collision` value
  return collision;
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
