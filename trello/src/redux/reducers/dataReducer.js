import {get, set} from "../../services/localStorage";
import {settings} from "../../settings";

const defaultLanes = [];

const fetchLanes = () => {
  const lanesInlocalStorage = get(settings.LOCAL_STORAGE_KEY);
  return JSON.parse(lanesInlocalStorage) || defaultLanes;
};

const storeLanes = (lanes) => {
  set(settings.LOCAL_STORAGE_KEY, JSON.stringify(lanes));
};

const update = (cards, dragIndex, dropIndex) => {
  let card = cards[dragIndex];
  cards.splice(dragIndex, 1);
  cards.splice(dropIndex, 0, card);
};

const move = (lanes, fromLaneId, toLaneId, fromCardIndex, toCardIndex) => {
  const movedCards = lanes[fromLaneId].cards.splice(fromCardIndex, 1);
  lanes[toLaneId].cards.splice(toCardIndex, 0, movedCards[0]);
};

function dataReducer(state = {
  lanes: []
}, action) {
  switch (action.type) {
    case "INIT_TRELLO_BOARD" :
    {
      const lanes = fetchLanes();
      storeLanes(lanes);
      return {...state, lanes};
    }
    case "ADD_CARD":
    {
      const payload = action.payload;
      const id = payload.laneId;
      const content = payload.card;
      const lanes = state.lanes.slice();
      lanes[id].cards.push({content});
      storeLanes(lanes);
      return {...state, lanes};
    }
    case "ADD_LANE": {
      const payload = action.payload;
      const lane = payload.lane;
      const lanes = state.lanes.slice();
      lanes.push({cards: [], title: lane});
      storeLanes(lanes);
      return {...state, lanes};
    }
    case "UPDATE_CARDS": {
      const payload = action.payload;
      const laneId = payload.laneId;
      const dragIndex = payload.dragIndex;
      const hoverIndex = payload.hoverIndex;
      let lanes = state.lanes.slice();
      update(lanes[laneId].cards, dragIndex, hoverIndex);
      storeLanes(lanes);
      return {...state, lanes}
    }
    case "MOVE_CARD": {
      const payload = action.payload;
      const fromLaneId = payload.fromLaneId;
      const toLaneId = payload.toLaneId;
      const fromCardIndex = payload.fromCardIndex;
      const toCardIndex = payload.toCardIndex;
      let lanes = state.lanes.slice();
      move(lanes, fromLaneId, toLaneId, fromCardIndex, toCardIndex);
      storeLanes(lanes);
      return {...state, lanes}
    }
    case "RENAME_LANE": {
      const payload = action.payload;
      const laneId = payload.laneId; 
      const title = payload.title;
      let lanes = state.lanes.slice();
      lanes[laneId].title = title;
      storeLanes(lanes);
      return {...state, lanes};
    }
    default:
      return state;
  }
}
export default dataReducer;
