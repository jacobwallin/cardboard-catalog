import React, { useState } from "react";
import detectFormChanges from "../detectFormChanges";
import FieldContainer from "../components/form/FieldContainer";
import FieldTitle from "../components/form/FieldTitle";
import FieldData from "../components/form/FieldData";
import StyledButton from "../components/StyledButton";
import * as StyledInputs from "../components/form/Inputs";
import { GradingCompany } from "../../../store/library/grading_companies/types";

interface Props {
  handleSubmit(companyData: { name: string }): void;
  editCompany?: GradingCompany;
}

export default function CompanyForm(props: Props) {
  const [name, setName] = useState(
    props.editCompany ? props.editCompany.name : ""
  );

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
          props.editCompany
            ? !detectFormChanges([props.editCompany.name], [name])
            : name === ""
        }
      >
        Save
      </StyledButton>
    </>
  );
}
