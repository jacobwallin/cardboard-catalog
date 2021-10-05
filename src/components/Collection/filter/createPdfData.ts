import { UserCard } from "../../../store/collection/filter/types";
import { TDocumentDefinitions } from "pdfmake/interfaces";

function createPdfData(
  cards: UserCard[],
  columns: {
    cardNumber: boolean;
    cardName: boolean;
    setName: boolean;
    subsetName: boolean;
    dateAdded: boolean;
    team: boolean;
    players: boolean;
  },
  title: string
): any {
  const checkboxSvg = `<svg width="10" height="10"><rect x="1" y="2" width="5" height="5" rx="1" stroke-width="1" stroke="#000" fill="#fff" /></svg>`;

  const cardData = cards.map((card) => {
    let setPrintout = card.card.series.subset.set.name;

    if (
      card.card.series.subset.id === card.card.series.subset.set.baseSubsetId
    ) {
      setPrintout += "Base Set";
    } else {
      setPrintout += card.card.series.subset.name;
      if (card.card.series.id !== card.card.series.subset.baseSeriesId) {
        setPrintout += card.card.series.name;
      }
    }

    return [
      { svg: checkboxSvg },
      card.card.card_datum.number,
      card.card.card_datum.name,
      setPrintout,
    ];
  });

  console.log(cardData);

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
