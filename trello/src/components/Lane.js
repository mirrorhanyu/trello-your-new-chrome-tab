import React, {Component} from 'react';
import {connect} from "react-redux";
import {findDOMNode} from 'react-dom';
import actions from '../redux/actions/dataAction';
import Card from "./Card";
import './css/Lane.css';

import { DropTarget } from 'react-dnd';
import { DROP_TYPE } from "../contants/Type";

class Lane extends Component {

  constructor(props) {
    super(props);
    this.state = {isMouthOpen: false, placeholderIndex: -1, placeholderHeight: 0};
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

  enterConfirm(laneId, event) {
    if(event.keyCode === 13 && event.shiftKey === false) {
      event.preventDefault();
      this.addCard(laneId);
    }
  }

  addCard(laneId) {
    this.props.addCard(laneId, this.state.noise);
    this.setState({noise: ""});
  }

  renameLane(laneId){
    this.props.renameLane(laneId, this.refs.title.textContent);
  }

  componentWillReceiveProps (nextProps) {
    if (!nextProps.isOver) {
      this.setState({placeholderIndex: -1})
    }
  }

  render() {
    const { connectDropTarget } = this.props;
    
    const isMouthOpen = this.state.isMouthOpen;
    
    const laneId = this.props.laneId;
    
    const title = this.props.lanes[laneId].title;

    const cards = this.props.lanes[laneId].cards.map((card, index) => (
      <Card key={index} index={index} data={card} laneId={laneId}/>
    ));

    const laneTitle = (
      <div ref="title" contentEditable={true} onBlur={this.renameLane.bind(this, laneId)} suppressContentEditableWarning={true} className="lane-title-content">{title}</div>
    );

    const laneFooter = isMouthOpen ? (
      <div className="lane-input">
        <textarea autoFocus={true} className="lane-input-content" value={this.state.noise} onChange={this.makeNoise.bind(this)} onKeyDown={this.enterConfirm.bind(this, laneId)} />
        <input className="input-saver" type="button" value="Add" onClick={this.addCard.bind(this, laneId)} />
        <i className="input-cancel" onClick={this.shutUp.bind(this)}>&times;</i>
      </div>
    ) : (
      <a className="lane-add-card" onClick={this.speak.bind(this)}>Add a card...</a>
    );

    if(this.state.placeholderIndex > -1){
      const placeholderHeight = this.state.placeholderHeight;
      const placeholderStyle = {
        height: placeholderHeight
      };
      cards.splice(this.state.placeholderIndex, 0, (<div key="placeholder" className="placeholder" style={placeholderStyle}></div>));
    }

    return connectDropTarget(
      <div className="lane">
        <div className="lane-title">
          {laneTitle}
        </div>
        <div className="lane-cards" ref="cards">
          {cards}
        </div>
        {laneFooter}
      </div>
    );
  }
}

const cardTarget = {
  hover(props, monitor, component) {
    const item = monitor.getItem();
    const placeholderHeight = item.cardHeight;
    const cardLaneId = item.laneId;
    const laneId = props.laneId;
    if(cardLaneId === laneId){
      return
    }

    const clientOffset = monitor.getClientOffset();
    
    const cards = component.refs.cards.getElementsByClassName("card");

    const hoverCardIndex = Array.prototype.findIndex.call(cards, (card) => {
      const cardBoundingRect = card.getBoundingClientRect();
      return cardBoundingRect.top + cardBoundingRect.height / 2 >= clientOffset.y;
    });
    
    const placeholderIndex = (hoverCardIndex === -1) ? cards.length : hoverCardIndex;

    component.setState({placeholderIndex, placeholderHeight});
  },

  drop(props, monitor, component){
    const item = monitor.getItem();
    const cardLaneId = item.laneId;
    const laneId = props.laneId;
    if(cardLaneId === laneId){
      return
    }
    const fromLaneId = item.laneId;
    const toLaneId = props.laneId;
    const fromCardIndex = item.cardIndex;
    const toCardIndex = component.state.placeholderIndex;
    props.moveCard(fromLaneId, toLaneId, fromCardIndex, toCardIndex);
    const placeholderIndex = -1;
    component.setState({placeholderIndex});
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

function mapStateToProps(state, ownProps) {
  return {
    lanes: state.data.lanes,
    laneId: ownProps.id
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addCard: (laneId, card) => dispatch(actions.addCard(laneId, card)),
    moveCard: (fromLaneId, toLaneId, fromCardIndex, toCardIndex) => dispatch(actions.moveCard(fromLaneId, toLaneId, fromCardIndex, toCardIndex)),
    renameLane: (laneId, title) => dispatch(actions.renameLane(laneId, title))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DropTarget(DROP_TYPE, cardTarget, collect)(Lane));