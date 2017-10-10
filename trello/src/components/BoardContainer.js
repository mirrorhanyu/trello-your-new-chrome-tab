import React, { Component } from 'react';
import { connect } from "react-redux";
import Lane from "./Lane";
import './css/BoardContainer.css';

class BoardContainer extends Component {
  
  render() {
    const lanesQuantity = this.props.lanesQuantity;
    const lanes = Array.from({length: lanesQuantity}, (value, index) => (<Lane key={index} id={index}/>));
    return (
      <div className="board-wrapper">
        {lanes}
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
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(BoardContainer);