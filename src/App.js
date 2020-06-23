import React, { useState, useCallback, useRef } from "react";
import produce from "immer";

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

const emptyGrid = () => {
  Array(numRows)
    .fill()
    .map(() => Array(numCols).fill(false));
};

const App = () => {
  // useState hook that is used for the grid itself
  const [grid, setGrid] = useState(() => {
    // Function only runs once state is initialized
    return emptyGrid();
  });
  console.log(grid);

  const [gen, setGen] = useState(0);

  const [numRows, setNumRows] = useState(60);

  const [numCols, setNumCols] = useState(60);

  // useState hook that controls the state of the start/stop button
  const [start, setStart] = useState(false);

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
  Setgrid helper function
  */
  const gridSetter = () => {
    let curGrid = grid;
    let newGrid = arrayClone(grid);

    for (let i = 0; i < numRows; i++) {
      let count1 = 0;
      count1++;
      // and iterate through all columns
      for (let j = 0; j < numCols; j++) {
        let count2 = 0;
        count2++;
        // n is for neighbors
        let n = 0;

        // Check every sub array of the neighborLogic array
        neighborLogic.forEach(([x, y]) => {
          // Set new values for the sub array based on i and j location
          const newI = i + x;
          const newJ = j + y;
          // Ensure that we don't go outside our 8 neighbors
          if (newI >= 0 && newI < numRows && newJ >= 0 && newJ < numCols) {
            n += curGrid[newI][newJ];
            setGen(count2);
          }
        });
        setGen(count1);
        if (n < 2 || n > 3) {
          newGrid[i][j] = 0;
        } else if (curGrid[i][j] === 0 && n === 3) {
          newGrid[i][j] = 1;
        }
      }
    }
    setGrid(newGrid);
  };

  /*
  End setgrid helper function
  */
  const sim = () => {
    if (!startRef.current) {
      return;
    }

    // C is the current grid
    gridSetter();
    setTimeout(sim, 1000);
  };

  return (
    <div>
      {/* Start and stop button */}
      <button
        className="button"
        onClick={() => {
          setStart(!start);
          if (!start) {
            startRef.current = true;
            sim();
          }
        }}
      >
        Start
      </button>
      <button
        visibility={false}
        className="button"
        onClick={() => {
          setStart(!start);
        }}
      >
        Stop
      </button>

      <button
        className="button"
        onClick={() => {
          randomize();
        }}
      >
        {"Random 1"}
      </button>
      <button
        className="button"
        onClick={() => {
          randomize();
        }}
      >
        {"Random 2"}
      </button>
      <button
        className="button"
        onClick={() => {
          randomize();
        }}
      >
        {"Random 3"}
      </button>
      <button
        onClick={() => {
          setGrid(emptyGrid());
        }}
      >
        Clear
      </button>
      <div>
        <p>{gen}</p>
      </div>
      {}
      <div
        id="readOnlyAfterStart"
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

// stringify makes a clone of the arrays inside the arrays allows for new cloned boxes to be made
function arrayClone(arr) {
  return JSON.parse(JSON.stringify(arr));
}

export default App;
