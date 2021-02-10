import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";

import ModalBackground from "./components/modal/ModalBackground";
import CreateModalWindow from "./components/modal/CreateModalWindow";
import StyledTextInput from "./components/form/StyledTextInput";
import StyledLabel from "./components/form/StyledLabel";
import StyledTextArea from "./components/form/StyledTextArea";
import StyledInputContainer from "./components/form/StyledInputContainer";
import CreateModalButtons from "./components/modal/CreateModalButtons";
import CreateModalHeader from "./components/modal/CreateModalHeader";

import { createLoadingSelector } from "../../store/loading/reducer";

const isCreatingSelector = createLoadingSelector(["CREATE_SERIES"]);

interface Props {
  handleCancel(): any;
}

export default function CreateSeriesModal(props: Props) {
  const [nameField, setNameField] = useState("");
  const [serializedField, setSerializedField] = useState<number | undefined>(
    undefined
  );
  const [isAuto, setIsAuto] = useState(false);
  const [isRelic, setIsRelic] = useState(false);
  const [isManufacturedRelic, setIsManufacturedRelic] = useState(false);
  const [isParallel, setIsParallel] = useState(false);
  const [isShortPrint, setIsShortPrint] = useState(false);

  const isCreating = useSelector((state: RootState) =>
    isCreatingSelector(state)
  );

  const dispatch = useDispatch();

  function handleFormSubmit() {
    // post to server
  }

  function handleInputChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    switch (event.target.name) {
      case "seriesNameField":
        setNameField(event.target.value);
        break;
      case "seriesSerializedField":
        setSerializedField(+event.target.value);
        break;
    }
  }

  function handleCheckboxChange(event: React.ChangeEvent<HTMLInputElement>) {
    console.log("Checkbox clicked", event.target.checked, event.target.name);
  }

  return (
    <ModalBackground>
      <CreateModalWindow>
        <CreateModalHeader>CREATE SERIES</CreateModalHeader>
        <StyledInputContainer>
          <StyledLabel>Name</StyledLabel>
          <StyledTextInput
            name="seriesNameField"
            type="text"
            value={nameField}
            onChange={handleInputChange}
          />
        </StyledInputContainer>

        <div style={{ width: "50%" }}>
          <StyledInputContainer>
            <StyledLabel>Serialized To</StyledLabel>
            <StyledTextInput
              name="seriesSerializedField"
              type="number"
              value={serializedField || ""}
              onChange={handleInputChange}
            />
          </StyledInputContainer>
        </div>

        <CreateModalButtons
          disabled={isCreating}
          handleSubmit={handleFormSubmit}
          handleCancel={props.handleCancel}
        />
      </CreateModalWindow>
    </ModalBackground>
  );
}
