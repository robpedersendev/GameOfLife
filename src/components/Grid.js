import React, { useState } from "react";
import "../index.css";
import Square from "./Square.js";

const Grid = (props) => {
  const [cols, setCols] = useState(props);
  const [rows, setRows] = useState(props);
  const [grid, setGrid] = useState(props);
  const [selectSquare, setSelectSquare] = useState(props);
  const width = cols * 14 + 1;
  let rowsArr = [];

  let squareClass = "";
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let boxId = i + "~" + j;
      // ternary used to select box on (black) or off (on) when just hovering
      squareClass = grid[i][j] ? "box on" : "box off";
      rowsArr.push(
        <Square
          squareClass={squareClass}
          key={boxId}
          boxId={boxId}
          row={i}
          col={j}
          selectSquare={selectSquare}
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
};

export default Grid;
