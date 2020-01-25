import * as clone from 'lodash.clonedeep'
export const defaultState = {
	currentPiece: 'X',
	currentPlayer: '1',
	players: ['1', '2'],
	board: [
		[null, null, null],
		[null, null, null],
		[null, null, null]
	],
	gameOver: false,
	isDraw: false
};


const isDraw = (board) => {
	// if every cell has a non-null value. return true.
	return board.every(row =>
		row.every(cell => cell));
}

// if any row has a 100% match, return true.
const checkRows = (board) => {
	return board.some(row =>
		row.every(cell => cell && cell === row[0]));
}

const checkColumns = (board) => {
	const cols = [0, 1, 2].map(col => {
		return [
			board[0][col],
			board[1][col],
			board[2][col]
		]
	});
	// If any column has a 100% match, return true.
	return cols.some((col, i) =>
		col.every(cell => cell && cell === col[0]));
}

const checkDiagonalRight = (board) => {
	const diag = [
		board[0][0],
		board[1][1],
		board[2][2]
	];
	return diag.every(cell => cell && cell === diag[0]);
}

const checkDiagonalLeft = (board) => {
	const diag = [
		board[0][2],
		board[1][1],
		board[2][0]
	];
	return diag.every(cell => cell && cell === diag[0]);
}

const checkGameOver = (board) => {
	return checkRows(board) || checkColumns(board) || checkDiagonalRight(board) || checkDiagonalLeft(board) || isDraw(board)
}

const getCurrentPlayer = (currentPlayer, players) => {
	let ind = players.findIndex(player => player === currentPlayer);
	if (ind + 1 === 2) {
		return players[0];
	}

	return players[1];
}

const reducer = (state, action) => {
	let newState = clone(state);
	switch (action.type) {
		case 'PLACE_PIECE':
			const coordinates: Array<number> = action.coordinates;
			newState.lastMoveWasValid = true;
			if (newState.gameOver) {
				newState.lastMoveWasValid = false;
				// don't allow moves once the game is over.
				break;
			}
			if (newState.board[coordinates[0]][coordinates[1]]) {
				newState.lastMoveWasValid = false;
				// don't allow players to overwrite existing pieces
				break;
			}

			// If we get here, the move was valid. Set the piece at the coordinates.
			newState.board[coordinates[0]][coordinates[1]] = state.currentPiece;
			break;
		case 'PREPARE_NEXT_TURN':
			// If the last move was not valid, we can't proceed to the next turn.
			if (!newState.lastMoveWasValid) break;
			// Same deal if the game is over.
			if (newState.gameOver) break;

			newState.currentPiece = state.currentPiece === 'X' ? 'O' : 'X';
			newState.currentPlayer = getCurrentPlayer(state.currentPlayer, state.players);
			break;
		case 'CHECK_GAME_OVER':
			newState.gameOver = checkGameOver(newState.board);
			if (isDraw(newState.board)) {
				newState.isDraw = true;
			}
			break;
		case 'SET_PLAYER_1':
			// @todo setPlayer, player index, player name.
			newState.players[0] = action.name || '1';
			if (state.currentPlayer === state.players[0]) {
				newState.currentPlayer = newState.players[0];
			}
			break;
		case 'SET_PLAYER_2':
			newState.players[1] = action.name || '2';
			if (state.currentPlayer === state.players[1]) {
				newState.currentPlayer = newState.players[1]
			}
			break;
		case 'RESET':
			newState = clone(defaultState);
			newState.players = state.players;
			newState.currentPlayer = state.players[0];
			break;
	}

	return newState;
}

export default reducer;