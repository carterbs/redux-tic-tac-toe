import * as React from "react";
import { connect } from 'react-redux';
const mapDispatchToProps = (dispatch) => {
	return {
		onPlacePiece: (coordinates) => {
			dispatch({ type: 'PLACE_PIECE', coordinates });
			dispatch({ type: 'CHECK_GAME_OVER' });
			dispatch({ type: 'PREPARE_NEXT_TURN' });
		}
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		cellContent: state.board[ownProps.coordinates[0]][ownProps.coordinates[1]]
	}
}

class Cell extends React.Component<any, {}> {
	constructor(props) {
		super(props);
		this.onClick = this.onClick.bind(this);
	}
	onClick() {
		this.props.onPlacePiece(
			this.props.coordinates
		)
	}
	render() {
		return <div
			className="cell"
			onClick={this.onClick}>
			{
				this.props.cellContent
			}
		</div>
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Cell);