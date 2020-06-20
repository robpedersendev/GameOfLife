import React, { Component } from "react";
import "../index.css";

class Square extends Component {
  selectSquare = () => {
    this.props.selectSquare(this.props.row, this.props.col);
  };

  render() {
    return (
      <div
        className={this.props.SquareClass}
        id={this.props.id}
        onClick={this.selectSquare}
      />
    );
  }
}

export default Square;
