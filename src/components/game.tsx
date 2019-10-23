


import React, { useState, useEffect, useRef} from 'react';
import * as PIXI from 'pixi.js';
import { Player, Container } from '../types/game_types';
import { keyboard, hitWall, collided } from '../helpers/game_helpers';
import { appContainer, app } from './application';
import * as stages from '../helpers/stages';

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

var graphics = new PIXI.Graphics();

graphics.beginFill(0xFFFF00);

// set the line style to have a width of 5 and set the color to red
graphics.lineStyle(5, 0xFF0000);

// draw a rectangle
// graphics.drawRect(0, 0, 300, 200);

// stage.addChild(graphics);


const gameWidth = Math.floor(window.screen.width * .58)
const gameHeight = Math.floor(window.screen.height * .78)
const size = 5;
const tiles = [] as any;
const tileWidth = gameWidth / size;
const tileHeight = gameHeight / size;

// for (let i = 0; i < size; ++i){
//     const x = i * tileWidth;
//     for (let k = 0; k < size; ++k){
//         const y = k * tileHeight;
//         tiles.push(new Tile(x, y, tileWidth, tileHeight));
//         // graphics.drawRect(x, y, tileWidth, tileHeight);
//     }
// }
// console.log(stages.level_1)
const currentStage = stages.level_1;
const stageRows = currentStage.split('\n');
for (let i = 0; i < stageRows.length; ++i){
    const y = i * tileHeight;
    const stageRow = stageRows[i];
    for (let k = 0; k < stageRow.length; ++k){
        const x = k * tileWidth;
        const tile = stageRow.charAt(k);
        if (tile === '1'){
            tiles.push(new Tile(x, y, tileWidth, tileHeight))
            graphics.drawRect(x, y, tileWidth, tileHeight);
        }

    }
    // if ()
}
// console.log('\n')
// for (let i = 0; i < currentStage.length; ++i ){
//     console.log(currentStage.charAt(i))
// }
// console.log('\n')

// console.log(tiles)


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
        let collide = collided(player, tiles[0])
        // Sprite with in Y bounds, update sprite y based on velocity
        if (wallsHit.indexOf('bottom') === -1 &&
            wallsHit.indexOf('top') === -1  && 
            !collide){
                player.sprite.y += player.yVelocity;
            }
        else{
            // Sprite hit bottom, set isFlying to false
            if (wallsHit.indexOf('bottom') != -1){
                player.isFlying = false;
            }
        }
        // Sprite with in X bounds, update sprite x based on velocity
        if (wallsHit.indexOf('right') === -1 && 
            wallsHit.indexOf('left') === -1){
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
        app.stage.addChild(graphics);
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