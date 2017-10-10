function dataReducer(state = {
  lanes: [{}]
}, action) {
  switch (action.type) {
    case "INIT_TRELLO_BOARD" : {
      const lanes = [
        {
          cards: [
            {
              content: "Description here 1"
            },
            {
              content: "Description here 2"
            }
          ],
          title: "Findings"
        },
        {
          cards: [
            {
              content: "Description here 3"
            }
          ],
          title: "To Do"
        }
      ];
      return {...state, lanes};
    }
    default:
      return state;
  }
}
export default dataReducer;
