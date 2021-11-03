import { Player } from "../../../../store/library/players/types";
import { Team } from "../../../../store/library/teams/types";
import { ScrapeState } from "../../../../store/library/scrape/types";

export interface CardFormData {
  name: string;
  number: string;
  rookie: boolean;
  teamId: number | undefined;
  note: string;
  players: Player[];
}

export interface ParsedCards extends CardFormData {
  player: boolean;
}

export default function parseCards(
  scrapedData: ScrapeState,
  teams: Team[],
  players: Player[]
): ParsedCards[] {
  const allFormData = scrapedData.map((cardData) => {
    // set initial card form data
    const cardFormData: ParsedCards = {
      number: cardData.number,
      name: cardData.name,
      rookie: cardData.attributes.some((att) => att === "RC"),
      note: cardData.comment,
      players: [],
      teamId: undefined,
      player: cardData.player,
    };

    // find player
    if (cardData.player) {
      let player = players.find(
        (player) =>
          player.name.replace(".", "").replace("-", " ") ===
          cardData.name
            .replace(".", "")
            .replace("-", " ")
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
      );
      // add player if found
      if (player) {
        cardFormData.players.push(player);
      }
    }

    // find team
    if (cardData.team !== "") {
      const team = teams.find(
        (team) =>
          team.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "") ===
          cardData.team.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      );

      if (team) {
        cardFormData.teamId = team.id;
      }
    }

    // add team if found
    return cardFormData;
  });

  return allFormData;
}

/* CARDBOARD CONNECTION CHECKLIST PARSING */
// export default function parseCards(
//   cards: string,
//   teams: Team[],
//   players: Player[]
// ): CardFormData[] {
//   let br = 0;

//   // parse out each line
//   let parsedCards = [];
//   while (br !== -1) {
//     br = cards.indexOf("\n");
//     if (br === -1) {
//       if (cards !== "") {
//         parsedCards.push(cards);
//       }
//     } else {
//       parsedCards.push(cards.slice(0, br));
//     }
//     cards = cards.slice(br + 1);
//   }

//   let cardData = parsedCards
//     .map((parsedCard) => {
//       let data: CardFormData = {
//         number: "",
//         name: "",
//         teamId: undefined,
//         rookie: false,
//         note: "",
//         players: [],
//       };

//       let locator = parsedCard.indexOf(" ");
//       if (locator !== -1) {
//         // parse out card number
//         data.number = parsedCard.slice(0, locator);
//         parsedCard = parsedCard.slice(locator).trim();

//         locator = parsedCard.indexOf(" -");
//         if (locator !== -1) {
//           // parse out card name
//           data.name = parsedCard
//             .slice(0, locator)
//             .trim()
//             .normalize("NFD")
//             .replace(/[\u0300-\u036f]/g, "");
//           parsedCard = parsedCard.slice(locator + 2).trim();

//           // check if name matches a player or team
//           var team = teams.find((team) => team.name === data.name);
//           if (team) {
//             data.teamId = team.id;
//           } else {
//             var player = players.find(
//               (player) =>
//                 player.name.replace(".", "").replace("-", " ") ===
//                 data.name.replace(".", "").replace("-", " ")
//             );
//             if (player) {
//               data.players = [player];
//             }
//           }

//           if (parsedCard.length > 0) {
//             // if it was a team card (team name was card name), return data
//             if (team) {
//               return data;
//             }

//             // see if remaining string matches team name
//             team = teams.find((team) => team.name === parsedCard);
//             if (team) {
//               data.teamId = team.id;
//             } else {
//               // slice of last portion of string and see if it is rookie, and check team name again
//               const lastSpaceIdx = parsedCard.lastIndexOf(" ");
//               if (parsedCard.slice(lastSpaceIdx + 1) === "RC") {
//                 data.rookie = true;
//               }
//               team = teams.find(
//                 (team) => team.name === parsedCard.slice(0, lastSpaceIdx)
//               );
//               if (team) {
//                 data.teamId = team.id;
//               }
//             }

//             return data;
//           }
//         }
//         data.name = parsedCard;
//         return data;
//       }
//       data.name = "remove";
//       return data;
//     })
//     .filter((parsedCard) => parsedCard.name !== "remove");

//   return cardData;
// }
