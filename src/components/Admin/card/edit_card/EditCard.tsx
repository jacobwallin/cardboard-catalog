import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { RootState } from "../../../../store/index";
import { updateCard, deleteCard } from "../../../../store/library/card/thunks";
import {
  createLoadingSelector,
  createStatusSelector,
} from "../../../../store/loading/reducer";
import CardForm from "./CardForm";
import FieldContainer from "../../components/form/FieldContainer";
import FieldTitle from "../../components/form/FieldTitle";
import FieldData from "../../components/form/FieldData";
import FormContainer from "../../components/form/FormContainer";
import EditDeleteButtons from "../../components/form/EditDeleteButtons";
import ConfirmDeleteModal from "../../components/ConfirmDeleteModal";

const isUpdatingSelector = createLoadingSelector(["UPDATE_CARD"]);
const deletingCardSelector = createStatusSelector("DELETE_CARD");

interface Props {
  cardDataId: number;
}

export default function EditCard(props: Props) {
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [cardDeleted, setCardDeleted] = useState(false);
  const [subsetId, setSubsetId] = useState(0);

  const isUpdating = useSelector((state: RootState) =>
    isUpdatingSelector(state)
  );
  const deleteCardStatus = useSelector((state: RootState) =>
    deletingCardSelector(state)
  );
  const card = useSelector((state: RootState) => state.library.card);

  useEffect(() => {
    if (!isUpdating) {
      setIsEditing(false);
    }
  }, [isUpdating]);

  function handleEditStateChange() {
    setIsEditing(!isEditing);
  }
  function toggleDeleteModal() {
    setShowDeleteModal(!showDeleteModal);
  }

  function handleFormSubmit(
    name: string,
    number: string,
    rookie: boolean,
    teamId: number | undefined,
    note: string,
    playerIds: number[]
  ) {
    dispatch(
      updateCard(props.cardDataId, {
        name,
        number,
        rookie,
        teamId,
        playerIds,
        note,
      })
    );
  }

  function handleDelete() {
    setCardDeleted(true);
    setSubsetId(card.subsetId);
    dispatch(deleteCard(props.cardDataId));
  }

  // re-direct if the card is succesfully deleted
  if (cardDeleted && deleteCardStatus === "SUCCESS") {
    return <Redirect to={`/admin/edit/subset/${subsetId}`} />;
  }

  return (
    <>
      {showDeleteModal && (
        <ConfirmDeleteModal
          deleteStatus={deleteCardStatus}
          handleDelete={handleDelete}
          handleDismiss={toggleDeleteModal}
          message="This will delete this card from all parallel series in the subset. Any cards will be deleted from user's collections as well."
        />
      )}
      {isEditing ? (
        <CardForm
          createNew={false}
          handleCancel={handleEditStateChange}
          handleSubmit={handleFormSubmit}
        />
      ) : (
        <FormContainer>
          <FieldContainer>
            <FieldTitle>Card Number:</FieldTitle>
            <FieldData>{card.number}</FieldData>
          </FieldContainer>
          <FieldContainer>
            <FieldTitle>Card Name:</FieldTitle>
            <FieldData>{card.name}</FieldData>
          </FieldContainer>
          <FieldContainer>
            <FieldTitle>Team:</FieldTitle>
            <FieldData>
              {card.team ? card.team.name : "No Team Assigned"}
            </FieldData>
          </FieldContainer>
          <FieldContainer>
            <FieldTitle>Rookie:</FieldTitle>
            <FieldData>{card.rookie ? "YES" : "NO"}</FieldData>
          </FieldContainer>
          <FieldContainer>
            <FieldTitle>Players:</FieldTitle>
            <FieldData>
              {card.players.length > 0
                ? card.players.map((player) => {
                    return <div key={player.id}>{player.name}</div>;
                  })
                : "No players belong to this card."}
            </FieldData>
          </FieldContainer>
          <FieldContainer>
            <FieldTitle>Note:</FieldTitle>
            <FieldData>{card.note}</FieldData>
          </FieldContainer>

          <EditDeleteButtons
            handleEdit={handleEditStateChange}
            handleDelete={toggleDeleteModal}
          />
        </FormContainer>
      )}
    </>
  );
}
