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

import { fetchAttributes } from "../../store/library/attributes/thunks";

import { createLoadingSelector } from "../../store/loading/reducer";

const isCreatingSelector = createLoadingSelector(["CREATE_SERIES"]);
const isLoadingSelector = createLoadingSelector(["GET_ATTRIBUTES"]);

interface Props {
  handleCancel(): any;
}

export default function CreateSeriesModal(props: Props) {
  const [nameField, setNameField] = useState("");
  const [serializedToField, setSerializedToField] = useState<
    number | undefined
  >(undefined);
  const [attributesField, setAttributesField] = useState<Array<number>>([]);

  const isCreating = useSelector((state: RootState) =>
    isCreatingSelector(state)
  );
  const isLoadingAttributes = useSelector((state: RootState) =>
    isLoadingSelector(state)
  );

  const attributes = useSelector(
    (state: RootState) => state.library.attributes.attributes
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAttributes());
  }, []);

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
      case "seriesSerializedToField":
        setSerializedToField(+event.target.value);
        break;
    }
  }

  function handleCheckboxChange(event: React.ChangeEvent<HTMLInputElement>) {
    console.log("Checkbox clicked", event.target.checked, event.target.name);
    if (event.target.checked) {
      // console.log("CHECKED!");
      setAttributesField([...attributesField, +event.target.value]);
    } else {
      setAttributesField(
        attributesField.filter(
          (attributeId) => attributeId !== +event.target.value
        )
      );
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
          {attributes.map((attr) => {
            return (
              <div key={attr.id}>
                <input
                  type="checkbox"
                  id={attr.name}
                  name={attr.name}
                  value={attr.id}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor={attr.name}>{attr.name}</label>
              </div>
            );
          })}
        </StyledInputContainer>
        <div style={{ width: "50%" }}>
          <StyledInputContainer>
            <StyledLabel>Print Run</StyledLabel>
            <StyledTextInput
              name="seriesSerializedToField"
              type="number"
              value={serializedToField || ""}
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
