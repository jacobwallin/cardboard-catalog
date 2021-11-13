import { UserCard } from "../../../store/collection/filter/types";
import { getFullSetName } from "./columns";
import sortCardNumbers from "../../../utils/sortCardNumbers";

function createPdfData(
  cards: UserCard[],
  sortBy: string,
  sortDirection: string,
  columns: {
    cardNumber: boolean;
    cardName: boolean;
    setName: boolean;
    dateAdded: boolean;
    team: boolean;
    players: boolean;
  },
  title: string
): any {
  const checkboxSvg = `<svg width="10" height="10"><rect x="1" y="2" width="5" height="5" rx="1" stroke-width="1" stroke="#000" fill="#fff" /></svg>`;

  const cardData = cards
    .sort((cardA, cardB) => {
      let sort = 0;
      switch (sortBy) {
        case "set":
          if (
            cardA.card.series.subset.set.name <
            cardB.card.series.subset.set.name
          ) {
            sort = -1;
          } else if (
            cardA.card.series.subset.set.name >
            cardB.card.series.subset.set.name
          ) {
            sort = 1;
          } else if (
            cardA.card.series.subset.name < cardB.card.series.subset.name
          ) {
            sort = -1;
          } else if (
            cardA.card.series.subset.name > cardB.card.series.subset.name
          ) {
            sort = 1;
          } else if (cardA.card.series.name < cardB.card.series.name) {
            sort = -1;
          } else if (cardA.card.series.name > cardB.card.series.name) {
            sort = 1;
          } else {
            return sortCardNumbers(
              cardA.card.card_datum.number,
              cardB.card.card_datum.number
            );
          }
          if (sortDirection === "desc") return sort * -1;
          return sort;
        case "number":
          sort = sortCardNumbers(
            cardA.card.card_datum.number,
            cardB.card.card_datum.number
          );
          if (sortDirection === "desc") return sort * -1;
          return sort;
        case "name":
          if (cardA.card.card_datum.name < cardB.card.card_datum.name)
            return -1;
          if (cardA.card.card_datum.name > cardB.card.card_datum.name)
            return -1;
          return 0;
        case "date":
          if (cardA.createdAt < cardB.createdAt) sort = -1;
          if (cardA.createdAt > cardB.createdAt) sort = -1;
          sort = 0;
          if (sortDirection === "desc") return sort * -1;
          return sort;
        default:
          break;
      }

      return 0;
    })
    .map((card) => {
      let setPrintout = getFullSetName(card);

      return [
        { svg: checkboxSvg },
        card.card.card_datum.number,
        card.card.card_datum.name,
        setPrintout,
      ];
    });

  var definitions = {
    content: [
      { text: title, style: "header" },
      {
        style: "tableExample",
        layout: "noBorders",
        table: {
          body: [["", "#", "Name", "Set"], ...cardData],
        },
      },
    ],
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        margin: [0, 0, 0, 10],
      },
      subheader: {
        fontSize: 16,
        bold: true,
        margin: [0, 10, 0, 5],
      },
      tableExample: {
        margin: [0, 5, 0, 0],
        fontSize: 8,
      },
      tableHeader: {
        bold: true,
        fontSize: 13,
        color: "black",
      },
    },
  };

  console.dir(definitions);

  return definitions;
}

export default createPdfData;
