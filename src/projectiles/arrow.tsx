import { Creature } from '../units/creature';
import { contain, collided } from '../helpers/game_helpers';
import { APPCONTAINER, GRAVITY } from '../helpers/contants';
import { AppState, Tile } from '../types/game_types';
import { app } from '../components/application';
import * as PIXI from 'pixi.js';
import { Projectile } from './projectile';


export class Arrow extends Projectile {
    constructor(appState: AppState, x: number, y: number, xVelocity: number, yVelocity: number){
        super(appState, x, y, xVelocity, yVelocity);
        // this.sprite = new PIXI.Sprite(app.loader.resources["./arrow.png"].texture);
        this.sprite.rotation = this.getRotation();
        // this.sprite.rotation = -1

    }

    getRotation(){
        if (this.xVelocity <= -1){
            return (135 * (Math.PI/180))
        }
        if (this.xVelocity >= 1){
            return (-45 * (Math.PI/180))
        }
        if (this.yVelocity <= -1){
            return (-135 * (Math.PI/180))
        }
        if (this.yVelocity >= 1){
            return (45 * (Math.PI/180))

        }

        return 0;
    }


}