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

const updateCard = (cards, dragIndex, dropIndex) => {
  let card = cards[dragIndex];
  cards.splice(dragIndex, 1);
  cards.splice(dropIndex, 0, card);
};

const editCard = (lanes, laneId, cardIndex, content, description, comments) => {
  lanes[laneId].cards.splice(cardIndex, 1, {
    content,
    description,
    comments
  });
  return lanes;
};

const moveCard = (lanes, fromLaneId, toLaneId, fromCardIndex, toCardIndex) => {
  const movedCards = lanes[fromLaneId].cards.splice(fromCardIndex, 1);
  lanes[toLaneId].cards.splice(toCardIndex, 0, movedCards[0]);
};

const moveLane = (lanes, fromLaneId, toLaneId) => {
  const movedLanes = lanes.splice(fromLaneId, 1);
  lanes.splice(toLaneId, 0, movedLanes[0]);
};

const remove = (lanes, laneId, cardIndex) => {
  lanes[laneId].cards.splice(cardIndex, 1);
};

function dataReducer(state = {
  lanes: [],
  isEditingCard: false,
  editingLaneId: 0,
  editingCardIndex: 0
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
      const description = "";
      const comments = [];
      const lanes = state.lanes.slice();
      lanes[id].cards.push({content, description, comments});
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
      updateCard(lanes[laneId].cards, dragIndex, hoverIndex);
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
      moveCard(lanes, fromLaneId, toLaneId, fromCardIndex, toCardIndex);
      storeLanes(lanes);
      return {...state, lanes}
    }
    case "MOVE_LANE": {
      const payload = action.payload;
      const fromLaneId = payload.fromLaneId;
      const toLaneId = payload.toLaneId;
      let lanes = state.lanes.slice();
      moveLane(lanes, fromLaneId, toLaneId);
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
    case "REMOVE_CARD": {
      const payload = action.payload;
      const laneId = payload.laneId;
      const cardIndex = payload.cardIndex;
      let lanes = state.lanes.slice();
      remove(lanes, laneId, cardIndex);
      storeLanes(lanes);
      return {...state, lanes}
    }
    case "EDIT_CARD": {
      const payload = action.payload;
      const isEditingCard = true;
      const editingLaneId = payload.laneId;
      const editingCardIndex = payload.cardIndex;
      return {...state, isEditingCard, editingLaneId, editingCardIndex}
    }
    case "CANCEL_EDITING_CARD": {
      const isEditingCard = false;
      return {...state, isEditingCard}
    }
    case "SAVE_CARD_DETAIL": {
      const payload = action.payload;
      const laneId = payload.laneId;
      const cardIndex = payload.cardIndex;
      const title = payload.title;
      const description = payload.description;
      const comments = payload.comments;
      let lanes = state.lanes.slice();
      editCard(lanes, laneId, cardIndex, title, description, comments);
      storeLanes(lanes);
      return {...state, lanes}
    }
    default:
      return state;
  }
}
export default dataReducer;
