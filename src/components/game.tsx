


import React, { useState, useEffect, useRef} from 'react';
import * as PIXI from 'pixi.js';
import { Player, Container, Tile, Enemy } from '../types/game_types';
import { keyboard, hitWall, collided, contain } from '../helpers/game_helpers';

import { appContainer, app } from './application';
import * as stages from '../helpers/stages';
import { GRAVITY, MAX_GRAVITY } from '../helpers/contants';

var graphics = new PIXI.Graphics();

graphics.beginFill(0xFFFF00);

// set the line style to have a width of 5 and set the color to red
graphics.lineStyle(5, 0xFF0000);

// draw a rectangle
// graphics.drawRect(0, 0, 300, 200);

// stage.addChild(graphics);


const gameWidth = Math.floor(window.screen.width * .58)
const gameHeight = Math.floor(window.screen.height * .78)
const size = 10;
const tiles = [] as any;
const tileWidth = gameWidth / size;
const tileHeight = gameHeight / size;
const currentStage = stages.test_level;

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


export const Game = (props: any) => {

    const [player, setPlayer] = useState(
        {
            name: "newplayer",
            sprite: {} as PIXI.Sprite,
            xVelocity: 0,
            yVelocity: 0,
            attributes: {
                jump: -12,
                moveSpeed: 1.5
            }
        } as Player
    );
    
    const [enemies, setEnemies] = useState(
        [
            {
                sprite: {} as PIXI.Sprite,
                xVelocity: 0,
                yVelocity: 0,
                attributes: {
                    jump: -15,
                    moveSpeed: 0.5
                }
            } as Enemy
        ]
    );
    
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
                .add("./kobold_king.png")
                .load(init);
        }
    }, [player, isReady])

    const handleKeyEvents = () => {
        keys.up.press = () => {
            player.yVelocity = -player.attributes.moveSpeed;
        };
        keys.up.release = () => {
            if (player.yVelocity < 0)
            player.yVelocity = 0;
        };

        keys.down.press = () => {
            player.yVelocity = player.attributes.moveSpeed;
        };
        keys.down.release = () => {
            if (player.yVelocity > 0)
                player.yVelocity = 0;
        };

        keys.left.press = () => {
            player.xVelocity = -player.attributes.moveSpeed;
        };
        keys.left.release = () => {
            if (player.xVelocity < 0)
                player.xVelocity = 0;
        };

        keys.right.press = () => {
            player.xVelocity = player.attributes.moveSpeed;
            console.log(enemies[0].xVelocity)

        };
        keys.right.release = () => {
            if (player.xVelocity > 0)
                player.xVelocity = 0;
        };

        keys.jump.press = () => {
            if (player.yVelocity >= 0){
                player.yVelocity = player.attributes.jump;
                player.isFlying = true;
            }
        }
        
    }

    const updatePlayer = () => {
        player.sprite.y += player.yVelocity;
        player.sprite.x += player.xVelocity;
        contain(player, appContainer);
        tiles.forEach((tile: Tile) => {
            collided(player, tile)
        });
        // Apply gravity
        // Gravity applies in GRAVITY px/tick
        // if (player.yVelocity < MAX_GRAVITY){
            player.yVelocity += GRAVITY;        
        // }
    }

    const updateEnemies = () => {
        enemies.forEach((enemy) => {
            // Enemy is to the right of the player
            if (enemy.sprite.x > player.sprite.x){
                // move to the left
                enemy.xVelocity = -enemy.attributes.moveSpeed
            }
            // Enemy is to the left of the plyer
            else if (enemy.sprite.x < player.sprite.x){
                enemy.xVelocity = enemy.attributes.moveSpeed;
            }
            // Enemy is on top of
            else{
                enemy.xVelocity = 0;
            }
            enemy.sprite.y += enemy.yVelocity;
            enemy.sprite.x += enemy.xVelocity;
            contain(enemy, appContainer);
            tiles.forEach((tile: Tile) => {
                collided(enemy, tile)
            });
            // Apply gravity
            // Gravity applies in GRAVITY px/tick
            // if (enemy.yVelocity < MAX_GRAVITY){
                enemy.yVelocity += GRAVITY;        
            // }
        })
  

    }

    const gameLoop = (delta: any) => {
        updatePlayer();
        updateEnemies();
    }

    const init = () => {
        player.sprite = new PIXI.Sprite(app.loader.resources["./knight.png"].texture)
        enemies[0].sprite = new PIXI.Sprite(app.loader.resources["./kobold_king.png"].texture)
        enemies[0].sprite.x = 500;
        enemies[0].sprite.y = 0;
        setIsReady(true);
        setPlayer(player);
        setEnemies(enemies);
        handleKeyEvents();
        app.stage.addChild(player.sprite);
        app.stage.addChild(enemies[0].sprite);
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