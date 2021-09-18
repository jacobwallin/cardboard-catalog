import {
  CardState,
  CardActionTypes,
  GET_CARD_SUCCESS,
  UPDATE_CARD_SUCCESS,
} from "./types";

const initialState = {
  id: 0,
  name: "",
  number: "",
  rookie: false,
  createdAt: "",
  updatedAt: "",
  subsetId: 0,
  teamId: 0,
  team: {
    id: 0,
    name: "",
    createdAt: "",
    updatedAt: "",
    leagueId: 0,
  },
};

export default function cardReducer(
  state: CardState = initialState,
  action: CardActionTypes
) {
  switch (action.type) {
    case GET_CARD_SUCCESS:
      return action.card;
    case UPDATE_CARD_SUCCESS:
      return action.updatedCard;
    default:
      return state;
  }
}
