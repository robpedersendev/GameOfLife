import React, { useState, useEffect } from "react";

import Square from "./Square.js";

const Grid = ({ cols, rows, grid, clickSquare }) => {
  const width = cols * 14 + 1;
  console.log(grid);
  let rowsArr = [];

  let squareClass = "";
  for (let i = 0; i < rows; i++) {
    console.log(rows);
    for (let j = 0; j < cols; j++) {
      console.log(cols);
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
          selectSquare={clickSquare}
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
