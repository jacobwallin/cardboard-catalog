import { ThunkAction } from "redux-thunk";
import { RootState } from "../../index";
import * as actions from "./actions";
import { FilterCollectionActions } from "./types";
import { get } from "../../../utils/fetch";

export const fetchCards =
  (
    query: string
  ): ThunkAction<void, RootState, unknown, FilterCollectionActions> =>
  (dispatch) => {
    dispatch(actions.getCardsRequest());
    get(`/api/collection/filter/${query}`, dispatch)
      .then((payload) => {
        dispatch(actions.getCardsSuccess(payload));
      })
      .catch((err) => {
        dispatch(actions.getCardsFailure());
      });
  };
export const fetchPdfData =
  (
    query: string
  ): ThunkAction<void, RootState, unknown, FilterCollectionActions> =>
  (dispatch) => {
    dispatch(actions.getPdfCardsRequest());
    get(`/api/collection/filter/${query}`, dispatch)
      .then((payload) => {
        dispatch(actions.getPdfCardsSuccess(payload));
      })
      .catch((err) => {
        dispatch(actions.getPdfCardsFailure());
      });
  };
