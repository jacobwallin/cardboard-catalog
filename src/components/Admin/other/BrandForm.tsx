import React, { useState } from "react";
import detectFormChanges from "../detectFormChanges";
import FieldContainer from "../components/form/FieldContainer";
import FieldTitle from "../components/form/FieldTitle";
import FieldData from "../components/form/FieldData";
import StyledButton from "../components/StyledButton";
import * as StyledInputs from "../components/form/Inputs";
import { Brand } from "../../../store/library/brands/types";

interface Props {
  handleSubmit(brandData: { name: string }): void;
  editBrand?: Brand;
}

export default function BrandForm(props: Props) {
  const [name, setName] = useState(props.editBrand ? props.editBrand.name : "");

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
            type="text"
            value={name}
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
          props.editBrand
            ? !detectFormChanges([props.editBrand.name], [name])
            : name === ""
        }
      >
        Save
      </StyledButton>
    </>
  );
}
