import * as PIXI from "pixi.js";
import { contain, collided } from '../helpers/game_helpers';
export class Creature {
    xVelocity: number;
    yVelocity: number;
    sprite: PIXI.Sprite;
    constructor(){
        this.xVelocity = 0;
        this.yVelocity = 0;
        this.sprite = {} as PIXI.Sprite;
    }

    update(){
        this.sprite.y += this.yVelocity;
        this.sprite.x += this.xVelocity;
        
        contain(player, appContainer);
        tiles.forEach((tile: Tile) => {
            collided(player, tile)
        });
        // Apply gravity
        // Gravity applies in GRAVITY px/tick
        // if (player.yVelocity < MAX_GRAVITY){
            player.yVelocity += GRAVITY;        
        // }
    }




}