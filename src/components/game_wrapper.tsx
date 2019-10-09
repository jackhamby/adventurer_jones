import React, { useState, useEffect, useRef} from 'react';
import * as PIXI from 'pixi.js';
import { Game } from './game';
export const screenWidth = window.screen.width;
export const screenHeight = window.screen.height;


export interface Player {
    sprite: PIXI.Sprite;
    name: string;
}

export const GameWrapper = (props: any) => {
    // console.log('\n')
    // console.log('constructing')
    // console.log('\n')

    const application = new PIXI.Application({width: screenWidth, height: screenHeight});
    const [isLoaded, setIsLoaded] = useState(false);
    // const loader = new PIXI.Loader();
    application.loader
        .add('./knight.png')
        .load(() => { console.log('loader ready'); setIsLoaded(true) })
    
    // const gameScreen = useRef({} as any); // TODO: fix this as any shit

    // const [isLoaded, setIsLoaded] = useState(false);

    // const [player, setPlayer] = useState({} as Player);

    const setup = () => {
        // setIsLoaded(true);
        // setPlayer({
        //     name: "newplayer",
        //     sprite: new PIXI.Sprite(loader.resources['./knight.png'].texture)
        //  } as Player) 
    }

    useEffect(() => {
        // console.log('\n')
        // console.log('using effect')
        // console.log('\n')
        // gameScreen.current.appendChild(app.view);
        // if (isLoaded){
        //     console.log('here')
        //     app.stage.addChild(player.sprite);
        // }
    }, [ isLoaded])


    if (isLoaded){
        // console.log('\n')
        // console.log('rendering LOADED')
        // console.log(loader.loading)
        // console.log('\n')
        return (
            // <div> LOADED!</div>
            <Game application={application}></Game>
        )
    }
    // console.log('\n')
    // console.log('rendering NOT LOADED')
    // console.log('\n')
    return (
        <div> not loaded </div>
    )
}