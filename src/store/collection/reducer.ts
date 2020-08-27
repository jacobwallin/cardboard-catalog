import {
  CollectionState,
  CollectionActionTypes,
  GET_SETS,
  GET_SINGLE_SET,
} from "./types";

const initialState: CollectionState = {
  sets: [],
  singleSet: {
    id: 0,
    name: "",
    year: 0,
    createdAt: "",
    updatedAt: "",
    BrandId: 0,
    Cards: [],
  },
};

export default function collectionReducer(
  state = initialState,
  action: CollectionActionTypes
): CollectionState {
  switch (action.type) {
    case GET_SETS:
      return { ...state, sets: action.sets };
    case GET_SINGLE_SET:
      return { ...state, singleSet: action.singleSet };
    default:
      return state;
  }
}
