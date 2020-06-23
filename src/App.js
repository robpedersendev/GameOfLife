import React, { useState, useEffect, useRef } from "react";
import Grid from "./components/Grid.js";
import Buttons from "./components/Buttons.js";
const App = () => {
  // Instantiate State
  const [numRows, setNumRows] = useState(60);

  const [numCols, setNumCols] = useState(60);
  const emptyGrid = () => {
    const rows = []; // Create rows
    for (let i = 0; i < numRows; i++) {
      // Use Array.from to create an array filled with 0's. Similar to [None] * Elements in Python
      rows.push(Array.from(Array(numCols), () => 0)); //and create columns. Second parameter of Array.from is a mapping function that gets the value and the key and you can also return what the value is going to be
    }
    return rows;
  };
  // useState hook that is used for the grid itself
  const [grid, setGrid] = useState(() => {
    // Function only runs once state is initialized
    emptyGrid();
  });
  console.log(grid);

  const [gen, setGen] = useState(0);

  const [interval, setInterval] = useState(null);

  const [speed, setSpeed] = useState(1000);

  // useState hook that controls the state of the start/stop button
  const [start, setStart] = useState(false);
  // End State section

  /*
Handle the changing/updating of props
*/

  //Begin helper functions

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

  /*

  Allow the user to select a square

  */

  const clickSquare = (row, col) => {
    let copy = arrayClone(grid);
    copy[row][col] = !copy[row][col];
    setGrid(copy);
  };

  /*
  keep recalling the play function every <retrieved from state> seconds
  */
  const playBtn = () => {
    setInterval(null);
    setInterval(gridSetter, speed);
  };
  /* 
  Allow the player to stop the running of the app
  */
  const stopBtn = () => {
    setInterval(null);
  };

  /*
  Allow the user to set the speed of the progression
  */
  const changeSpeed = (speed) => {
    switch (speed) {
      case "1":
        setSpeed(1);
        playBtn();
        break;
      case "2":
        setSpeed(1000);
        playBtn();
        break;
      default:
        setSpeed(10000);
        playBtn();
        break;
    }
    clear();
  };

  // slow = () => {
  //   setSpeed(1000);
  //   playBtn();
  // };
  // fast = () => {
  //   setSpeed(100);
  //   playBtn();
  // };
  // didYouSeeThat = () => {
  //   setSpeed(1);
  //   playBtn();
  // };

  /*
  Allow user to clear the grid to start over
  */

  const clear = () => {
    let grid = Array(numRows)
      .fill()
      .map(() => Array(numCols).fill(false));
    setGrid(grid);
    setGen(0);
  };

  /*
  Change the size of the grid based off of user input
  */
  const changeSize = (size) => {
    switch (size) {
      case "1":
        setNumRows(30);
        setNumCols(30);
        break;
      case "2":
        setNumRows(60);
        setNumCols(60);
        break;
      default:
        setNumRows(80);
        setNumCols(80);
    }
    clear();
  };
  /*
  This will allow for randomization
  */
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

  /*
  Setgrid helper function
  */
  const gridSetter = () => {
    let curGrid = grid;
    let newGrid = arrayClone(grid);
    console.log(newGrid);

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
            n += curGrid[newI][newJ];
          }
        });

        if (n < 2 || n > 3) {
          newGrid[i][j] = 0;
        } else if (curGrid[i][j] === 0 && n === 3) {
          newGrid[i][j] = 1;
        }
      }
    }
    setGrid(newGrid);
    setGen(gen + 1);
  };

  // /*
  // End setgrid helper function
  // */
  // const sim = () => {
  //   if (!startRef.current) {
  //     return;
  //   }

  //   // C is the current grid
  //   gridSetter();
  //   setTimeout(sim, 1000);
  // };

  return (
    <div>
      <h1>Bob's interpretation of Conway's Game of Life</h1>
      <Buttons
        playBtn={playBtn}
        stopBtn={stopBtn}
        changeSpeed={changeSpeed}
        clear={clear}
        randomize={randomize}
        changeSize={changeSize}
      />{" "}
      {console.log(grid)}
      <Grid
        grid={grid}
        rows={numRows}
        cols={numCols}
        clickSquare={clickSquare}
      />{" "}
      {console.log(grid)}
      <h2>Generations passed: {gen}</h2>
      <h2>
        RULES OF THE GAME: (I) If the cell is alive and has 2 or 3 neighbors,
        then it remains alive. (II) Else it dies. If the cell is dead and has
        exactly 3 neighbors, then it comes to life. Else if remains dead.
      </h2>
    </div>
  );
};

// stringify makes a clone of the arrays inside the arrays allows for new cloned boxes to be made
function arrayClone(arr) {
  return JSON.parse(JSON.stringify(arr));
}

export default App;
