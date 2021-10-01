import { ThunkAction } from "redux-thunk";
import { RootState } from "../../index";
import * as actions from "./actions";
import { FilterCollectionActions } from "./types";

export const fetchCards =
  (
    queryString: string
  ): ThunkAction<void, RootState, unknown, FilterCollectionActions> =>
  (dispatch) => {
    dispatch(actions.getCardsRequest());
    fetch(`/api/collection/filter/${queryString}`)
      .then((response) => {
        return response.json();
      })
      .then((payload) => {
        dispatch(actions.getCardsSuccess(payload));
      })
      .catch((error) => {
        dispatch(actions.getCardsFailure());
      });
  };
