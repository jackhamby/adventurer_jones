import * as PIXI from "pixi.js";
import { contain, collideTiles, createEnemy } from '../helpers/game_helpers';
import { APPCONTAINER, GRAVITY } from '../helpers/contants';
import { Attributes, AppState, Tile } from '../types/game_types';
import { app } from '../components/application';
export class Creature {
    xVelocity: number;
    yVelocity: number;
    sprite: PIXI.Sprite;
    attributes:Attributes;
    currentAttributes: Attributes;
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
        this.currentAttributes = {
            jump: -10,
            moveSpeed: 2,
            health: 100
        } as Attributes
        this.appState = appState;
        this.healthBar = new PIXI.Graphics();
        this.isFlying = true;
    }

 
    update(){
        this.renderHealthBar()

        this.sprite.x += this.xVelocity;
        contain(this, APPCONTAINER);
        this.appState.tiles.forEach((tile: Tile) => {  
            collideTiles(this, tile, this.xVelocity, 0);
        });

        this.sprite.y += this.yVelocity;
        this.appState.tiles.forEach((tile: Tile) => {
            collideTiles(this, tile, 0, this.yVelocity);
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
        const rectWidthPercent = (this.currentAttributes.health / this.attributes.health);
        this.healthBar.drawRect(this.sprite.x, this.sprite.y - (this.sprite.height / 4), (this.sprite.width * rectWidthPercent), 1);
        app.stage.addChild(this.healthBar)
    }


    takeDamage(damage: number){
        this.currentAttributes.health -= damage;
        if (this.currentAttributes.health <= 0){
            this.destroy();
        }
    }

    destroy(){
        const index = this.appState.enemies.indexOf(this);
        if (index >= 0){
            this.appState.enemies.splice(index, 1);
        }
        app.stage.removeChild(this.sprite);
        this.healthBar.clear();

        // Make a new enemt
        // these needs to be abstracted to helper method
        const enemy = createEnemy(this.appState)
        this.appState.enemies.push(enemy);
        app.stage.addChild(enemy.sprite);
    }

}