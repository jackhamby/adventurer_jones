import * as PIXI from "pixi.js";
import { contain, collided } from '../helpers/game_helpers';
import { APPCONTAINER, GRAVITY } from '../helpers/contants';
import { Attributes, AppState, Tile } from '../types/game_types';
import { app } from '../components/application';
export class Creature {
    xVelocity: number;
    yVelocity: number;
    sprite: PIXI.Sprite;
    attributes:Attributes;
    appState: AppState;
    healthBar: PIXI.Graphics;

    constructor(appState: AppState){
        this.xVelocity = 0;
        this.yVelocity = 0;
        this.sprite = new PIXI.Sprite(app.loader.resources["./knight.png"].texture);
        this.attributes = {
            jump: -10,
            moveSpeed: 2,
            health: 100
        } as Attributes;
        this.appState = appState;
        this.healthBar = new PIXI.Graphics()
        this.healthBar.beginFill(0xFFFF00);

        // set the line style to have a width of 5 and set the color to red
        this.healthBar.lineStyle(5, 0xFF0000);
        this.healthBar.drawRect(this.sprite.x, this.sprite.y, 100, 100);

    }

    update(){
        // this.healthBar.clear();
        this.healthBar.drawRect(this.sprite.x, this.sprite.y, 100, 100);
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
        app.stage.addChild(this.healthBar)
        // }
    }




}