import React from "react";
import "../index.css";
import {
  ButtonToolbar,
  MenuItem,
  DropdownButton,
  Button,
} from "react-bootstrap";

class Buttons extends React.Component {
  handleSizeSelect = (evt) => {
    this.props.gridSize(evt);
  };
  handleSpeedSelect = (evt) => {
    this.props.speed(evt);
  };

  render() {
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
            onSelect={this.handleSizeSelect}
          >
            <MenuItem eventKey="1">Slow</MenuItem>
            <MenuItem eventKey="2">Fast</MenuItem>
          </DropdownButton>
          <DropdownButton
            title="Grids"
            id="size-menu"
            onSelect={this.handleSpeedSelect}
          >
            <MenuItem eventKey="1">30x20</MenuItem>
            <MenuItem eventKey="2">60x40</MenuItem>
            <MenuItem eventKey="3">80x60</MenuItem>
          </DropdownButton>
        </ButtonToolbar>
      </div>
    );
  }
}

export default Buttons;
