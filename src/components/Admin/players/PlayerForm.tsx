import React, { useState } from "react";
import detectFormChanges from "../detectFormChanges";
import FieldContainer from "../components/form/FieldContainer";
import FieldTitle from "../components/form/FieldTitle";
import FieldData from "../components/form/FieldData";
import * as StyledInputs from "../components/form/Inputs";

export default function PlayerForm() {
  const [name, setName] = useState("");
  const [fullName, setFullName] = useState("");
  const [url, setUrl] = useState("");
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
        break;
    }
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
          <StyledInputs.Input type="date" value={url} />
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
          <input type="checkbox" checked={hof} />
        </FieldData>
      </FieldContainer>
    </>
  );
}
