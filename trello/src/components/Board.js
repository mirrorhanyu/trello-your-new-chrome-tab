import React, { Component } from 'react';
import actions from '../redux/actions/dataAction';
import { connect } from "react-redux";
import BoardContainer from "./BoardContainer";
import './css/Board.css';

class Board extends Component {

  constructor(props) {
    super(props);
    props.initBoard();
  }
  
  render() {
    return (
      <div className="board">
        <div className="board-header">
          <span>Trello your Chrome new tab</span>
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