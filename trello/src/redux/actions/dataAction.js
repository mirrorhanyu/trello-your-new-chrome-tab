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
      type:"ADD_LANE",
      payload
    }
  }
};

export default actions;