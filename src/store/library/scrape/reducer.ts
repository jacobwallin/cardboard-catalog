import * as types from "./types";

export default function cardReducer(
  state: types.ScrapeState = [],
  action: types.ScrapeActionTypes
) {
  switch (action.type) {
    case types.SCRAPE_CARD_DATA_SUCCESS:
      return action.cardData;
    default:
      return state;
  }
}
