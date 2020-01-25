export const getPlayerDisplayString = (name) => {
	return `${isNaN(name) ? '' : 'Player'} ${name}`;
}

export const getGameOverString = (state: { isDraw: Boolean, currentPlayer: string }) => {
	const PREFIX = '!!!! GAME OVER.';
	const SUFFIX = '!!!!'
	if (state.isDraw) {
		return `${PREFIX} It's a draw. ${SUFFIX}`;
	} else {
		return `${PREFIX} ${getPlayerDisplayString(state.currentPlayer)} wins ${SUFFIX}`;
	}
}