import React, { Component } from 'react';
import { connect } from "react-redux";
import Lane from "./Lane";
import actions from '../redux/actions/dataAction';
import './css/BoardContainer.css';

import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

class BoardContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {isMouthOpen: false};
    this.noise = "";
  }

  makeNoise(event) {
    this.setState({noise: event.target.value});
  }

  shutUp() {
    this.setState({isMouthOpen: false});
  }

  speak() {
    this.setState({isMouthOpen: true});
  }

  addLane() {
    this.props.addLane(this.state.noise);
  }
  
  render() {
    const lanesQuantity = this.props.lanesQuantity;
    const lanes = Array.from({length: lanesQuantity}, (value, index) => (<Lane key={index} id={index}/>));
    
    const laneGenerator = this.state.isMouthOpen ? (
      <div className="lane-generator-content">
        <input className="lane-name-getter" type="text" placeholder="Add a lane..." value={this.state.noise} onChange={this.makeNoise.bind(this)}/>
        <input className="input-saver" type="button" value="Save" onClick={this.addLane.bind(this)}/>
        <i className="input-cancel" onClick={this.shutUp.bind(this)}>&times;</i>
      </div>
    ) : (
      <div className="lane-generator">
        <span onClick={this.speak.bind(this)}>Add a lane...</span>
      </div>
    );
    
    return (
      <div className="board-wrapper">
        {lanes}
        {laneGenerator}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    lanesQuantity: state.data.lanes.length
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addLane: (lane) => dispatch(actions.addLane(lane))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DragDropContext(HTML5Backend)(BoardContainer));