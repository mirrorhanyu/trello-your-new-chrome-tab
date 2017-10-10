import React, {Component} from 'react';
import {connect} from "react-redux";
import Card from "./Card";
import './css/Lane.css';

class Lane extends Component {

  render() {
    const title = this.props.lanes.title;

    const cards = this.props.lanes.cards.map((card, index) => (
      <Card key={index} data={card}/>
    ));

    return (
      <div className="lane">
        <div className="lane-title">
          {title}
        </div>
        <div className="lane-cards">
          {cards}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    lanes: state.data.lanes[ownProps.id]
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Lane);