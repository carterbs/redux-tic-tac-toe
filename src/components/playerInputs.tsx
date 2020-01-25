
import { getGameOverString, getPlayerDisplayString } from '../helpers'

import * as React from "react";
import { connect } from 'react-redux';
const mapDispatchToProps = (dispatch) => {
	return {
		reset: () => { dispatch({ type: "RESET" }) },
		setPlayer: (playerNumber, name) => { dispatch({ type: 'SET_PLAYER_' + playerNumber, name: name }) }
	}
}
const mapStateToProps = (state, ownProps) => {
	return {
		currentPlayer: state.currentPlayer,
		gameOver: state.gameOver,
		isDraw: state.isDraw,
		players: state.players
	}
}

class PlayerInputs extends React.Component<any, any> {
	render() {
		return <div>
			{
				this.props.players.map((playerName, i) => {
					return (<input
						key={i}
						type="text"
						defaultValue={this.props.players[i]}
						placeholder={playerName}
						onChange={(e) => {
							this.props.setPlayer(
								i + 1,
								(e.nativeEvent.target as any).value
							);
						}}>
					</input>)
				})
			}
		</div>
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerInputs);