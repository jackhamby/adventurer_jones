


import React, { useState, useEffect, useRef} from 'react';
import * as PIXI from 'pixi.js';
import { Player, Container } from '../types/game_types';
import { keyboard, hitWall } from '../helpers/game_helpers';

const gameWidth = 256;
const gameHeight = 256;

const app = new PIXI.Application({ 
    width: gameWidth, 
    height: gameHeight,                       
    antialias: true, 
    transparent: false, 
    resolution: 1
  }
);

const appContainer = {
    width: gameWidth, 
    height: gameHeight,  
    x: 0,
    y: 0
} as Container


document.body.appendChild(app.view);

export const Game = (props: any) => {

    const [player, setPlayer] = useState(
        {
            name: "newplayer",
            sprite: {} as PIXI.Sprite,
            xVelocity: 0,
            yVelocity: 0
        } as Player
    )
    const [isReady, setIsReady] = useState(false);
    const [keys, setKeys] = useState(
        {
            "up" : keyboard('w'),
            "down" : keyboard('s'),
            "left" : keyboard('a'),
            "right" : keyboard('d'),
            "jump" : keyboard(' '),
        }
    )
    
    useEffect(() => { 
        if (isReady){
            //do 
        }
        else{
            app.loader
                .add("./knight.png")
                .load(init);
        }
    }, [player, isReady])

    const handleKeyEvents = () => {
        keys.up.press = () => {
            player.yVelocity = -1;
        };
        keys.up.release = () => {
            if (player.yVelocity < 0)
            player.yVelocity = 0;
        };

        keys.down.press = () => {
            player.yVelocity = 1;
        };
        keys.down.release = () => {
            if (player.yVelocity > 0)
                player.yVelocity = 0;
        };

        keys.left.press = () => {
            player.xVelocity = -1;
        };
        keys.left.release = () => {
            if (player.xVelocity < 0)
                player.xVelocity = 0;
        };

        keys.right.press = () => {
            player.xVelocity = 1;
        };
        keys.right.release = () => {
            if (player.xVelocity > 0)
                player.xVelocity = 0;
        };

        keys.jump.press = () => {
            // if (!player.isFlying){
                player.yVelocity -= 10;
                player.isFlying = true;
            // }
        }
        
    }

    const updatePlayer = () => {
        let wallsHit = hitWall(player, appContainer)
        // Sprite with in Y bounds, update sprite y based on velocity
        if (wallsHit.indexOf('bottom') == -1 &&
            wallsHit.indexOf('top') == -1){
                player.sprite.y += player.yVelocity;
            }
        else{
            // Sprite hit bottom, set isFlying to false
            if (wallsHit.indexOf('bottom') != -1){
                player.isFlying = false;
            }
        }
        // Sprite with in X bounds, update sprite x based on velocity
        if (wallsHit.indexOf('right') == -1 && 
            wallsHit.indexOf('left') == -1){
                player.sprite.x += player.xVelocity;
            }

        // Apply gravity, max gravity is 3 px/tick
        if (player.yVelocity < 3){
            player.yVelocity += 1;        
        }
    }

    const gameLoop = (delta: any) => {
        updatePlayer();
    }

    const init = () => {
        player.sprite = new PIXI.Sprite(app.loader.resources["./knight.png"].texture)
        setIsReady(true);
        setPlayer(player);
        handleKeyEvents();
        app.stage.addChild(player.sprite);
        app.ticker.add(delta => gameLoop(delta))
    }


    return (
        <div> 
              <div className="container-fluid container"> 
                    <div className="row top-container">
                        {/* <HeaderWrapper></HeaderWrapper> */}
                    </div>
                    <div className="row center-container">
                        {/* <ConnectedGameWrapper update={this.onPlayerUpdate.bind(this)}></ConnectedGameWrapper>
                        <ConnectedPlayerListWrapper></ConnectedPlayerListWrapper> */}
                    </div>
                    <div className="row bottom-container">
                        {/* <PlayerDetailWrapper></PlayerDetailWrapper> */}
                    </div>
                </div>
        </div>
    )

}