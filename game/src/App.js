import React, { useState } from "react";

const numRows = 25;
const numCols = 25;

const App = () => {
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
  return (
    <div>
      {/* Display the rows by using .map and getting the rows themselves and grabbing the index*/}
      {grid.map((rows, i) =>
        // And then calling the .map function on the rows object and getting the columns created and the index for each
        rows.map((col, j) => (
          // The div holds the unique index and styling based on whether or not the cell is dead or alive
          <div
            key={"${i}-${j}"}
            style={{
              width: 15,
              height: 15,
              backgroundColor: grid[i][j] ? "black" : undefined,
              border: "solid 1px black",
            }}
          />
        ))
      )}
    </div>
  );
};

export default App;
