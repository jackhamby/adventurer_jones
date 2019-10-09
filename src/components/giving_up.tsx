


import React, { useState, useEffect, useRef} from 'react';
import * as PIXI from 'pixi.js';
import { Player } from './game_wrapper';




export const GivingUp = (props: any) => {

    const [player, setPlayer] = useState({} as Player)

    useEffect(() => { 
        console.log('using effect')
        let app = new PIXI.Application({ 
            width: 256, 
            height: 256,                       
            antialias: true, 
            transparent: false, 
            resolution: 1
          }
        );
        
        //Add the canvas that Pixi automatically created for you to the HTML document
        document.body.appendChild(app.view);
        
        //load an image and run the `setup` function when it's done
        app.loader
          .add("./knight.png")
          .load(setup);
        
        //This `setup` function will run when the image has loaded
        function setup() {
        
          //Create the cat sprite
          let cat = new PIXI.Sprite(app.loader.resources["./knight.png"].texture);
          
          //Add the cat to the stage
          app.stage.addChild(cat);
        }
    }, [player])

    const updatePlayer = () => {
        setPlayer({name: "ass"} as Player)
    }


    return (
        <div> 
            <button onClick={updatePlayer}> PRESS </button>
            Gave Up
        </div>
    )

}