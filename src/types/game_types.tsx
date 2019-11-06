import * as PIXI from 'pixi.js';
import { Creature } from '../units/creature';
import { Projectile } from '../projectiles/projectile';

export interface AppState {
    enemies: Enemy[];
    player: Player;
    tiles: Tile[];
    isReady: boolean;
    projectiles: Projectile[];
}

export interface Enemy {
    creature: Creature;
}

export interface Player {
    creature: Creature;
}

export interface Container {
    x: number;
    y: number;
    width: number;
    height: number;
}

export interface Attributes {
    jump: number;
    moveSpeed: number;
    health: number;
}

export class Tile {
    x: number;
    y: number;
    width: number;
    height: number;

    constructor(x: number, y: number, width: number, height: number){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}

