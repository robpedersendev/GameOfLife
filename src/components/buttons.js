import React from "react";
import "../index.css";
import {
  ButtonToolbar,
  DropdownItem,
  DropdownButton,
  Button,
} from "react-bootstrap";

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
        <ButtonToolbar>
          <Button color="primary" onClick={this.props.playBtn}>
            Start
          </Button>
          <Button color="danger" onClick={this.props.stopBtn}>
            Stop
          </Button>
          <Button
            color="success"
            onClick={() => {
              this.props.clear();
              this.props.stopBtn();
            }}
          >
            Clear
          </Button>
          <Button color="danger" onClick={this.props.randomize}>
            Randomize
          </Button>
          <DropdownButton
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
        </ButtonToolbar>
      </div>
    );
  }
}

export default Buttons;
