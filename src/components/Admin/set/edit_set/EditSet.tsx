import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { RootState } from "../../../../store";
import { updateSet, deleteSet } from "../../../../store/library/sets/thunks";
import SetForm from "./SetForm";
import FieldContainer from "../../components/form/FieldContainer";
import FieldTitle from "../../components/form/FieldTitle";
import FieldData from "../../components/form/FieldData";
import FormContainer from "../../components/form/FormContainer";
import EditDeleteButtons from "../../components/form/EditDeleteButtons";
import ConfirmDeleteModal from "../../components/ConfirmDeleteModal";
import {
  createLoadingSelector,
  createStatusSelector,
} from "../../../../store/loading/reducer";

const updatingSetSelector = createLoadingSelector(["UPDATE_SET"]);
const deletingSetSelector = createStatusSelector("DELETE_SET");

interface Props {
  setId: number;
}

export default function EditSet(props: Props) {
  const dispatch = useDispatch();

  // show edit form
  const [showForm, setShowForm] = useState(false);
  // show confirm delete modal window
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  // set to true if user deletes set, this prompts a re-direct once the deletion is successful
  const [setDeleted, setSetDeleted] = useState(false);

  const set = useSelector((state: RootState) => state.library.sets.singleSet);
  const updatingSet = useSelector((state: RootState) =>
    updatingSetSelector(state)
  );
  const deletingSetStatus = useSelector((state: RootState) =>
    deletingSetSelector(state)
  );

  // if loading status of updating set changes to success, hide the form
  useEffect(() => {
    if (!updatingSet) {
      setShowForm(false);
    }
  }, [updatingSet]);

  function toggleForm() {
    setShowForm(!showForm);
  }
  function toggleDeleteModal() {
    setShowDeleteModal(!showDeleteModal);
  }

  function handleSubmit(
    name: string,
    year: number,
    description: string,
    leagueId: number,
    brandId: number,
    baseSubsetId: number | null
  ) {
    dispatch(
      updateSet(props.setId, {
        name,
        year,
        description,
        leagueId,
        brandId,
        baseSubsetId,
      })
    );
  }

  function handleDelete() {
    setSetDeleted(true);
    dispatch(deleteSet(props.setId));
  }

  // re-direct to main admin page if the set is successfully deleted
  if (setDeleted && deletingSetStatus === "SUCCESS") {
    return <Redirect to="/admin" />;
  }

  return (
    <>
      {showDeleteModal && (
        <ConfirmDeleteModal
          deleteStatus={deletingSetStatus}
          handleDelete={handleDelete}
          handleDismiss={toggleDeleteModal}
          message="This will delete the entire set including all subsets and cards. All cards will be deleted from user's collections as well."
        />
      )}
      {showForm ? (
        <SetForm
          createNew={false}
          handleSubmit={handleSubmit}
          handleCancel={toggleForm}
        />
      ) : (
        <FormContainer>
          <FieldContainer>
            <FieldTitle>Set Name:</FieldTitle>
            <FieldData>{set.name}</FieldData>
          </FieldContainer>
          <FieldContainer>
            <FieldTitle>Set Year:</FieldTitle>
            <FieldData>{set.year}</FieldData>
          </FieldContainer>
          <FieldContainer>
            <FieldTitle>Set Brand:</FieldTitle>
            <FieldData>{set.brand.name}</FieldData>
          </FieldContainer>
          <FieldContainer>
            <FieldTitle>Set League:</FieldTitle>
            <FieldData>{set.league.name}</FieldData>
          </FieldContainer>
          <FieldContainer>
            <FieldTitle>Base Subset:</FieldTitle>
            <FieldData>
              {set.baseSubsetId
                ? set.subsets.find((subset) => subset.id === set.baseSubsetId!)
                    ?.name
                : "NOT SELECTED"}
            </FieldData>
          </FieldContainer>
          <FieldContainer>
            <FieldTitle>Set Description:</FieldTitle>
            <FieldData>{set.description}</FieldData>
          </FieldContainer>
          <EditDeleteButtons
            handleEdit={toggleForm}
            handleDelete={toggleDeleteModal}
          />
        </FormContainer>
      )}
    </>
  );
}
