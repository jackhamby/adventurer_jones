import * as PIXI from 'pixi.js';

export interface Player {
    sprite: PIXI.Sprite;
    name: string;
    isFlying: boolean;
    xVelocity: number;
    yVelocity: number;
}

export interface Container {
    x: number;
    y: number;
    width: number;
    height: number;
}

export interface PlayerAttributes {
    jump: number;
    moveSpeed: number;
}

