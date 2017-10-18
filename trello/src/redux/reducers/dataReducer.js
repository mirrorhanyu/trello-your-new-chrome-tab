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
    default:
      return state;
  }
}
export default dataReducer;
