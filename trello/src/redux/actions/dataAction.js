const actions = {
  initBoard: () => {
    return {
      type: "INIT_TRELLO_BOARD"
    };
  },
  addCard: (laneId, card) => {
    const payload = {
      laneId,
      card
    };
    return {
      type: "ADD_CARD",
      payload
    }
  },
  addLane: (lane) => {
    const payload = {
      lane
    };
    return {
      type: "ADD_LANE",
      payload
    }
  },
  updateCards: (laneId, dragIndex, hoverIndex) => {
    const payload = {
      laneId,
      dragIndex,
      hoverIndex
    };
    return {
      type: "UPDATE_CARDS",
      payload
    }
  },
  moveCard: (fromLaneId, toLaneId, fromCardIndex, toCardIndex) => {
    const payload = {
      fromLaneId,
      toLaneId,
      fromCardIndex,
      toCardIndex
    };
    return {
      type: "MOVE_CARD",
      payload
    }
  },
  moveLane: (fromLaneId, toLaneId) => {
    const payload = {
      fromLaneId, 
      toLaneId
    };
    return {
      type: "MOVE_LANE",
      payload
    }
  },
  renameLane: (laneId, title) => {
    const payload = {
      laneId,
      title
    };
    return {
      type: "RENAME_LANE",
      payload
    }
  },
  removeCard: (laneId, cardIndex) => {
    const payload = {
      laneId,
      cardIndex
    };
    return {
      type: "REMOVE_CARD",
      payload
    }
  },
  editCard: (laneId, cardIndex) => {
    const payload = {
      laneId,
      cardIndex
    };
    return {
      type: "EDIT_CARD",
      payload
    }
  },
  cancelEditingCard: () => {
    return {
      type: "CANCEL_EDITING_CARD"
    }
  },
  saveCardDetail: (laneId, cardIndex, title, description, comments) => {
    const payload = {
      laneId, cardIndex, title, description, comments
    };
    return {
      type: "SAVE_CARD_DETAIL",
      payload
    };
  }
};

export default actions;