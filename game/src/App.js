import React, { useState, useCallback, useRef } from "react";
import produce from "immer";

const numRows = 60;
const numCols = 60;

const neighborLogic = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, -1],
];

const App = () => {
  // useState hook that is used for the grid itself
  const [grid, setGrid] = useState(() => {
    // Function only runs once state is initialized
    const rows = []; // Create rows
    for (let i = 0; i < numRows; i++) {
      // Use Array.from to create an array filled with 0's. Similar to [None] * Elements in Python
      rows.push(Array.from(Array(numCols), () => 0)); //and create columns. Second parameter of Array.from is a mapping function that gets the value and the key and you can also return what the value is going to be
    }
    return rows;
  });
  // console.log(grid);
  // useState hook that controls the state of the start/stop button
  const [start, setStart] = useState(false);

  const ref = useRef(start);
  ref.current = start;

  return (
    <div>
      {/* Start and stop button */}
      <button
        onClick={() => {
          setStart(!start);
        }}
      >
        {start ? "Stop" : "Start"}
      </button>
      <div
        // Created a CSS grid to display or rows and columns
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${numCols}, 12px)`,
        }}
      >
        {/* Display the rows by using .map and getting the rows themselves and grabbing the index*/}
        {grid.map((rows, i) =>
          // And then calling the .map function on the rows object and getting the columns created and the index for each
          rows.map((col, j) => (
            // The div holds the unique index and styling based on whether or not the cell is dead or alive
            <div
              key={"${i}-${j}"}
              // Allow interactivity with the user
              onClick={() => {
                const newGrid = produce(grid, (gridCopy) => {
                  // Act as a toggle. If alive, die, if dead, come alive.
                  gridCopy[i][j] = grid[i][j] ? 0 : 1;
                });
                setGrid(newGrid);
              }}
              style={{
                width: 10,
                height: 10,
                backgroundColor: grid[i][j] ? "black" : undefined,
                border: "solid 1px black",
              }}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default App;
