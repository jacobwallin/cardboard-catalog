import React from "react";
import { useDispatch } from "react-redux";
import { createSubset } from "../../../../store/library/sets/thunks";
import { PostSubsetData } from "../../../../store/library/subsets/types";
import ModalBackground from "../../../shared/Background";
import ModalWindow from "../../components/modal/ModalWindow";
import ModalHeader from "../../components/modal/ModalHeader";
import SubsetForm from "../../subset/subset_form/SubsetForm";

interface Props {
  handleCancel(): any;
  setId: number;
}

export default function CreateSubsetModal(props: Props) {
  const dispatch = useDispatch();

  function handleFormSubmit(subsetData: {
    name: string;
    description: string;
    prefix: string;
    code: string | null;
    base: boolean;
    auto: boolean;
    relic: boolean;
    manufacturedRelic: boolean;
    shortPrint: boolean;
  }) {
    dispatch(createSubset({ ...subsetData, setId: props.setId }));
  }
  return (
    <ModalBackground>
      <ModalWindow>
        <ModalHeader title="Create Subset" handleClose={props.handleCancel} />
        <SubsetForm
          createNew={true}
          handleCancel={props.handleCancel}
          handleSubmit={handleFormSubmit}
        />
      </ModalWindow>
    </ModalBackground>
  );
}
