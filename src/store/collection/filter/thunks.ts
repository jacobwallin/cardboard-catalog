import { ThunkAction } from "redux-thunk";
import { RootState } from "../../index";
import * as actions from "./actions";
import { FilterCollectionActions } from "./types";
import { get } from "../../../utils/fetch";
import { check401 } from "../../index";

export const fetchCards =
  (): ThunkAction<void, RootState, unknown, FilterCollectionActions> => (dispatch) => {
    dispatch(actions.getCardsRequest());
    get(`/api/collection/filter/`)
      .then((payload) => {
        dispatch(actions.getCardsSuccess(payload));
      })
      .catch((err) => {
        if (check401(err, dispatch)) {
          dispatch(actions.getCardsFailure());
        }
      });
  };
