import React from "react";
import Help from "./Help";
import { NoteInstructions } from "./styled";

export default function NoteHelp() {
  return (
    <Help
      NoteComponent={
        <NoteInstructions>
          Use the note field to denote any unique card characteristics, e.g.
          "Checklist", "Team Card", or a description of the image variation for
          a short print.
        </NoteInstructions>
      }
    />
  );
}
