import * as React from "react";
import Row from "./row";
const COLUMNS = [0, 1, 2];
const ROWS = [0, 1, 2];
class Board extends React.Component<any, {}> {
	render() {
		return <div>
			{
				ROWS.map((row, i) => {
					return <Row
						key={i}
						rowIndex={i}
						columns={COLUMNS} />
				})
			}
		</div>
	}
}

export default Board;