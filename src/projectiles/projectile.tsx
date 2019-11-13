import { Creature } from '../units/creature';
import { contain, pCollided, pCollidedTiles, collideTiles } from '../helpers/game_helpers';
import { APPCONTAINER, GRAVITY } from '../helpers/contants';
import { AppState, Tile, Attributes } from '../types/game_types';
import { app } from '../components/application';
import * as PIXI from 'pixi.js';

export class Projectile {
    xVelocity: number;
    yVelocity: number;
    sprite: PIXI.Sprite;
    attributes: Attributes;
    appState: AppState;
    isFlying:boolean;
    // attached?: Creature;

    constructor(appState: AppState, x: number, y: number, xVelocity: number, yVelocity: number){
        this.appState = appState;
        this.xVelocity = xVelocity;
        this.yVelocity = yVelocity;
        this.sprite = new PIXI.Sprite(app.loader.resources["./arrow.png"].texture);
        this.sprite.x = x;
        this.sprite.y = y;
        this.attributes = {
            moveSpeed: 20,
            damage: 20,
        } as Attributes;
        this.sprite.rotation = 0;
        this.sprite.anchor.set(1, 1);
        this.isFlying = true;
        // this.attached = undefined;
    }

    update(){
        this.sprite.x += (this.xVelocity * this.attributes.moveSpeed);
        contain(this, APPCONTAINER);
        this.appState.tiles.forEach((tile: Tile) => {
            pCollidedTiles(this, tile, this.xVelocity, 0);
        });
        this.appState.enemies.forEach((enemy: Creature) => {
            pCollided(this, enemy, this.xVelocity, 0)
        })
        this.sprite.y += (this.yVelocity * this.attributes.moveSpeed);
        this.appState.tiles.forEach((tile: Tile) => {
            pCollidedTiles(this, tile, 0, this.yVelocity);
        });
        this.appState.enemies.forEach((enemy: Creature) => {
            pCollided(this, enemy, 0, this.yVelocity)
        })

    }

    getRotation(){
        return 0;
    }

    destroy(){
        const index = this.appState.projectiles.indexOf(this);
        if (index >= 0){
            this.appState.projectiles.splice(index, 1);
        }
        app.stage.removeChild(this.sprite);
        console.log(this.appState.projectiles.indexOf(this))
    }
}