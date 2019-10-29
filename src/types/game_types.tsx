import * as PIXI from 'pixi.js';

export interface Enemy {
    sprite: PIXI.Sprite;
    xVelocity: number;
    yVelocity: number;
    attributes: Attributes;
}

export interface Player {
    sprite: PIXI.Sprite;
    name: string;
    isFlying: boolean;
    xVelocity: number;
    yVelocity: number;
    attributes: Attributes;
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

