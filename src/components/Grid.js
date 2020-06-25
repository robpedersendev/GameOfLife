import React, { Component } from "react";
import "../styles/Grid.css";
import Square from "./Square.js";

class Grid extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const width = this.props.cols * 14 + 1;
    let rows = [];

    let squareClass = "";
    for (let i = 0; i < this.props.rows; i++) {
      for (let j = 0; j < this.props.cols; j++) {
        let id = i + "~" + j;
        // ternary used to select box on (black) or off (on) when just hovering
        squareClass = this.props.grid[i][j] ? "box on" : "box off";
        console.log(squareClass);
        rows.push(
          <Square
            squareClass={squareClass}
            key={id}
            // squareId={id}
            row={i}
            col={j}
            selectSquare={this.props.clickSquare}
          />
        );
      }
    }

    // boxes pushed into array (rowsArr)
    return (
      <div className="grid" style={{ width: width }}>
        {rows}
      </div>
    );
  }
}
export default Grid;
