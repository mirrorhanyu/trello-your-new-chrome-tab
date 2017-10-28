import React, {Component} from 'react';
import {connect} from "react-redux";
import actions from '../redux/actions/dataAction';
import './css/Card.css';
import {findDOMNode} from 'react-dom';
import {flow} from "lodash";

import {DragSource, DropTarget} from 'react-dnd';
import {DRAG_TYPE, DROP_TYPE} from "../contants/Type";

class Card extends Component {

  render() {
    const cardData = this.props.cardData;
    
    const {isDragging, connectDragSource, connectDropTarget} = this.props;
    
    const cardClassName = isDragging ? "card dragging" : "card";
    const cardContentClassName = isDragging ? "card-content dragging" : "card-content";

    return connectDragSource(
      connectDropTarget(
        <div className={cardClassName}>
          <div className={cardContentClassName}>
            {cardData.content}
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
      dragType: DRAG_TYPE,
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
    updateCards: (laneId, dragIndex, hoverIndex) => dispatch(actions.updateCards(laneId, dragIndex, hoverIndex))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)
(
  flow(
    DropTarget(DROP_TYPE, cardTarget, connect => ({
      connectDropTarget: connect.dropTarget()
    })),
    DragSource(DRAG_TYPE, cardSource, (connect, monitor) => ({
      connectDragSource: connect.dragSource(), isDragging: monitor.isDragging()
    }))
  )
  (Card)
);
