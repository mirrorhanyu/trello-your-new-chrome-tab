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
  }
};

export default actions;