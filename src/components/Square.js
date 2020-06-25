import React, { Component } from "react";
import "../styles/Square.css";
class Square extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const handleClick = () => {
      this.props.selectSquare(this.props.row, this.props.col);
    };

    return (
      <div
        className={this.props.squareClass}
        // squareId={this.props.id}
        onClick={this.handleClick}
      />
    );
  }
}
export default Square;
