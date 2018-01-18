import React, {Component} from 'react';
import actions from '../redux/actions/dataAction';
import {connect} from "react-redux";
import autosize from 'autosize';
import {isEmpty} from 'lodash';
import {currentTime, formatTime} from '../services/timeProvider';
import './css/EditableCard.css';

class EditableCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: this.props.card.content,
      description: this.props.card.description,
      comments: this.props.card.comments,
      isEditingDescription: false,
      currentComment: ""
    };
  }

  componentDidUpdate() {
    autosize(this.refs["cardTitle"]);
    autosize(this.refs["cardDescription"]);
    autosize(this.refs["cardComments"]);
  }

  componentWillUnmount() {
    const laneId = this.props.laneId;
    const cardIndex = this.props.cardIndex;
    const title = this.state.title;
    const description = this.state.description;
    const comments = this.state.comments;
    
    if (title !== this.props.card.content || description !== this.props.card.description || comments !== this.props.card.comments) {
      this.props.saveCardDetail(laneId, cardIndex, title, description, comments);
    }
  }

  cancelEditingCard(event) {
    this.props.cancelEditingCard();
  }

  cardOverlayClick(event) {
    const clickOutsideCard = !this.refs.cardOverlayContent.contains(event.target);
    if (clickOutsideCard) {
      this.cancelEditingCard();
    }
  }

  editTitle(event) {
    this.setState({title: event.target.value});
  }

  startDescription() {
    this.setState({isEditingDescription: true});
  }

  editDescription(event) {
    this.setState({description: event.target.value})
  }

  stopDescription(event) {
    this.setState({isEditingDescription: false});
  }

  editCurrentComment(event) {
    this.setState({currentComment: event.target.value});
  }

  addCurrentComment() {
    let comments = this.state.comments.slice();
    comments.unshift({content: this.state.currentComment, timestamp: currentTime()});
    this.setState({comments: comments, currentComment: ""});
  }

  deleteComment(index) {
    let comments = this.state.comments.slice();
    comments.splice(index, 1);
    this.setState({comments: comments});
  }

  render() {
    // const laneId = this.props.laneId;
    // const cardIndex = this.props.cardIndex;
    // const card = this.props.card;

    const isEditingDescription = this.state.isEditingDescription;
    const description = this.state.description;
    const isDescriptionEmpty = isEmpty(description);
    const currentComment = this.state.currentComment;
    const isCurrentCommentEmpty = isEmpty(currentComment);

    const commentsQuanity = this.state.comments.length;
    const comments = this.state.comments.slice().map((comment, index) => {
      return (
        <div key={index} className="card-detail-comment">
          <div className="card-detail-comment-show" contentEditable={true}
               suppressContentEditableWarning={true}>{comment.content}</div>
          <p className="card-detail-comment-info">
            {formatTime(comment.timestamp)} - <a className="card-detail-comment-delete"
                                                 onClick={this.deleteComment.bind(this, index)}>Delete</a>
          </p>
          {commentsQuanity !== index + 1 && <div className="card-detail-comment-cut-off"></div>}
        </div>
      );
    });

    return (
      <div className="card-overlay" onClick={this.cardOverlayClick.bind(this)}>
        <div className="card-overlay-content" ref="cardOverlayContent">

          <div className="card-detail-cancel">
            <i className="input-cancel card-overlay-cancel" onClick={this.cancelEditingCard.bind(this)}>&times;</i>
          </div>

          <div className="card-detail-title">
            <i className="fa fa-terminal fa-lg card-detail-title-icon"></i>
            <textarea className="card-detail-title-input" ref="cardTitle" rows="1" value={this.state.title}
                      onChange={this.editTitle.bind(this)}></textarea>
          </div>

          <div className="card-detail-sidebar">
            <h3 className="card-detail-sidebar-hint">Add</h3>
            <div className="card-detail-sidebar-label">
              <i className="fa fa-tags card-detail-sidebar-icon" aria-hidden="true"></i>
              Labels
            </div>
            <div className="card-detail-sidebar-to-do-list">
              <i className="fa fa-check-square card-detail-sidebar-icon" aria-hidden="true"></i>
              To Do List
            </div>
          </div>


          <div className="card-detail-description">

            <div className="card-detail-description-entry" onClick={this.startDescription.bind(this)}>
              <i className="fa fa-align-left fa-flip-vertical card-detail-description-icon"></i>
              <a className="card-detail-description-hint">Edit the description...</a>
            </div>

            {!isEditingDescription && !isDescriptionEmpty &&
            <div className="card-detail-description-show">
              <span>{this.state.description}</span>
            </div>
            }

            {isEditingDescription &&
            <div className="card-detail-description-edit">
                <textarea className="card-detail-description-input" ref="cardDescription" rows="1" autoFocus="true"
                          onBlur={this.stopDescription.bind(this)}
                          placeholder="Add a more detailed description..." value={this.state.description}
                          onChange={this.editDescription.bind(this)}></textarea>
              <div className="card-detail-description-save">
                <input className="input-saver card-detail-description-submit" type="button" value="Save"/>
              </div>
            </div>
            }
          </div>

          <div className="card-detail-comments">
            <i className="fa fa-comment-o card-detail-comments-icon" aria-hidden="true"></i>
            <h3 className="card-detail-comments-hint">Add Comment</h3>
            <div className="card-detail-comments-input">
              <textarea className="card-detail-comments-area" ref="cardComments" rows="3"
                        placeholder="Write a comment..."
                        value={this.state.currentComment} onChange={this.editCurrentComment.bind(this)}></textarea>
              <div className="card-detail-comments-save">
                <input className="input-saver card-detail-comments-submit" type="button" value="Save"
                       onClick={this.addCurrentComment.bind(this)}/>
              </div>
            </div>

            {comments}

          </div>

        </div>

      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const laneId = ownProps.laneId;
  const cardIndex = ownProps.cardIndex;
  const card = state.data.lanes[laneId].cards[cardIndex];
  return {
    laneId, cardIndex, card
  };
}

function mapDispatchToProps(dispatch) {
  return {
    cancelEditingCard: () => dispatch(actions.cancelEditingCard()),
    saveCardDetail: (laneId, cardIndex, title, description, comments) => dispatch(actions.saveCardDetail(laneId, cardIndex, title, description, comments))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditableCard);