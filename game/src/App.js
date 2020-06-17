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
var generations;

const emptyGrid = () => {
  generations = 0;
  const rows = []; // Create rows
  for (let i = 0; i < numRows; i++) {
    // Use Array.from to create an array filled with 0's. Similar to [None] * Elements in Python
    rows.push(Array.from(Array(numCols), () => 0)); //and create columns. Second parameter of Array.from is a mapping function that gets the value and the key and you can also return what the value is going to be
  }
  return rows;
};

const App = () => {
  // useState hook that is used for the grid itself
  const [grid, setGrid] = useState(() => {
    // Function only runs once state is initialized
    return emptyGrid();
  });
  // console.log(grid);
  // useState hook that controls the state of the start/stop button
  const [start, setStart] = useState(false);

  /*

Randomize Button hooks

*/
  const [rand1, setRand1] = useState(false);
  const [rand2, setRand2] = useState(false);
  const [rand3, setRand3] = useState(false);

  const randomize = () => {
    const rows = []; // Create rows
    for (let i = 0; i < numRows; i++) {
      // Use Array.from to create an array filled with 0's. Similar to [None] * Elements in Python
      rows.push(
        Array.from(Array(numCols), () => (Math.random() > 0.5 ? 1 : 0))
      ); //and create columns. Second parameter of Array.from is a mapping function that gets the value and the key and you can also return what the value is going to be
    }
    setGrid(rows);
  };

  const startRef = useRef(start);
  startRef.current = start;

  /*
  Rand Refs
  */

  const rand1Ref = useRef(rand1);
  rand1Ref.current = rand1;

  const rand2Ref = useRef(rand2);
  rand2Ref.current = rand2;

  const rand3Ref = useRef(rand3);
  rand3Ref.current = rand3;

  /*
  Setgrid helper function
  */
  const gridSetter = () => {
    setGrid((c) => {
      generations = generations + 0.5;
      // Use produce function again to manipulate a copy
      return produce(c, (gridCopy) => {
        // Iterate through all through rows and columns
        for (let i = 0; i < numRows; i++) {
          // and iterate through all columns
          for (let j = 0; j < numCols; j++) {
            // n is for neighbors
            let n = 0;

            // Check every sub array of the neighborLogic array
            neighborLogic.forEach(([x, y]) => {
              // Set new values for the sub array based on i and j location
              const newI = i + x;
              const newJ = j + y;
              // Ensure that we don't go outside our 8 neighbors
              if (newI >= 0 && newI < numRows && newJ >= 0 && newJ < numCols) {
                n += c[newI][newJ];
              }
            });

            if (n < 2 || n > 3) {
              gridCopy[i][j] = 0;
            } else if (c[i][j] === 0 && n === 3) {
              gridCopy[i][j] = 1;
            }
          }
        }
      });
    });

    setTimeout(gridSetter, 1000);
  };

  /*
  End setgrid helper function
  */
  const sim = useCallback(() => {
    if (!startRef.current) {
      return;
    }

    // C is the current grid
    gridSetter();
  }, []);

  return (
    <div>
      {/* Start and stop button */}
      <button
        onClick={() => {
          setStart(!start);
          if (!start) {
            randomize();
            startRef.current = true;
            sim();
          }
        }}
      >
        {start ? "Stop" : "Start"}
      </button>
      <button
        onClick={() => {
          setRand1(!rand1);
          if (!rand1) {
            randomize();
            rand1Ref.current = true;
            sim();
          }
        }}
      >
        {rand1 ? "Stop" : "Random 1"}
      </button>
      <button
        onClick={() => {
          setRand2(!rand2);
          if (rand2) {
            randomize();
            rand2Ref.current = true;
            sim();
          }
        }}
      >
        {rand2 ? "Stop" : "Random 2"}
      </button>
      <button
        onClick={() => {
          setRand3(!rand3);
          if (!rand3) {
            randomize();
            rand3Ref.current = true;
            sim();
          }
        }}
      >
        {rand3 ? "Stop" : "Random 3"}
      </button>
      <button
        onClick={() => {
          setGrid(emptyGrid());
        }}
      >
        Clear
      </button>
      <div>
        <p>{generations}</p>
      </div>
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
              key={`${i}-${j}`}
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
