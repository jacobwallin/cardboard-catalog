import { Player } from "../../../../store/library/players/types";
import { Team } from "../../../../store/library/teams/types";

export interface CardFormData {
  name: string;
  number: string;
  rookie: boolean;
  teamId: number | undefined;
  note: string;
  players: Player[];
}

export default function parseCards(
  cards: string,
  teams: Team[],
  players: Player[]
): CardFormData[] {
  let br = 0;

  // parse out each line
  let parsedCards = [];
  while (br !== -1) {
    br = cards.indexOf("\n");
    if (br === -1) {
      if (cards !== "") {
        parsedCards.push(cards);
      }
    } else {
      parsedCards.push(cards.slice(0, br));
    }
    cards = cards.slice(br + 1);
  }

  let cardData = parsedCards
    .map((cardDatum) => {
      let data: CardFormData = {
        number: "",
        name: "",
        teamId: undefined,
        rookie: false,
        note: "",
        players: [],
      };

      let locator = cardDatum.indexOf(" ");
      if (locator !== -1) {
        // parse out card number
        data.number = cardDatum.slice(0, locator);
        cardDatum = cardDatum.slice(locator).trim();

        locator = cardDatum.indexOf("-");
        if (locator !== -1) {
          // parse out card name
          data.name = cardDatum.slice(0, locator).trim();
          cardDatum = cardDatum.slice(locator + 1).trim();

          // TODO:  check if name matches a player or team
          var team = teams.find((team) => team.name === data.name);
          if (team) {
            data.teamId = team.id;
          } else {
            var player = players.find((player) => player.name === data.name);
            if (player) {
              data.players = [player];
            }
          }

          if (cardDatum.length > 0) {
            // if it was a team card (team name was card name), return data
            if (team) {
              return data;
            }

            // see if remaining string matches team name
            team = teams.find((team) => team.name === cardDatum);
            if (team) {
              data.teamId = team.id;
            } else {
              // slice of last portion of string and see if it is rookie, and check team name again
              const lastSpaceIdx = cardDatum.lastIndexOf(" ");
              if (cardDatum.slice(lastSpaceIdx + 1) === "RC") {
                data.rookie = true;
              }
              team = teams.find(
                (team) => team.name === cardDatum.slice(0, lastSpaceIdx)
              );
              if (team) {
                data.teamId = team.id;
              }
            }

            return data;
          }
        }
      }
      data.name = "remove";
      return data;
    })
    .filter((cardDatum) => cardDatum.name !== "remove");

  return cardData;
}
