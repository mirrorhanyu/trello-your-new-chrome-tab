import React, {Component} from 'react';
import {connect} from "react-redux";
import actions from '../redux/actions/dataAction';
import Card from "./Card";
import './css/Lane.css';

class Lane extends Component {

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
  
  addCard(laneId) {
    this.props.addCard(laneId, this.state.noise);
  }

  render() {
    const isMouthOpen = this.state.isMouthOpen;
    
    const laneId = this.props.laneId;
    
    const title = this.props.lanes[laneId].title;

    const cards = this.props.lanes[laneId].cards.map((card, index) => (
      <Card key={index} data={card}/>
    ));
    
    const laneFooter = isMouthOpen ? (
      <div className="lane-input">
        <textarea value={this.state.noise} onChange={this.makeNoise.bind(this)}/>
        <input type="button" value="Add" onClick={this.addCard.bind(this, laneId)} />
      </div>
    ) : (
      <div className="lane-add-card">
        <p onClick={this.speak.bind(this)}>Add a card...</p>
      </div>
    );

    return (
      <div className="lane">
        <div className="lane-title">
          {title}
        </div>
        <div className="lane-cards">
          {cards}
        </div>
        {laneFooter}
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    lanes: state.data.lanes,
    laneId: ownProps.id
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addCard: (laneId, card) => dispatch(actions.addCard(laneId, card))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Lane);