import * as React from "react";
import Cell from './cell'
export default class Row extends React.Component<any, {}> {
	render() {
		return (<div className="row">
			{this.props.columns.map((col, j) => {
				return (
					<Cell
						key={this.props.rowIndex + j}
						coordinates={[this.props.rowIndex, j]}
					/>
				)
			})}
		</div>)
	}
}