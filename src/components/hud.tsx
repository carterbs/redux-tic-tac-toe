import * as React from "react";
import { connect } from 'react-redux';
import { getGameOverString, getPlayerDisplayString } from '../helpers'

class Hud extends React.Component<any, any> {
	render() {
		return <div>
			<button onClick={this.props.reset}>Reset</button>
			{this.props.gameOver &&
				<h1>
					{
						getGameOverString({
							currentPlayer: this.props.currentPlayer,
							isDraw: this.props.isDraw
						})
					}
				</h1>}
			<h2>
				{
					getPlayerDisplayString(this.props.currentPlayer)
				}'s turn
			</h2>
		</div>
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		reset: () => { dispatch({ type: "RESET" }) },
		setPlayer: (playerNumber, name) => { dispatch({ type: 'SET_PLAYER_' + playerNumber, name: name }) }
	}
}
const mapStateToProps = (state, ownProps) => {
	debugger
	return {
		currentPlayer: state.currentPlayer,
		gameOver: state.gameOver,
		isDraw: state.isDraw,
		players: state.players
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Hud);