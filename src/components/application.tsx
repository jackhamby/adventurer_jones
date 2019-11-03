

import React, { useState, useEffect, useCallback} from 'react';
import './application.css';
import { Game } from './game';
import {Container} from '../types/game_types';
import * as PIXI from 'pixi.js';
import {GAME_WIDTH, GAME_HEIGHT } from '../helpers/contants';


export const app = new PIXI.Application({ 
    width: GAME_WIDTH, 
    height: GAME_HEIGHT,                       
    antialias: true, 
    transparent: false, 
    resolution: 1
  }
);

export const Application = (props: any) => {

    const gameContainer = useCallback(node => {
        if (node !== null ){
            node.appendChild(app.view)
        }
    }, []);

    useEffect(() => {

    }, [gameContainer])

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