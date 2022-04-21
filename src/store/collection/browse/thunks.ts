import { ThunkAction } from "redux-thunk";
import { RootState } from "../../index";
import * as actions from "./actions";
import { CollectionActionTypes } from "./types";
import { get } from "../../../utils/fetch";

export const fetchCardsBySet =
  (
    friendId?: number
  ): ThunkAction<any, RootState, any, CollectionActionTypes> =>
  (dispatch) => {
    dispatch(actions.getCardsBySetRequest());
    const query = friendId ? `?friendId=${friendId}` : "";
    get(`/api/collection/${query}`, dispatch)
      .then((data) => {
        dispatch(actions.setInitialDataLoad(true));
        dispatch(actions.getCardsBySetSuccess(data));
      })
      .catch((err) => {
        dispatch(actions.getCardsBySetFailure());
      });
  };

export const fetchCardsBySubset =
  (
    setId: number,
    friendId?: number
  ): ThunkAction<void, RootState, unknown, CollectionActionTypes> =>
  (dispatch) => {
    dispatch(actions.getCardsBySubsetRequest());
    const query = friendId ? `?friendId=${friendId}` : "";
    get(`/api/collection/set/${setId}${query}`, dispatch)
      .then((data) => {
        dispatch(
          actions.getCardsBySubsetSuccess({ cardsBySubset: data, setId })
        );
      })
      .catch((err) => {
        dispatch(actions.getCardsBySubsetFailure());
      });
  };

export const fetchCardsInSingleSubset =
  (
    subsetId: number,
    friendId?: number
  ): ThunkAction<void, RootState, unknown, CollectionActionTypes> =>
  (dispatch) => {
    dispatch(actions.getSingleSubsetCardsRequest());
    const query = friendId ? `?friendId=${friendId}` : "";
    get(`/api/collection/subset/${subsetId}${query}`, dispatch)
      .then((data) => {
        dispatch(
          actions.getSingleSubsetCardsSuccess({ cards: data, subsetId })
        );
      })
      .catch((err) => {
        dispatch(actions.getSingleSubsetCardsFailure());
      });
  };
