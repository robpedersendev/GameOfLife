import React, { Component } from "react";
import "../index.css";

const Square = (props) => {
  const [cols, setCols] = useState(props);
  const [rows, setRows] = useState(props);
  const [squareClass, setSquareClass] = useState(props);
  const [id, setId] = useState(props);
  selectSquare = () => {
    setSelectSquare(rows, cols);
  };

  return <div className={squareClass} id={id} onClick={this.selectSquare} />;
};

export default Square;
