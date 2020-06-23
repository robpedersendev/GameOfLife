import React, { useState } from "react";
import "../index.css";
import {
  ButtonToolbar,
  DropdownButton,
  Button,
  DropdownItem,
} from "react-bootstrap";

const Buttons = (props) => {
  const [gridSize, setGridSize] = useState(props);
  const [speed, setSpeed] = useState(props);
  const handleSizeSelect = (evt) => {
    this.props.changeSize(evt);
  };
  const handleSpeedSelect = (evt) => {
    this.props.speed(evt);
  };

  return (
    <div className="center">
      <ButtonToolbar>
        <Button bsStyle="primary" onClick={this.props.startButton}>
          Start
        </Button>
        <Button bsStyle="danger" onClick={this.props.stopButton}>
          Stop
        </Button>
        <Button bsStyle="success" onClick={this.props.clear}>
          Clear
        </Button>
        <DropdownButton
          title="Speeds"
          id="size-menu"
          onSelect={this.handleSpeedSelect}
        >
          <DropdownItem eventKey="1">Slow</DropdownItem>
          <DropdownItem eventKey="2">Fast</DropdownItem>
        </DropdownButton>
        <DropdownButton
          title="Grids"
          id="size-menu"
          onSelect={this.handleSizeSelect}
        >
          <DropdownItem eventKey="1">30x20</DropdownItem>
          <DropdownItem eventKey="2">60x40</DropdownItem>
          <DropdownItem eventKey="3">80x60</DropdownItem>
        </DropdownButton>
      </ButtonToolbar>
    </div>
  );
};

export default Buttons;
