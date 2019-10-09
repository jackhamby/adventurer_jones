import React from 'react';
import './App.css';
import { GameWrapper } from './components/game_wrapper'
import { GivingUp } from './components/giving_up';
export const screenWidth = window.screen.width;
export const screenHeight = window.screen.height;




function App() {

	return (
		<div> 
			{/* <GameWrapper></GameWrapper> */}
			<GivingUp></GivingUp>
		</div>
	)
}

export default App;
