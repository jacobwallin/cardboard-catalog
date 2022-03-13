import { ThunkAction } from "redux-thunk";
import { RootState } from "../../index";
import * as actions from "./actions";
import { CollectionActionTypes, CardData, NewCardsResponse } from "./types";
import { get, post } from "../../../utils/fetch";

export const fetchCardsBySet =
  (): ThunkAction<any, RootState, any, CollectionActionTypes> => (dispatch) => {
    dispatch(actions.getCardsBySetRequest());
    get("/api/collection/", dispatch)
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
    setId: number
  ): ThunkAction<void, RootState, unknown, CollectionActionTypes> =>
  (dispatch) => {
    dispatch(actions.getCardsBySubsetRequest());
    get(`/api/collection/set/${setId}`, dispatch)
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
    subsetId: number
  ): ThunkAction<void, RootState, unknown, CollectionActionTypes> =>
  (dispatch) => {
    get(`/api/collection/subset/${subsetId}`, dispatch)
      .then((data) => {
        dispatch(
          actions.getSingleSubsetCardsSuccess({ cards: data, subsetId })
        );
      })
      .catch((err) => {
        dispatch(actions.getSingleSubsetCardsFailure());
      });
  };
