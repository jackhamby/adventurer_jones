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
    isFlying: boolean

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
        this.healthBar = new PIXI.Graphics();
        this.isFlying = true;
    }

 
    update(){
        this.renderHealthBar()

        this.sprite.x += this.xVelocity;
        contain(this, APPCONTAINER);
        this.appState.tiles.forEach((tile: Tile) => {
            
            collided(this, tile, this.xVelocity, 0);
        });

        this.sprite.y += this.yVelocity;
        this.appState.tiles.forEach((tile: Tile) => {
            collided(this, tile, 0, this.yVelocity);
        });

        // Apply gravity
        this.applyGravity();

    }
    

    applyGravity(){
        if (this.yVelocity < 0 || this.isFlying){
            this.yVelocity += GRAVITY;        
        }
    }

    renderHealthBar(){
        this.healthBar.clear();
        this.healthBar.beginFill(0xFFFF00);
        this.healthBar.lineStyle(1, 0xFFFFFF);
        this.healthBar.drawRect(this.sprite.x, this.sprite.y - (this.sprite.height / 4), this.sprite.width, 1);
        app.stage.addChild(this.healthBar)
    }





}