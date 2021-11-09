import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import SubsetForm from "./SubsetForm";
import { RootState } from "../../../../store";
import {
  updateSubset,
  deleteSubset,
} from "../../../../store/library/subsets/thunks";
import ConfirmDeleteModal from "../../components/ConfirmDeleteModal";
import FieldContainer from "../../components/form/FieldContainer";
import FieldTitle from "../../components/form/FieldTitle";
import FieldData from "../../components/form/FieldData";
import FormContainer from "../../components/form/FormContainer";
import EditDeleteButtons from "../../components/form/EditDeleteButtons";
import ErrorMessage from "../../components/form/ErrorMessage";

import { createStatusSelector } from "../../../../store/loading/reducer";

const updatingSetSelector = createStatusSelector("UPDATE_SUBSET");
const deletingSetSelector = createStatusSelector("DELETE_SUBSET");

interface Props {
  subsetId: number;
}

export default function EditSubset(props: Props) {
  const dispatch = useDispatch();

  // show edit form
  const [showForm, setShowForm] = useState(false);
  // show confirm delete modal window
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  // set to true if user deletes set, this prompts a re-direct once the deletion is successful
  const [subsetDeleted, setSubsetDeleted] = useState(false);

  const subset = useSelector((state: RootState) => state.library.subsets);
  const updatingSubset = useSelector((state: RootState) =>
    updatingSetSelector(state)
  );
  const deletingSubsetStatus = useSelector((state: RootState) =>
    deletingSetSelector(state)
  );

  // if loading status of updating set changes to success, hide the form
  useEffect(() => {
    if (updatingSubset === "SUCCESS") {
      setShowForm(false);
    }
  }, [updatingSubset]);

  function toggleForm() {
    setShowForm(!showForm);
  }

  function toggleDeleteModal() {
    setShowDeleteModal(!showDeleteModal);
  }

  function handleDelete() {
    setSubsetDeleted(true);
    dispatch(deleteSubset(props.subsetId));
  }

  function handleSubmit(name: string, description: string) {
    dispatch(updateSubset(props.subsetId, { name, description }));
  }

  // re-direct to set that the subset belonged to after deletion
  if (subsetDeleted && deletingSubsetStatus === "SUCCESS") {
    return <Redirect to={`/admin/edit/set/${subset.setId}`} />;
  }
  return (
    <>
      {showDeleteModal && (
        <ConfirmDeleteModal
          deleteStatus={deletingSubsetStatus}
          handleDelete={handleDelete}
          handleDismiss={toggleDeleteModal}
          message="This will delete all cards and parallel series that belong to this subset. Any cards present in user's collections will be deleted as well."
        />
      )}
      {showForm ? (
        <SubsetForm
          createNew={false}
          handleSubmit={handleSubmit}
          handleCancel={toggleForm}
        />
      ) : (
        <FormContainer>
          <FieldContainer>
            <FieldTitle>Name:</FieldTitle>
            <FieldData>{subset.name}</FieldData>
          </FieldContainer>
          <FieldContainer>
            <FieldTitle>Description:</FieldTitle>
            <FieldData>
              {subset.description === "" ? "-" : subset.description}
            </FieldData>
          </FieldContainer>
          <EditDeleteButtons
            handleEdit={toggleForm}
            handleDelete={toggleDeleteModal}
            hideDelete={subset.set.baseSubsetId === subset.id}
          />
        </FormContainer>
      )}
      {updatingSubset === "FAILURE" && (
        <ErrorMessage>Error Updating Set</ErrorMessage>
      )}
    </>
  );
}
