import React, { useState, useEffect } from "react";
import "../index.css";
import Square from "./Square.js";

class Grid extends React.Component {
  render() {
    const width = this.props.cols * 14 + 1;
    console.log(this.props.grid);
    let rowsArr = [];

    let squareClass = "";
    for (let i = 0; i < this.props.rows; i++) {
      for (let j = 0; j < this.props.cols; j++) {
        let boxId = i + "~" + j;
        // ternary used to select box on (black) or off (on) when just hovering
        squareClass = this.props.grid[i][j] ? "box on" : "box off";
        rowsArr.push(
          <Square
            squareClass={squareClass}
            key={boxId}
            boxId={boxId}
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
        {rowsArr}
      </div>
    );
  }
}

export default Grid;
