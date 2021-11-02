import React, { useState } from "react";
import * as Styled from "./styled";
import HelpIcon from "./help.svg";

interface Props {
  NoteComponent: React.ReactNode;
}

export default function Help(props: Props) {
  const [showHelp, setShowHelp] = useState(false);

  function mouseOver() {
    setShowHelp(true);
  }

  function mouseLeave() {
    setShowHelp(false);
  }

  const { NoteComponent } = props;

  return (
    <>
      <Styled.HelpSpan onMouseOver={mouseOver} onMouseLeave={mouseLeave}>
        <img src={HelpIcon} alt="help" />
      </Styled.HelpSpan>
      {showHelp && NoteComponent}
    </>
  );
}
