import React, { Component } from "react";
import Grid from "./components/Grid.js";
import Buttons from "./components/Buttons.js";

import "./index.css";
class App extends Component {
  constructor() {
    super();
    this.speed = 1000;
    this.numRows = 30;
    this.numCols = 50;
    this.state = {
      gen: 0,
      grid: Array(this.numRows)
        .fill()
        .map(() => Array(this.numCols).fill(0)),
    };
  }
  //Begin helper functions
  neighborLogic = [
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

  Allow the user to select a square to turn a square on or off

  */

  clickSquare = (row, col) => {
    let copy = arrayClone(this.state.grid);
    copy[row][col] = !copy[row][col];
    this.setState({
      grid: copy,
    });
  };

  /*
  keep recalling the play function every <retrieved from state> seconds
  */
  playBtn = () => {
    clearInterval(this.intervalId);
    this.intervalId = setInterval(this.gridSetter, this.speed);
  };
  /*
  Allow the player to stop the running of the app
  */
  stopBtn = () => {
    clearInterval(this.intervalId);
  };

  /*
  Allow the user to set the speed of the progression
  */
  changeSpeed = (speed) => {
    switch (speed) {
      case "1":
        this.speed = 1;
        this.playBtn();
        break;
      case "2":
        this.speed = 1000;
        this.playBtn();
        break;
      default:
        this.speed = 10000;
        this.playBtn();
        break;
    }
    this.clear();
  };

  clear = () => {
    let grid = Array(this.numRows)
      .fill()
      .map(() => Array(this.numCols).fill(0));
    this.setState({
      grid: grid,
      gen: 0,
    });
  };

  /*
  Change the size of the grid based off of user input
  */
  changeSize = (size) => {
    switch (size) {
      case "1":
        this.cols = 30;
        this.rows = 30;
        break;
      case "2":
        this.cols = 60;
        this.rows = 60;
        break;
      default:
        this.cols = 80;
        this.rows = 80;
    }
    this.clear();
  };
  /*
  This will allow for randomization
  */
  randomize = () => {
    const rows = []; // Create rows
    for (let i = 0; i < this.numRows; i++) {
      // Use Array.from to create an array filled with 0's. Similar to [None] * Elements in Python
      rows.push(
        Array.from(Array(this.numCols), () => (Math.random() > 0.5 ? 1 : 0))
      ); //and create columns. Second parameter of Array.from is a mapping function that gets the value and the key and you can also return what the value is going to be
    }
    this.setState({
      grid: rows,
    });
  };

  /*
  Setgrid helper function
  */
  gridSetter = () => {
    let curGrid = this.state.grid;
    let newGrid = arrayClone(this.state.grid);
    console.log(newGrid);

    for (let i = 0; i < this.numRows; i++) {
      // and iterate through all columns
      for (let j = 0; j < this.numCols; j++) {
        // n is for neighbors
        let n = 0;

        // Check every sub array of the neighborLogic array
        this.neighborLogic.forEach(([x, y]) => {
          // Set new values for the sub array based on i and j location
          const newI = i + x;
          const newJ = j + y;
          // Ensure that we don't go outside our 8 neighbors
          if (
            newI >= 0 &&
            newI < this.numRows &&
            newJ >= 0 &&
            newJ < this.numCols
          ) {
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
    this.setState({
      grid: newGrid,
      gen: this.state.gen + 1,
    });
  };
  render() {
    return (
      <div>
        <h1>Bob's interpretation of Conway's Game of Life</h1>
        <Buttons
          playBtn={this.playBtn}
          stopBtn={this.stopBtn}
          changeSpeed={this.changeSpeed}
          clear={this.clear}
          randomize={this.randomize}
          changeSize={this.changeSize}
        />{" "}
        {console.log(this.state.grid)}
        <Grid
          grid={this.state.grid}
          rows={this.numRows}
          cols={this.numCols}
          clickSquare={this.clickSquare}
        />{" "}
        <h2>Generations passed: {this.state.gen}</h2>
        <h2>
          RULES OF THE GAME: (I) If the cell is alive and has 2 or 3 neighbors,
          then it remains alive. (II) Else it dies. If the cell is dead and has
          exactly 3 neighbors, then it comes to life. Else if remains dead.
        </h2>
      </div>
    );
  }
}
// stringify makes a clone of the arrays inside the arrays allows for new cloned boxes to be made
function arrayClone(arr) {
  return JSON.parse(JSON.stringify(arr));
}

export default App;
