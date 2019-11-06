import { Creature } from '../units/creature';
import { contain, collided } from '../helpers/game_helpers';
import { APPCONTAINER, GRAVITY } from '../helpers/contants';
import { AppState, Tile, Attributes, Enemy } from '../types/game_types';
import { app } from '../components/application';
import * as PIXI from 'pixi.js';

export class Projectile {
    xVelocity: number;
    yVelocity: number;
    sprite: PIXI.Sprite;
    attributes: Attributes;
    appState: AppState;
    isFlying:boolean;

    constructor(appState: AppState, x: number, y: number, xVelocity: number, yVelocity: number){
        this.appState = appState;
        this.xVelocity = xVelocity;
        this.yVelocity = yVelocity;
        this.sprite = new PIXI.Sprite(app.loader.resources["./arrow.png"].texture);
        this.sprite.x = x;
        this.sprite.y = y;
        this.attributes = {
            moveSpeed: 20
        } as Attributes;
        this.sprite.rotation = 0;
        this.sprite.anchor.set(1, 1);
        this.isFlying = true;
    }

    update(){
        // this.sprite.y += (this.yVelocity * this.attributes.moveSpeed);
        // this.sprite.x += (this.xVelocity * this.attributes.moveSpeed);
        // contain(this, APPCONTAINER);
        this.sprite.x += (this.xVelocity * this.attributes.moveSpeed);
        contain(this, APPCONTAINER);
        this.appState.tiles.forEach((tile: Tile) => {
            collided(this, tile, this.xVelocity, 0);
        });

        this.sprite.y += (this.yVelocity * this.attributes.moveSpeed);
        this.appState.tiles.forEach((tile: Tile) => {
            collided(this, tile, 0, this.yVelocity);
        });
        this.appState.enemies.forEach((enemy: Enemy) => {
            collided(this, enemy.creature.sprite, this.xVelocity, 0)
        })
        this.appState.enemies.forEach((enemy: Enemy) => {
            collided(this, enemy.creature.sprite, 0, this.yVelocity)
        })
        // this.appState.tiles.forEach((tile: Tile) => {
        //     collided(this, tile)
        // });
    }

    getRotation(){
        return 0;
    }
}