import React, { Component } from 'react';
import logo from '../images/logo.svg';
import './css/Board.css';
import actions from '../redux/actions/dataAction';
import { connect } from "react-redux";
import BoardContainer from "./BoardContainer";

class Board extends Component {

  constructor(props) {
    super(props);
    props.initBoard();
  }
  
  render() {
    return (
      <div className="board">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React1111</h2>
        </div>
        <div className="board-container">
          <BoardContainer />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    initBoard: () => dispatch(actions.initBoard())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Board);