import {get, set} from "../../services/localStorage";
import {settings} from "../../settings";

const defaultLanes = [{cards: [], title: "Trello"}];

const fetchLanes = () => {
  const lanesInlocalStorage = get(settings.LOCAL_STORAGE_KEY);
  return JSON.parse(lanesInlocalStorage) || defaultLanes;
};

const storeLanes = (lanes) => {
  set(settings.LOCAL_STORAGE_KEY, JSON.stringify(lanes));
};

function dataReducer(state = {
  lanes: [{cards: [], title: ""}]
}, action) {
  const lanes = fetchLanes();
  switch (action.type) {
    case "INIT_TRELLO_BOARD" :
    {
      storeLanes(lanes);
      return {...state, lanes};
    }
    case "ADD_CARD":
    {
      const payload = action.payload;
      const id = payload.laneId;
      const content = payload.card;
      lanes[id].cards.push({content});
      storeLanes(lanes);
      return {...state, lanes};
    }
    default:
      return state;
  }
}
export default dataReducer;
