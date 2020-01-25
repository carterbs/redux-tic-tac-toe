import reducer from './reducer'
import { defaultState } from './reducer'
import { createStore, applyMiddleware } from 'redux';
import { GameState } from '../types'
const STORAGE_KEY = "tictactoestate";
const savedState = JSON.parse(localStorage.getItem(STORAGE_KEY));
const deriveInitialStateFromSavedState = () => {
	return Object.assign(
		{},
		defaultState,
		savedState)
}
const initialState: GameState = savedState ?
	deriveInitialStateFromSavedState()
	: defaultState;

function persistance({ getState }) {
	return next => action => {
		console.log('will dispatch', action.type)

		// Call the next dispatch method in the middleware chain.
		const returnValue = next(action)

		localStorage.setItem(STORAGE_KEY, JSON.stringify(getState()));
		// This will likely be the action itself, unless
		// a middleware further in chain changed it.
		return returnValue
	}
}
const store = createStore(reducer,
	initialState,
	applyMiddleware(persistance));

export default store;