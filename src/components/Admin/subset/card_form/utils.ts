import { CardFormData } from "../../subset/scrape_cards/parseCards";

export const checkIfAdded = (
  cardData: CardFormData,
  scrapedCardsAdded: CardFormData[]
) => {
  return scrapedCardsAdded.some(
    (a) => a.number === cardData.number && a.name === cardData.name
  );
};

export const checkIfShortPrint = (cardData: CardFormData) => {
  return cardData.attributes.some((a) => a === "SP" || a === "SSP");
};
