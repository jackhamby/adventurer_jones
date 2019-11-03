import { Creature } from './creature';
import { contain, collided } from '../helpers/game_helpers';
import { APPCONTAINER, GRAVITY } from '../helpers/contants';
import { AppState, Tile, Attributes } from '../types/game_types';
import { app } from '../components/application';
import * as PIXI from 'pixi.js';

export class Kobold extends Creature {

    constructor(appState: AppState){
        super(appState);
        this.attributes = {
            jump: -10,
            moveSpeed: 1,
            health: 25
        } as Attributes;
        this.sprite = new PIXI.Sprite(app.loader.resources["./kobold_king.png"].texture)

    }

    update(){
        const player = this.appState.player.creature;
        if (this.sprite.x > player.sprite.x){
            // move to the left
            this.xVelocity = -this.attributes.moveSpeed
        }
        // Enemy is to the left of the plyer
        else if (this.sprite.x < player.sprite.x){
            this.xVelocity = this.attributes.moveSpeed;
        }
        // Enemy is on top of
        else{
            this.xVelocity = 0;
        }
        this.sprite.y += this.yVelocity;
        this.sprite.x += this.xVelocity;

        contain(this, APPCONTAINER);
        this.appState.tiles.forEach((tile: Tile) => {
            collided(this, tile)
        });
        // Apply gravity
        // Gravity applies in GRAVITY px/tick
        // if (player.yVelocity < MAX_GRAVITY){
        this.yVelocity += GRAVITY;        
        // }
    }
}