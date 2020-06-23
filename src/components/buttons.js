import React, { useEffect, useState } from "react";
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
    this.props.setGridSize(evt);
  };
  const handleSpeedSelect = (evt) => {
    this.props.changeSpeed(evt);
  };

  useEffect(() => {
    setGridSize(props);
  }, [props]);
  useEffect(() => {
    setGridSize(props);
  }, [props]);

  return (
    <div className="center">
      <ButtonToolbar>
        <Button bsStyle="primary" onClick={this.props.playBtn}>
          Start
        </Button>
        <Button bsStyle="danger" onClick={this.props.stopBtn}>
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
          <DropdownItem eventKey="1">Way to fast</DropdownItem>
          <DropdownItem eventKey="2">Thats more like</DropdownItem>
          <DropdownItem eventKey="">Is this thing on?</DropdownItem>
        </DropdownButton>
        <DropdownButton
          title="Grids"
          id="size-menu"
          onSelect={this.handleSizeSelect}
        >
          <DropdownItem eventKey="1">30x30</DropdownItem>
          <DropdownItem eventKey="2">60x60</DropdownItem>
          <DropdownItem eventKey="3">80x80</DropdownItem>
        </DropdownButton>
      </ButtonToolbar>
    </div>
  );
};

export default Buttons;
