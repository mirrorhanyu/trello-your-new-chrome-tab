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
  }
};

export default actions;