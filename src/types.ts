export type GamePiece = 'X' | 'O' | null;
export type TicTacToeRow = [GamePiece, GamePiece, GamePiece];
export type TicTacToeBoard = [
	TicTacToeRow,
	TicTacToeRow,
	TicTacToeRow
];
export type GameState = {
	currentPiece: GamePiece;
	currentPlayer: string;
	players: string[];
	board: TicTacToeBoard;
	gameOver: boolean;
};