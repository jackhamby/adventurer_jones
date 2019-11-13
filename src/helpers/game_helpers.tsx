import * as PIXI from 'pixi.js'
import { Container, Player, Tile, AppState } from '../types/game_types'
import { Creature } from '../units/creature';
import { Kobold } from '../units/kobold';
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


export const createEnemy = (appState: AppState) => {
  const enemy = new Kobold(appState);
  enemy.sprite.x = 500;
  return enemy
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


export const collideTiles = (creature: Creature, object: Container, xVelocity: number, yVelocity: number) => {
  if (creature.sprite.y < (object.y + object.height) &&
      (creature.sprite.y + creature.sprite.height) > object.y &&
      creature.sprite.x < (object.x + object.width) &&
      (creature.sprite.x + creature.sprite.width) > object.x){  
        if (xVelocity > 0){
          creature.sprite.x = object.x - creature.sprite.width;
        }
        if (xVelocity < 0){
          creature.sprite.x = object.x + object.width;
        }
        if (yVelocity > 0){
            creature.sprite.y = object.y - creature.sprite.height;
            creature.yVelocity = 0;   
        }
        if (yVelocity < 0){
          creature.sprite.y = object.y + object.height;
        }
        return true;
      }
      return false;
}


export const pCollidedTiles = (projectile: Projectile, object: Tile, xVelocity: number, yVelocity: number) => {
  if (projectile.sprite.y < (object.y + object.height) &&
    (projectile.sprite.y + projectile.sprite.height) > object.y &&
    projectile.sprite.x < (object.x + object.width) &&
    (projectile.sprite.x + projectile.sprite.width) > object.x) {
    if (xVelocity > 0) {
      projectile.sprite.x = object.x - projectile.sprite.width;
      projectile.xVelocity = 0;
    }
    if (xVelocity < 0) {
      projectile.sprite.x = object.x + object.width;
      projectile.xVelocity = 0;
    }
    if (yVelocity > 0) {
      projectile.sprite.y = object.y - projectile.sprite.height;
      projectile.yVelocity = 0;
    }
    if (yVelocity < 0) {
      projectile.sprite.y = object.y + object.height;
    }
    return true;
  }
  return false;
}


export const pCollided = (projectile: Projectile, creature: Creature, xVelocity: number, yVelocity: number) => {
  const ss = {} as Projectile;
  const object = creature.sprite;
  if (projectile.sprite.y < (object.y + object.height) &&
    (projectile.sprite.y + projectile.sprite.height) > object.y &&
    projectile.sprite.x < (object.x + object.width) &&
    (projectile.sprite.x + projectile.sprite.width) > object.x) {
    if (xVelocity > 0) {
      projectile.sprite.x = object.x - projectile.sprite.width;
        creature.takeDamage(projectile.attributes.damage)
        projectile.destroy()
    }
    if (xVelocity < 0) {
      projectile.sprite.x = object.x + object.width;
      creature.takeDamage(projectile.attributes.damage)
      projectile.destroy()
    }
    if (yVelocity > 0) {
      projectile.sprite.y = object.y - projectile.sprite.height;
      creature.takeDamage(projectile.attributes.damage)
      projectile.destroy()
    }
    if (yVelocity < 0) {
      projectile.sprite.y = object.y + object.height;
      creature.takeDamage(projectile.attributes.damage)
      projectile.destroy()
    }
    return true;
  }
  return false;
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
