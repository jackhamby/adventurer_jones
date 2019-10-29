

import React, { useState, useEffect, useCallback} from 'react';
import './application.css';
import { Game } from './game';
import {Container} from '../types/game_types';
import * as PIXI from 'pixi.js';


export const gameWidth = Math.floor(window.screen.width * .58)
export const gameHeight = Math.floor(window.screen.height * .78)

export const app = new PIXI.Application({ 
    width: gameWidth, 
    height: gameHeight,                       
    antialias: true, 
    transparent: false, 
    resolution: 1
  }
);

export const appContainer = {
    width: gameWidth, 
    height: gameHeight,  
    x: 0,
    y: 0
} as Container


export const Application = (props: any) => {

    const gameContainer = useCallback(node => {
        if (node !== null ){
            node.appendChild(app.view)
        }
    }, []);

    useEffect(() => {

    }, [gameContainer])

    console.log(gameContainer);
    return (
        <div className="container-fluid container"> 
            <div className="row top wrapper">
            header
            </div>
            <div className="row middle">
                <div id="game" className="col-8 game-container" ref={gameContainer}>
                    <Game/>
                </div>
                <div className="col-1"> 

                </div>
                <div className="col-3 game-detail-container wrapper">
                game detail
                </div>
            </div>
            <div className="row bottom wrapper">
                bottom
            </div>

        </div>
    );

}