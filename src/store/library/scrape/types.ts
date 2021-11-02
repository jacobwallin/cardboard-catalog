// STATE
export type ScrapeState = ScrapedCardData[];

interface ScrapedCardData {
  number: string;
  name: string;
  player: boolean;
  team: string;
  comment: string;
  attributes: string[];
}

// ACTION TYPES
export const SCRAPE_CARD_DATA_REQUEST = "SCRAPE_CARD_DATA_REQUEST";
export const SCRAPE_CARD_DATA_SUCCESS = "SCRAPE_CARD_DATA_SUCCESS";
export const SCRAPE_CARD_DATA_FAILURE = "SCRAPE_CARD_DATA_FAILURE";
export const CLEAR_SCRAPED_CARDS = "CLEAR_SCRAPED_CARDS";

// ACTION CREATORS

interface ScrapeCardDataRequest {
  type: typeof SCRAPE_CARD_DATA_REQUEST;
}
interface ScrapeCardDataSuccess {
  type: typeof SCRAPE_CARD_DATA_SUCCESS;
  cardData: ScrapeState;
}
interface ScrapeCardDataFailure {
  type: typeof SCRAPE_CARD_DATA_FAILURE;
}

interface ClearScrapedCards {
  type: typeof CLEAR_SCRAPED_CARDS;
}

export type ScrapeActionTypes =
  | ScrapeCardDataRequest
  | ScrapeCardDataSuccess
  | ScrapeCardDataFailure
  | ClearScrapedCards;
