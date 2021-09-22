import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../store/index";
import { updateCard } from "../../../../store/library/card/thunks";
import { createLoadingSelector } from "../../../../store/loading/reducer";
import CardForm from "./CardForm";
import FieldContainer from "../../components/form/FieldContainer";
import FieldTitle from "../../components/form/FieldTitle";
import FieldData from "../../components/form/FieldData";
import FormContainer from "../../components/form/FormContainer";
import EditDeleteButtons from "../../components/form/EditDeleteButtons";

const isUpdatingSelector = createLoadingSelector(["UPDATE_CARD"]);

interface Props {
  cardDataId: number;
}

export default function EditCard(props: Props) {
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);

  const isUpdating = useSelector((state: RootState) =>
    isUpdatingSelector(state)
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

  function handleFormSubmit(
    name: string,
    number: string,
    rookie: boolean,
    teamId: number,
    playerIds: number[]
  ) {
    dispatch(
      updateCard(props.cardDataId, { name, number, rookie, teamId, playerIds })
    );
  }

  function handleDelete() {
    // DELETE CARD
  }

  return (
    <>
      {isEditing ? (
        <CardForm
          createNew={false}
          handleCancel={handleEditStateChange}
          handleSubmit={handleFormSubmit}
        />
      ) : (
        <FormContainer>
          <FieldContainer>
            <FieldTitle>Card Name:</FieldTitle>
            <FieldData>{card.name}</FieldData>
          </FieldContainer>
          <FieldContainer>
            <FieldTitle>Card Number:</FieldTitle>
            <FieldData>{card.number}</FieldData>
          </FieldContainer>
          <FieldContainer>
            <FieldTitle>Team:</FieldTitle>
            <FieldData>{card.team.name}</FieldData>
          </FieldContainer>
          <FieldContainer>
            <FieldTitle>Rookie:</FieldTitle>
            <FieldData>{card.rookie ? "YES" : "NO"}</FieldData>
          </FieldContainer>
          <FieldContainer>
            <FieldTitle>Players:</FieldTitle>
            <FieldData>
              {card.players.map((player) => {
                return <div key={player.id}>{player.name}</div>;
              })}
            </FieldData>
          </FieldContainer>

          <EditDeleteButtons
            handleEdit={handleEditStateChange}
            handleDelete={handleDelete}
          />
        </FormContainer>
      )}
    </>
  );
}
