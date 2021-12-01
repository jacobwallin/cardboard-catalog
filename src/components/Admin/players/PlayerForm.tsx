import React, { useState } from "react";
import detectFormChanges from "../detectFormChanges";
import FieldContainer from "../components/form/FieldContainer";
import FieldTitle from "../components/form/FieldTitle";
import FieldData from "../components/form/FieldData";
import StyledButton from "../components/StyledButton";
import * as StyledInputs from "../components/form/Inputs";
import validate from "validate.js";

interface Props {
  handleSubmit(playerData: {
    name: string;
    fullName: string;
    url: string;
    birthday: string;
    hallOfFame: boolean;
  }): void;
}

export default function PlayerForm(props: Props) {
  const [name, setName] = useState("");
  const [fullName, setFullName] = useState("");
  const [url, setUrl] = useState("");
  const [validUrl, setValidUrl] = useState(false);
  const [dob, setDob] = useState("");
  const [hof, setHof] = useState(false);

  function handleTextChange(e: React.ChangeEvent<HTMLInputElement>) {
    switch (e.target.id) {
      case "name":
        setName(e.target.value);
        break;
      case "fullName":
        setFullName(e.target.value);
        break;
      case "url":
        setUrl(e.target.value);
        if (
          !validate(
            { url: e.target.value },
            {
              url: {
                url: { schemes: ["https"] },
              },
            }
          )
        ) {
          setValidUrl(true);
        }
        break;
      case "dob":
        setDob(e.target.value);
        break;
    }
  }

  function handleCheckboxChange(e: React.ChangeEvent<HTMLInputElement>) {
    setHof(e.target.checked);
  }

  function handleSubmit() {
    props.handleSubmit({ name, fullName, url, birthday: dob, hallOfFame: hof });
  }

  return (
    <>
      <FieldContainer>
        <FieldTitle>Name</FieldTitle>
        <FieldData>
          <StyledInputs.Input
            type="text"
            id="name"
            placeholder="enter name"
            value={name}
            onChange={handleTextChange}
          />
        </FieldData>
      </FieldContainer>
      <FieldContainer>
        <FieldTitle>Full Name</FieldTitle>
        <FieldData>
          <StyledInputs.Input
            type="text"
            id="fullName"
            placeholder="enter full name"
            value={fullName}
            onChange={handleTextChange}
          />
        </FieldData>
      </FieldContainer>
      <FieldContainer>
        <FieldTitle>Date of Birth</FieldTitle>
        <FieldData>
          <StyledInputs.Input
            type="date"
            id="dob"
            value={dob}
            onChange={handleTextChange}
          />
        </FieldData>
      </FieldContainer>
      <FieldContainer>
        <FieldTitle>Webpage</FieldTitle>
        <FieldData>
          <StyledInputs.LargeInput
            type="text"
            id="url"
            placeholder="enter url"
            value={url}
            onChange={handleTextChange}
          />
        </FieldData>
      </FieldContainer>
      <FieldContainer>
        <FieldTitle>In HOF</FieldTitle>
        <FieldData>
          <input
            type="checkbox"
            checked={hof}
            onChange={handleCheckboxChange}
          />
        </FieldData>
      </FieldContainer>
      <StyledButton
        color="GREEN"
        width="125px"
        height="30px"
        onClick={handleSubmit}
        disabled={name === "" || fullName === "" || dob === "" || !validUrl}
      >
        Save
      </StyledButton>
    </>
  );
}
