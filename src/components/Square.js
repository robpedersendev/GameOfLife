import React, { Component } from "react";
import "../styles/Square.css";
class Square extends Component {
  render() {
    const handleClick = () => {
      this.props.selectSquare(this.props.row, this.props.col);
    };

    return (
      <div
        className={this.props.squareClass}
        // squareId={this.props.id}
        onClick={handleClick}
      />
    );
  }
}
export default Square;
