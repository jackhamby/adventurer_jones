import { Creature } from './creature';
import { contain } from '../helpers/game_helpers';
import { APPCONTAINER, GRAVITY } from '../helpers/contants';
import { AppState, Tile } from '../types/game_types';
import { app } from '../components/application';
import * as PIXI from 'pixi.js';

export class Knight extends Creature {


    constructor(appState: AppState){
        super(appState);
        this.sprite = new PIXI.Sprite(app.loader.resources["./knight.png"].texture)
    }


}