import * as React from "react";
import * as ReactDOM from "react-dom"

import Board from './components/gameBoard'
import Hud from './components/hud'
import PlayerInputs from './components/playerInputs'
import { Provider } from 'react-redux';
import store from './store'
import './components/board.css';

ReactDOM.render(
	<Provider store={store}>
		<Hud/>
		<PlayerInputs/>
		<Board />
	</Provider>,
	document.getElementById('board'))
