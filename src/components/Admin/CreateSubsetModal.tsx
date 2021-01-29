import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditFormLine from "./components/EditFormLine";
import EditFormContainer from "./components/EditFormContainer";
import { RootState } from "../../store";
import { createSubset } from "../../store/library/sets/thunks";
import styled from "styled-components";
import { createLoadingSelector } from "../../store/loading/reducer";
import StyledButton from "./components/StyledButton";

interface Props {
  handleCancel(): any;
}

const ModalBackground = styled.div`
  z-index: 2;
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  /* opacity: 0.9; */
  background: rgba(0, 0, 0, 0.7);
`;

const ModalWindow = styled.div`
  position: fixed;
  left: 50%;
  top: 30%;
  transform: translate(-50%, 0);
  background: white;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

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
    dispatch(
      createSubset({
        name: nameField,
        description: descriptionField,
        setId: set.id,
      })
    );
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
      <ModalWindow>
        <div>CREATE SUBSET</div>
        <EditFormContainer>
          <EditFormLine
            title="Subset Name"
            data="Subset Name"
            editing
            input={
              <input
                name="subsetNameField"
                type="text"
                onChange={handleInputChange}
                disabled={creatingSubset}
              />
            }
          />
          <EditFormLine
            title="Subset Description"
            data="Subset Description"
            editing
            input={
              <input
                name="subsetDescField"
                type="text"
                onChange={handleInputChange}
                disabled={creatingSubset}
              />
            }
          />
          <StyledButton
            color="GREEN"
            onClick={handleFormSubmit}
            disabled={creatingSubset}
          >
            Create
          </StyledButton>
          <StyledButton
            color="YELLOW"
            onClick={props.handleCancel}
            disabled={creatingSubset}
          >
            Cancel
          </StyledButton>
        </EditFormContainer>
      </ModalWindow>
    </ModalBackground>
  );
}
