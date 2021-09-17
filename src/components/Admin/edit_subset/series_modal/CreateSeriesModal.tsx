import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../store";

import ModalBackground from "../../components/modal/Background";
import CreateModalWindow from "../../components/modal/ModalWindow";
import StyledTextInput from "../../components/modal/StyledTextInput";
import StyledLabel from "../../components/modal/StyledLabel";
import StyledTextArea from "../../components/modal/StyledTextArea";
import StyledInputContainer from "../../components/modal/InputContainer";
import CreateModalButtons from "../../components/modal/ModalButtons";
import CreateModalHeader from "../../components/modal/ModalHeader";

import { createLoadingSelector } from "../../../../store/loading/reducer";

const isCreatingSelector = createLoadingSelector(["CREATE_SERIES"]);

interface Props {
  handleCancel(): any;
}

export default function CreateSeriesModal(props: Props) {
  const dispatch = useDispatch();

  // FORM DATA
  const [nameField, setNameField] = useState("");
  const [serialized, setSerialized] = useState<number | undefined>(undefined);
  const [auto, setAuto] = useState(false);
  const [relic, setRelic] = useState(false);
  const [manufacturedRelic, setManufacturedRelic] = useState(false);
  const [parallel, setParallel] = useState(false);
  const [shortPrint, setShortPrint] = useState(false);

  const isCreating = useSelector((state: RootState) =>
    isCreatingSelector(state)
  );

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
      case "seriesserialized":
        setSerialized(+event.target.value);
        break;
      case "parallel":
        setParallel(!parallel);
        break;
      case "shortPrint":
        setShortPrint(!shortPrint);
        break;
      case "auto":
        setAuto(!auto);
        break;
      case "relic":
        setRelic(!relic);
        break;
      case "manufacturedRelic":
        setManufacturedRelic(!manufacturedRelic);
        break;
    }
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

        <StyledInputContainer>
          <StyledLabel>Serialized To</StyledLabel>
          <StyledTextInput
            name="seriesserialized"
            type="number"
            value={serialized || ""}
            onChange={handleInputChange}
          />
        </StyledInputContainer>

        <StyledInputContainer>
          <StyledLabel htmlFor="parallel">Parallel</StyledLabel>
          <input
            name="parallel"
            type="checkbox"
            checked={parallel}
            onChange={handleInputChange}
          />
        </StyledInputContainer>
        <StyledInputContainer>
          <StyledLabel htmlFor="shortPrint">Short Print</StyledLabel>
          <input
            name="shortPrint"
            type="checkbox"
            checked={shortPrint}
            onChange={handleInputChange}
          />
        </StyledInputContainer>
        <StyledInputContainer>
          <StyledLabel htmlFor="auto">Auto</StyledLabel>
          <input
            name="auto"
            type="checkbox"
            checked={auto}
            onChange={handleInputChange}
          />
        </StyledInputContainer>
        <StyledInputContainer>
          <StyledLabel htmlFor="relic">Relic</StyledLabel>
          <input
            name="relic"
            type="checkbox"
            checked={relic}
            onChange={handleInputChange}
          />
        </StyledInputContainer>
        <StyledInputContainer>
          <StyledLabel htmlFor="manufacturedRelic">
            Manufactured Relic
          </StyledLabel>
          <input
            name="manufacturedRelic"
            type="checkbox"
            checked={manufacturedRelic}
            onChange={handleInputChange}
          />
        </StyledInputContainer>

        <CreateModalButtons
          disabled={isCreating}
          handleSubmit={handleFormSubmit}
          handleCancel={props.handleCancel}
        />
      </CreateModalWindow>
    </ModalBackground>
  );
}
