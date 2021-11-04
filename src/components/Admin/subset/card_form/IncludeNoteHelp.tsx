import React from "react";
import Help from "./Help";
import { IncludeNotesInstructions } from "./styled";

export default function IncludeNoteHelp() {
  return (
    <Help
      NoteComponent={
        <IncludeNotesInstructions>
          Any scraped note data will be added.
        </IncludeNotesInstructions>
      }
    />
  );
}
