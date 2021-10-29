import { ThunkAction } from "redux-thunk";
import { RootState } from "../../index";
import * as actions from "./actions";
import { FilterCollectionActions } from "./types";
import { get } from "../../../utils/fetch";
import { logout, Logout } from "../../index";

type Actions = FilterCollectionActions | Logout;

export const fetchCards = (): ThunkAction<void, RootState, unknown, Actions> => (dispatch) => {
  dispatch(actions.getCardsRequest());
  get(`/api/collection/filter/`)
    .then((payload) => {
      dispatch(actions.getCardsSuccess(payload));
    })
    .catch((err) => {
      if (err.status === 401) {
        dispatch(logout());
      } else {
        dispatch(actions.getCardsFailure());
      }
    });
};
