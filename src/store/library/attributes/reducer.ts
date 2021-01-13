import {  AttributeActionTypes, AttributeState, GET_ATTRIBUTES_SUCCESS } from "./types";

const initialState = {
  attributes: []
}


export default function attributeReducer(
  state: AttributeState = initialState,
  action: AttributeActionTypes
) {
  switch (action.type) {
    case GET_ATTRIBUTES_SUCCESS:
      return { ...state, attributes: action.attributes };
    default:
      return state;
  }
}
