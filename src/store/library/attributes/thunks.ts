import { ThunkAction } from "redux-thunk";
import { RootState } from "../../index";
import { getAttributesRequest, getAttributesSuccess } from "./actions";
import { AttributeActionTypes } from "./types";

export const fetchAttributes = (): ThunkAction<
  void,
  RootState,
  unknown,
  AttributeActionTypes
> => (dispatch) => {
  dispatch(getAttributesRequest());
  fetch("/api/attributes")
    .then((response) => {
      return response.json();
    })
    .then((attributes) => {
      dispatch(getAttributesSuccess(attributes));
    })
    .catch((error) => console.log("ERROR IN FETCH ATTRIBUTES THUNK"));
};
