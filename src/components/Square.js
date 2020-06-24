import React, { useState, Component } from "react";

const Square = (props) => {
  const [cols, setCols] = useState(props);
  const [rows, setRows] = useState(props);
  const [squareClass, setSquareClass] = useState(props);
  const [id, setId] = useState(props);
  const [selectSquare, setSelectSquare] = useState();
  const handleClick = () => {
    setSelectSquare(rows, cols);
  };

  return <div className={squareClass} id={id} onClick={handleClick} />;
};

export default Square;
