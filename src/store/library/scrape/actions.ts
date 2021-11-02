import * as types from "./types";

export const scrapeCardDataRequest = (): types.ScrapeActionTypes => ({
  type: types.SCRAPE_CARD_DATA_REQUEST,
});
export const scrapeCardDataSuccess = (
  cardData: types.ScrapeState
): types.ScrapeActionTypes => ({
  type: types.SCRAPE_CARD_DATA_SUCCESS,
  cardData,
});
export const scrapeCardDataFailure = (): types.ScrapeActionTypes => ({
  type: types.SCRAPE_CARD_DATA_FAILURE,
});
