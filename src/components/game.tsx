


import React, { useState, useEffect, useRef} from 'react';
import * as PIXI from 'pixi.js';
import { Player, Container, Tile, Enemy, AppState } from '../types/game_types';
import { keyboard, hitWall, collided, contain, generateTiles } from '../helpers/game_helpers';
import { Creature } from '../units/creature';
import { Kobold } from '../units/kobold';
import { Knight } from '../units/knight';
import { app } from './application';
import * as stages from '../helpers/stages';
import { GRAVITY, MAX_GRAVITY, GAME_HEIGHT, GAME_WIDTH } from '../helpers/contants';

var graphics = new PIXI.Graphics();

graphics.beginFill(0xFFFF00);

// set the line style to have a width of 5 and set the color to red
graphics.lineStyle(5, 0xFF0000);



export const Game = (props: any) => {

    const [player, setPlayer] = useState(
        {
            // creature: new Creature(),
        } as Player
    );
    
    const [enemies, setEnemies] = useState(
        [
            {
                // creature: new Creature(),
            } as Enemy
        ]
        // []
    );

    const [tiles, setTiles] = useState(generateTiles(stages.test_level))

    const [isReady, setIsReady] = useState(false);

    const [appState, setAppState] = useState(
        {
            player,
            enemies,
            tiles,
            isReady
        } as AppState
    )
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
        const creature = player.creature;
        keys.up.press = () => {
            creature.yVelocity = -creature.attributes.moveSpeed;
        };
        keys.up.release = () => {
            if (creature.yVelocity < 0)
            creature.yVelocity = 0;
        };

        keys.down.press = () => {
            creature.yVelocity = creature.attributes.moveSpeed;
        };
        keys.down.release = () => {
            if (creature.yVelocity > 0)
            creature.yVelocity = 0;
        };

        keys.left.press = () => {
            creature.xVelocity = -creature.attributes.moveSpeed;
        };
        keys.left.release = () => {
            if (creature.xVelocity < 0)
            creature.xVelocity = 0;
        };

        keys.right.press = () => {
            creature.xVelocity = creature.attributes.moveSpeed;

        };
        keys.right.release = () => {
            if (creature.xVelocity > 0)
            creature.xVelocity = 0;
        };

        keys.jump.press = () => {
            if (creature.yVelocity >= 0){
                creature.yVelocity = creature.attributes.jump;
                // creature.isFlying = true;
            }
        }
        
    }


    const gameLoop = (delta: any) => {
        // updatePlayer();
        player.creature.update()
        // updateEnemies();
        enemies.forEach((enemy) => {
            enemy.creature.update()
        });
    }

    const init = () => {
        player.creature = new Knight(appState);
        enemies[0].creature = new Kobold(appState);
        console.log(player.creature.sprite)
        // player.creature.sprite = new PIXI.Sprite(app.loader.resources["./knight.png"].texture)
        // enemies[0].creature.sprite = new PIXI.Sprite(app.loader.resources["./knight.png"].texture)

        enemies[0].creature.sprite.x = 500;
        tiles.forEach((tile: Tile) => {
            graphics.drawRect(tile.x, tile.y, tile.width, tile.height);
        })
        setIsReady(true);
        setPlayer(player);
        setEnemies(enemies);
        handleKeyEvents();
        app.stage.addChild(player.creature.sprite);
        app.stage.addChild(enemies[0].creature.sprite);
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