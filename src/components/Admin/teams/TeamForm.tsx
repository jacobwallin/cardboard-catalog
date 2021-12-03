import React, { useState } from "react";
import detectFormChanges from "../detectFormChanges";
import FieldContainer from "../components/form/FieldContainer";
import FieldTitle from "../components/form/FieldTitle";
import FieldData from "../components/form/FieldData";
import StyledButton from "../components/StyledButton";
import * as StyledInputs from "../components/form/Inputs";
import validate from "validate.js";
import { Team } from "../../../store/library/teams/types";

interface Props {
  handleSubmit(teamData: { name: string }): void;
  editTeam?: {
    name: string;
  };
}

export default function TeamForm(props: Props) {
  const [name, setName] = useState(props.editTeam ? props.editTeam.name : "");

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
  }

  function handleSubmit() {
    props.handleSubmit({ name });
  }

  return (
    <>
      <FieldContainer>
        <FieldTitle>Name</FieldTitle>
        <FieldData>
          <StyledInputs.Input
            value={name}
            placeholder="enter name"
            onChange={handleNameChange}
          />
        </FieldData>
      </FieldContainer>
      <StyledButton
        color="GREEN"
        width="125px"
        height="30px"
        onClick={handleSubmit}
        disabled={
          props.editTeam
            ? !detectFormChanges([name], [props.editTeam.name])
            : name === ""
        }
      >
        Save
      </StyledButton>
    </>
  );
}
