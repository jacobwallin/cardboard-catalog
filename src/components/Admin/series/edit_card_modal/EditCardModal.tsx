import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store";
import ModalBackground from "../../../shared/Background";
import ModalWindow from "../../components/modal/ModalWindow";
import { updateCard } from "../../../../store/library/series/thunks";
import FieldContainer from "../../components/form/FieldContainer";
import FieldTitle from "../../components/form/FieldTitle";
import FieldData from "../../components/form/FieldData";
import FormContainer from "../../components/form/FormContainer";
import { Card } from "../../../../store/library/series/types";
import StyledButton from "../../components/StyledButton";
import ButtonContainer from "../../components/form/ButtonContainer";
import { createLoadingSelector } from "../../../../store/loading/reducer";
import * as styled from "./styled";
import ModalHeader from "../../components/modal/ModalHeader";

const isLoadingSelector = createLoadingSelector(["UPDATE_CARD"]);

interface Props {
  card: Card;
  seriesSerialized: number | null;
  dismiss(): void;
}

export default function EditCardModal(props: Props) {
  const dispatch = useDispatch();

  // initial value is either card.serializedTo, series.serialized, or empty string
  const currentSerializedTo = props.card.serializedTo
    ? String(props.card.serializedTo)
    : props.seriesSerialized
    ? String(props.seriesSerialized)
    : "";
  const [serializedTo, setSerializedTo] = useState<string>(currentSerializedTo);

  const isLoading = useSelector((state: RootState) => isLoadingSelector(state));

  function handleSerializedChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSerializedTo(event.target.value);
  }

  function handleUpdateCard() {
    // if serializedTo matches what is already set on series, set to null
    let serializedNumber = serializedTo === "" ? null : +serializedTo;
    if (+serializedTo === props.seriesSerialized) {
      serializedNumber = null;
    }

    // dispatch update card
    dispatch(
      updateCard(props.card.id, {
        serializedTo: serializedNumber,
      })
    );
  }

  return (
    <ModalBackground>
      <ModalWindow>
        <ModalHeader
          title={`Edit Card ${props.card.card_datum.number}`}
          handleClose={props.dismiss}
        />
        <styled.CannotEdit>
          <FieldContainer>
            <FieldTitle>Number</FieldTitle>
            <FieldData>{props.card.card_datum.number}</FieldData>
          </FieldContainer>
          <FieldContainer>
            <FieldTitle>Card Name</FieldTitle>
            <FieldData>{props.card.card_datum.name}</FieldData>
          </FieldContainer>
          <FieldContainer>
            <FieldTitle>Players</FieldTitle>
            <FieldData>
              {props.card.card_datum.players.length > 0
                ? props.card.card_datum.players.map((player) => {
                    return <div key={player.id}>{player.name}</div>;
                  })
                : "No players belong to this card."}
            </FieldData>
          </FieldContainer>
          <FieldContainer>
            <FieldTitle>Team</FieldTitle>
            <FieldData>
              {props.card.card_datum.team
                ? props.card.card_datum.team.name
                : "No Team Assigned"}
            </FieldData>
          </FieldContainer>
          <FieldContainer>
            <FieldTitle>Rookie</FieldTitle>
            <FieldData>{props.card.card_datum.rookie ? "YES" : "NO"}</FieldData>
          </FieldContainer>
          <FieldContainer>
            <FieldTitle>Note:</FieldTitle>
            <FieldData>{props.card.card_datum.note || "-"}</FieldData>
          </FieldContainer>
        </styled.CannotEdit>
        <FieldContainer>
          <FieldTitle>Serialized to</FieldTitle>
          <FieldData>
            <input
              name="serialized"
              type="number"
              value={serializedTo}
              placeholder="Enter #"
              onChange={handleSerializedChange}
            />
          </FieldData>
        </FieldContainer>
        <ButtonContainer>
          <StyledButton
            onClick={handleUpdateCard}
            color="GREEN"
            width="100px"
            height="27px"
            disabled={isLoading || serializedTo === currentSerializedTo}
          >
            Save
          </StyledButton>
        </ButtonContainer>
      </ModalWindow>
    </ModalBackground>
  );
}
