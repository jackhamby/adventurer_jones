


import React, { useState, useEffect, useRef} from 'react';
import * as PIXI from 'pixi.js';
import { Player, Container, Tile, Enemy, AppState } from '../types/game_types';
import { keyboard, generateTiles } from '../helpers/game_helpers';
import { Creature } from '../units/creature';
import { Kobold } from '../units/kobold';
import { Knight } from '../units/knight';
import { Arrow } from '../projectiles/arrow';
import { Projectile } from '../projectiles/projectile';

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

    const [projectiles, setProjectiles] = useState([] as Projectile[]);

    const [tiles, setTiles] = useState(generateTiles(stages.test_level))

    const [isReady, setIsReady] = useState(false);

    const [appState, setAppState] = useState(
        {
            player,
            enemies,
            tiles,
            isReady, 
            projectiles
        } as AppState
    )
    const [keys, setKeys] = useState(
        {
            "up" : keyboard('w'),
            "down" : keyboard('s'),
            "left" : keyboard('a'),
            "right" : keyboard('d'),
            "jump" : keyboard(' '),
            "arrow_left" : keyboard('ArrowLeft'),
            "arrow_right" : keyboard('ArrowRight'),
            "arrow_up" : keyboard('ArrowUp'),
            "arrow_down" : keyboard('ArrowDown')
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
                .add("./arrow.png")
                .load(init);
        }
    }, [player, isReady])

    const handleKeyEvents = () => {
        const creature = player.creature;
        keys.arrow_left.press = () => {
            // console.log('fire left');
            const proj = new Arrow(appState, creature.sprite.x, creature.sprite.y, -1, 0);
            projectiles.push(proj);
            app.stage.addChild(proj.sprite);
        }
        keys.arrow_right.press = () => {
            // console.log('fire right')
            const proj = new Arrow(appState, creature.sprite.x, creature.sprite.y, 1, 0);
            projectiles.push(proj);
            app.stage.addChild(proj.sprite);
        }     
        keys.arrow_up.press = () => {
            // console.log('fire up')
            const proj = new Arrow(appState, creature.sprite.x, creature.sprite.y, 0, -1);
            projectiles.push(proj);
            app.stage.addChild(proj.sprite);
        }     
        keys.arrow_down.press = () => {
            // console.log('fire down')
            const proj = new Arrow(appState, creature.sprite.x, creature.sprite.y, 0, 1);
            projectiles.push(proj);
            app.stage.addChild(proj.sprite);
        }

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
                creature.isFlying = true;
                creature.yVelocity = creature.attributes.jump;
            }
        }
        
    }


    const gameLoop = (delta: any) => {
        player.creature.update()
        enemies.forEach((enemy) => {
            enemy.creature.update()
        });
        projectiles.forEach((projectile) => {
            projectile.update();
        })
    }

    const init = () => {
        player.creature = new Knight(appState);
        // Temporary testing enemy, logic
        // to randomly generate to come
        enemies[0].creature = new Kobold(appState);
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