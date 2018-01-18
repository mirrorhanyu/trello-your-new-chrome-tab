import React, {Component} from 'react';
import {connect} from "react-redux";
import actions from '../redux/actions/dataAction';
import './css/Card.css';
import {findDOMNode} from 'react-dom';
import {flow} from "lodash";

import {DragSource, DropTarget} from 'react-dnd';
import {DRAG_CARD_TYPE, DROP_CARD_TYPE} from "../contants/Type";

class Card extends Component {

  constructor(props) {
    super(props);
    this.state = {isCardFoucsed: false};
  }

  focus() {
    this.setState({isCardFoucsed: true});
  }

  leave() {
    this.setState({isCardFoucsed: false});
  }

  removeCard(laneId, cardIndex) {
    this.props.removeCard(laneId, cardIndex);
  }

  editCard(laneId, cardIndex){
    this.props.editCard(laneId, cardIndex);
  }

  render() {
    const cardData = this.props.cardData;
    const cardIndex = this.props.cardIndex;
    const laneId = this.props.laneId;
    
    const {isDragging, connectDragSource, connectDropTarget} = this.props;

    const isCardFoucsed = this.state.isCardFoucsed;
    
    const cardClassName = isDragging ? "card dragging" : isCardFoucsed ? "card hovered" : "card";
    const cardRemoverClassName = isCardFoucsed ? "card-remover" : "card-remover invisible";
    const cardContentClassName = isDragging ? "card-content dragging" : "card-content";

    return connectDragSource(
      connectDropTarget(
        <div className={cardClassName} onClick={this.editCard.bind(this, laneId, cardIndex)} onMouseEnter={this.focus.bind(this)} onMouseLeave={this.leave.bind(this)}>
          <div className={cardRemoverClassName} onClick={this.removeCard.bind(this, laneId, cardIndex)}>&times;</div>
          <div className={cardContentClassName}>
            <div>{cardData.content}</div>
          </div>
        </div>
      )
    );
  }
}

const cardTarget = {
  hover (props, monitor, component) {
    const item = monitor.getItem();
    const laneId = item.laneId;
    const dragIndex = item.cardIndex;
    const hoverIndex = props.index;
    
    if (dragIndex === hoverIndex) {
      return;
    }
    
    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return
    }

    if (props.laneId === laneId) {
      props.updateCards(laneId, dragIndex, hoverIndex);
      monitor.getItem().cardIndex = hoverIndex;
    }
  }
};

const cardSource = {
  beginDrag(props, monitor, component) {
    const cardHeight = findDOMNode(component).getBoundingClientRect().height;
    return {
      dragType: DRAG_CARD_TYPE,
      laneId: props.laneId,
      cardIndex: props.cardIndex,
      cardData: props.cardData,
      cardHeight: cardHeight
    }
  },

  isDragging(props, monitor){
    return monitor.getItem().laneId ===  props.laneId
      && monitor.getItem().cardData.content === props.cardData.content;
  }
};

function mapStateToProps(state, ownProps) {
  return {
    cardData: ownProps.data,
    cardIndex: ownProps.index,
    laneId: ownProps.laneId
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateCards: (laneId, dragIndex, hoverIndex) => dispatch(actions.updateCards(laneId, dragIndex, hoverIndex)),
    removeCard: (laneId, cardIndex) => dispatch(actions.removeCard(laneId, cardIndex)),
    editCard: (laneId, cardIndex) => dispatch(actions.editCard(laneId, cardIndex))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  flow(
    DropTarget(DROP_CARD_TYPE, cardTarget, connect => ({
      connectDropTarget: connect.dropTarget()
    })),
    DragSource(DRAG_CARD_TYPE, cardSource, (connect, monitor) => ({
      connectDragSource: connect.dragSource(), isDragging: monitor.isDragging()
    }))
  )(Card)
);
