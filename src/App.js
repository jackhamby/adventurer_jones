import React from 'react';
import './App.css';
import { Game } from './components/game';
import 'bootstrap/dist/css/bootstrap.min.css';

export const screenWidth = window.screen.width;
export const screenHeight = window.screen.height;




function App() {

	return (
		<div> 
			<Game></Game>
		</div>
	)
}

export default App;
