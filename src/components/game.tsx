import React, { useState, useEffect, useRef} from 'react';
import * as PIXI from 'pixi.js';
import { Player } from './game_wrapper';

export interface GameProps {
    application: PIXI.Application,
    // loader: PIXI.Loader
}



export const Game = (props: GameProps) => {

    const application = props.application
    // const loader = props.loader;
    console.log(application.loader)
    console.log(application)
    const gameScreen = useRef({} as any);
    const test = new PIXI.Sprite(application.loader.resources['./knight.png'].texture)
    test.x = 250;
    test.y = 250;
    const [player, setPlayer] = useState({
        name: "newplayer",
        sprite: test
    } as Player)


    const tester = () => {
        application.stage.addChild(player.sprite)
    }

    useEffect(() => { 
        console.log('use effect')
        
        // gameScreen.current.appendChild(application.view);

        // application.stage.addChild(player.sprite);
        // console.log(application.stage)
        // application.renderer.render(application.stage);
    })

    console.log(gameScreen.current)

    return (
        <div> 
            <button onClick={tester}> PRESS </button>
            <div ref={gameScreen}> the real game</div>
        </div>
    )

}