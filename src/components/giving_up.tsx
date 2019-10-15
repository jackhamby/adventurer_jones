


import React, { useState, useEffect, useRef} from 'react';
import * as PIXI from 'pixi.js';
import { Player } from './game_wrapper';
import { keyboard } from '../helpers/keyboard';

let app = new PIXI.Application({ 
    width: 256, 
    height: 256,                       
    antialias: true, 
    transparent: false, 
    resolution: 1
  }
);
document.body.appendChild(app.view);

export const GivingUp = (props: any) => {

    const [player, setPlayer] = useState(
        {
            name: "newplayer",
            sprite: {} as PIXI.Sprite
        } as Player
    )
    const [isReady, setIsReady] = useState(false);
    const [keys, setKeys] = useState(
        {
            "up" : keyboard('w'),
            "down" : keyboard('s'),
            "left" : keyboard('a'),
            "right" : keyboard('d')
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
        console.log(player)

        keys.up.press = () => {
            player.sprite.y -= 1;
        };
        keys.down.press = () => {
            player.sprite.y += 1;
        };
        keys.left.press = () => {
            player.sprite.x -= 1;
        };
        keys.right.press = () => {
            player.sprite.x += 1;
        };
        
    }


    const gameLoop = (delta: any) => {
        // player.sprite.x += 1;
        // console.log(context)
        // console.log(player)
        // console.log('looping');
        // player.sprite.x += 1;s
        // setPlayer(player)
    }

    // const updatePlayer = () => {
    //     setPlayer(player)
    // }

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
            <button > PRESS </button>
            Gave Up
        </div>
    )

}