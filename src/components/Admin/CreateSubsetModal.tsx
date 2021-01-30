import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { createSubset } from "../../store/library/sets/thunks";
import { createLoadingSelector } from "../../store/loading/reducer";

import ModalBackground from "./components/modal/ModalBackground";
import CreateModalWindow from "./components/modal/CreateModalWindow";
import StyledTextInput from "./components/form/StyledTextInput";
import StyledLabel from "./components/form/StyledLabel";
import StyledTextArea from "./components/form/StyledTextArea";
import StyledInputContainer from "./components/form/StyledInputContainer";
import CreateModalButtons from "./components/modal/CreateModalButtons";
import CreateModalHeader from "./components/modal/CreateModalHeader";

interface Props {
  handleCancel(): any;
}

const creatingSubsetSelector = createLoadingSelector(["CREATE_SUBSET"]);

export default function CreateSubsetModal(props: Props) {
  const dispatch = useDispatch();
  const [nameField, setNameField] = useState("");
  const [descriptionField, setDescriptionField] = useState("");

  const set = useSelector((state: RootState) => state.library.sets.singleSet);
  const creatingSubset = useSelector((state: RootState) =>
    creatingSubsetSelector(state)
  );
  function handleFormSubmit() {
    if (nameField !== "" && descriptionField !== "") {
      dispatch(
        createSubset({
          name: nameField,
          description: descriptionField,
          setId: set.id,
        })
      );
    }
  }

  function handleInputChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    switch (event.target.name) {
      case "subsetNameField":
        setNameField(event.target.value);
        break;
      case "subsetDescField":
        setDescriptionField(event.target.value);
        break;
    }
  }

  return (
    <ModalBackground>
      <CreateModalWindow>
        <CreateModalHeader>CREATE SUBSET</CreateModalHeader>
        <StyledInputContainer>
          <StyledLabel htmlFor="subsetNameField">Name</StyledLabel>
          <StyledTextInput
            name="subsetNameField"
            type="text"
            onChange={handleInputChange}
            disabled={creatingSubset}
          />
        </StyledInputContainer>
        <StyledInputContainer>
          <StyledLabel htmlFor="subsetDescField">Description</StyledLabel>
          <StyledTextArea
            name="subsetDescField"
            value={descriptionField}
            disabled={creatingSubset}
            onChange={handleInputChange}
            style={{ height: "200px", width: "100%" }}
            rows={2}
            cols={20}
          />
        </StyledInputContainer>
        <CreateModalButtons
          disabled={creatingSubset}
          handleCancel={props.handleCancel}
          handleSubmit={handleFormSubmit}
        />
      </CreateModalWindow>
    </ModalBackground>
  );
}
