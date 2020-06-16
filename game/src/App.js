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
  return <div>Earth to Bob</div>;
};

export default App;
