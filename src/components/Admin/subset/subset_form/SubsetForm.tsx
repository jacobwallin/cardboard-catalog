import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { createLoadingSelector } from "../../../../store/loading/reducer";
import detectFormChanges from "../../detectFormChanges";
import FieldContainer from "../../components/form/FieldContainer";
import FieldTitle from "../../components/form/FieldTitle";
import FieldData from "../../components/form/FieldData";
import FormButtons from "../../components/form/FormButtons";
import * as StyledInputs from "../../components/form/Inputs";

const isUpdatingSelector = createLoadingSelector(["UPDATE_SUBSET"]);

interface Props {
  createNew: boolean;
  handleSubmit(name: string, description: string): void;
  handleCancel(): void;
}

export default function SubsetForm(props: Props) {
  const subset = useSelector((state: RootState) => state.library.subsets);
  const isUpdating = useSelector((state: RootState) =>
    isUpdatingSelector(state)
  );

  const [name, setName] = useState(props.createNew ? "" : subset.name);

  const [description, setDescription] = useState(
    props.createNew ? "" : subset.description
  );

  function handleFormSubmit() {
    props.handleSubmit(name, description);
  }

  function handleInputChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { value } = event.target;
    switch (event.target.name) {
      case "name":
        setName(value);
        break;
      case "description":
        setDescription(value);
        break;
    }
  }

  return (
    <>
      <FieldContainer>
        <FieldTitle>Name</FieldTitle>
        <FieldData>
          <StyledInputs.Input
            name="name"
            type="text"
            value={name}
            placeholder="Enter Subset Name"
            onChange={handleInputChange}
          />
        </FieldData>
      </FieldContainer>
      <FieldContainer>
        <FieldTitle>Description</FieldTitle>
        <FieldData>
          <StyledInputs.TextArea
            name="description"
            value={description}
            disabled={isUpdating}
            placeholder="Enter Description"
            onChange={handleInputChange}
            style={{ height: "200px", width: "100%" }}
            rows={2}
            cols={20}
          />
        </FieldData>
      </FieldContainer>
      <FormButtons
        disabled={
          isUpdating ||
          (props.createNew
            ? name === ""
            : !detectFormChanges(
                [subset.name, subset.description],
                [name, description]
              ))
        }
        handleCancel={props.handleCancel}
        handleSubmit={handleFormSubmit}
      />
    </>
  );
}
