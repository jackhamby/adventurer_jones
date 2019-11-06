import * as PIXI from 'pixi.js'
import { Container, Player, Enemy, Tile } from '../types/game_types'
import { Creature } from '../units/creature';
import { GAME_HEIGHT, GAME_WIDTH } from '../helpers/contants';
import { Projectile } from '../projectiles/projectile';
import { create } from 'domain';


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

export const collided = (creature: Creature | Projectile, object: Container | PIXI.Sprite, xVelocity: number, yVelocity: number) => {
  const ss = {} as Projectile;
  if (creature.sprite.y < (object.y + object.height) &&
      (creature.sprite.y + creature.sprite.height) > object.y &&
      creature.sprite.x < (object.x + object.width) &&
      (creature.sprite.x + creature.sprite.width) > object.x){  
        if (creature.attributes.moveSpeed == 20){
          if (object.width < 50){
            console.log('arrow collide')
          }
        }
        if (xVelocity > 0){
          // console.log('hit right')
          creature.sprite.x = object.x - creature.sprite.width;
        }
        if (xVelocity < 0){
          // console.log('hit left')
          creature.sprite.x = object.x + object.width;

        }
        if (yVelocity > 0){
          // console.log('hit top')
          creature.sprite.y = object.y - creature.sprite.height;
          creature.yVelocity = 0;

        }
        if (yVelocity < 0){
          creature.sprite.y = object.y + object.height;
          // console.log('hit bottom')
        }
      }
}

export const contain = (creature: Creature | Projectile, container: Container | PIXI.Sprite) => {

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
