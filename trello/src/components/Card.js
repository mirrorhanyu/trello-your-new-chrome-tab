import React, { Component } from 'react';
import { connect } from "react-redux";
import './css/Card.css';

class Card extends Component {

  render() {
    const cardData = this.props.cardData;

    return (
      <div className="card">
        {cardData.content}
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    cardData: ownProps.data
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Card);