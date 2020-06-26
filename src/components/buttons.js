import React from "react";
import "../index.css";
import { DropdownItem, DropdownButton, Button } from "react-bootstrap";

class Buttons extends React.Component {
  handleSizeSelect = (evt) => {
    this.props.stopBtn();
    this.props.clear();
    // setTimeout((evt) => {
    this.props.changeSize(evt);
    // }, 500);
  };
  handleSpeedSelect = (evt) => {
    this.props.clear();
    this.props.changeSpeed(evt);
    this.props.randomize();
  };

  render() {
    return (
      <div className="center">
        <Button className="btn-primary" onClick={this.props.playBtn}>
          Start
        </Button>
        <Button className="btn-danger" onClick={this.props.stopBtn}>
          Stop
        </Button>
        <Button
          className="btn-warning"
          onClick={() => {
            this.props.clear();
            this.props.stopBtn();
          }}
        >
          Clear
        </Button>
        <Button className="btn-success" onClick={this.props.randomize}>
          Randomize
        </Button>

        <DropdownButton
          className="btn-info"
          title="Speeds"
          id="size-menu"
          onSelect={this.handleSpeedSelect}
        >
          <DropdownItem eventKey="1">Fast</DropdownItem>
          <DropdownItem eventKey="2">Normal</DropdownItem>
          <DropdownItem eventKey="3">Slow</DropdownItem>
        </DropdownButton>

        <DropdownButton
          title="Grids"
          id="size-menu"
          onSelect={this.handleSizeSelect}
        >
          <DropdownItem eventKey="1">60*70</DropdownItem>
          <DropdownItem eventKey="2">40*50</DropdownItem>
        </DropdownButton>
      </div>
    );
  }
}

export default Buttons;
