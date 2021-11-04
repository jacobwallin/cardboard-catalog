import React from "react";
import Help from "./Help";
import { PlayerInstructions } from "./styled";

export default function PlayerHelp() {
  return (
    <Help
      NoteComponent={
        <PlayerInstructions>
          Add any players that are on the card. Players must be added regardless
          of what the card name is for the database to "connect" them to the
          card.
          <br />
          <br />
          If a player does not exist in the database, copy the url of their page
          on baseball reference and click "Add Player" to automatically add the
          player's information to the database.
        </PlayerInstructions>
      }
    />
  );
}
