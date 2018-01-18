import React, {Component} from 'react';
import actions from '../redux/actions/dataAction';
import {connect} from "react-redux";
import EditableCard from "./EditableCard";
import BoardContainer from "./BoardContainer";
import Header from "./Header";
import './css/Board.css';

class Board extends Component {

  constructor(props) {
    super(props);
    props.initBoard();
  }

  render() {
    const isEditingCard = this.props.isEditingCard;
    const editingLaneId = this.props.editingLaneId;
    const editingCardIndex = this.props.editingCardIndex;
    return (
      <div className="board">
        {isEditingCard && <EditableCard laneId={editingLaneId} cardIndex={editingCardIndex}/>}
        <div className="board-header">
          <Header />
        </div>
        <div className="board-container">
          <BoardContainer />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isEditingCard: state.data.isEditingCard,
    editingLaneId: state.data.editingLaneId,
    editingCardIndex: state.data.editingCardIndex
  };
}

function mapDispatchToProps(dispatch) {
  return {
    initBoard: () => dispatch(actions.initBoard())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Board);