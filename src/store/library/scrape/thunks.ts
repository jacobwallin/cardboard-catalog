import { ThunkAction } from "redux-thunk";
import { RootState } from "../../index";
import * as actions from "./actions";
import { ScrapeActionTypes, ScrapeState } from "./types";
import { get } from "../../../utils/fetch";

export const scrapeCardData =
  (url: string): ThunkAction<void, RootState, unknown, ScrapeActionTypes> =>
  (dispatch) => {
    dispatch(actions.scrapeCardDataRequest());
    get(`/api/carddata/scrape/?url=${url}`, dispatch)
      .then((cardData: ScrapeState) => {
        dispatch(actions.scrapeCardDataSuccess(cardData));
      })
      .catch((error) => {
        dispatch(actions.scrapeCardDataFailure());
      });
  };
