

import React, { useState, useEffect, useRef} from 'react';
import './application.css'

export const Application = (props: any) => {


    return (
        <div className="container-fluid container"> 
            <div className="row top wrapper">
            header
            </div>
            <div className="row middle">
                <div className="col-8 game-container wrapper">
                game
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