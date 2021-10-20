import React from "react";
import { useDispatch } from "react-redux";
import { createSubset } from "../../../../store/library/sets/thunks";

import ModalBackground from "../../../shared/Background";
import ModalWindow from "../../components/modal/ModalWindow";
import SubsetForm from "../../subset/subset_form/SubsetForm";

interface Props {
  handleCancel(): any;
  setId: number;
}

export default function CreateSubsetModal(props: Props) {
  const dispatch = useDispatch();

  function handleFormSubmit(name: string, description: string) {
    dispatch(createSubset({ name, description, setId: props.setId }));
  }
  return (
    <ModalBackground>
      <ModalWindow>
        <h3 style={{ textAlign: "center" }}>Create Subset</h3>
        <SubsetForm
          createNew={true}
          handleCancel={props.handleCancel}
          handleSubmit={handleFormSubmit}
        />
      </ModalWindow>
    </ModalBackground>
  );
}
