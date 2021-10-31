import React, { useState } from "react";
import { useDispatch } from "react-redux";
import ModalBackground from "../../../shared/Background";
import ModalWindow from "../../components/modal/ModalWindow";
import { updateCard } from "../../../../store/library/series/thunks";
import FieldContainer from "../../components/form/FieldContainer";
import FieldTitle from "../../components/form/FieldTitle";
import FieldData from "../../components/form/FieldData";
import { Card } from "../../../../store/library/series/types";
import StyledButton from "../../components/StyledButton";
import ButtonContainer from "../../components/form/ButtonContainer";
import * as styled from "./styled";

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
        <h3
          style={{ textAlign: "center" }}
        >{`Edit Card ${props.card.card_datum.number}`}</h3>
        <styled.CannotEdit>
          <FieldContainer>
            <FieldTitle>Number</FieldTitle>
            <FieldData>{props.card.card_datum.number}</FieldData>
          </FieldContainer>
          <FieldContainer>
            <FieldTitle>Card Name:</FieldTitle>
            <FieldData>{props.card.card_datum.name}</FieldData>
          </FieldContainer>
          <FieldContainer>
            <FieldTitle>Players:</FieldTitle>
            <FieldData>
              {props.card.card_datum.players.length > 0
                ? props.card.card_datum.players.map((player) => {
                    return <div key={player.id}>{player.name}</div>;
                  })
                : "No players belong to this card."}
            </FieldData>
          </FieldContainer>
          <FieldContainer>
            <FieldTitle>Team:</FieldTitle>
            <FieldData>
              {props.card.card_datum.team
                ? props.card.card_datum.team.name
                : "No Team Assigned"}
            </FieldData>
          </FieldContainer>
          <FieldContainer>
            <FieldTitle>Rookie:</FieldTitle>
            <FieldData>{props.card.card_datum.rookie ? "YES" : "NO"}</FieldData>
          </FieldContainer>
          <FieldContainer>
            <FieldTitle>Note:</FieldTitle>
            <FieldData>{props.card.card_datum.note || "-"}</FieldData>
          </FieldContainer>
        </styled.CannotEdit>
        <FieldContainer>
          <FieldTitle>Serialized to:</FieldTitle>
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
            onClick={props.dismiss}
            color="YELLOW"
            width="100px"
            height="27px"
          >
            Cancel
          </StyledButton>
          <StyledButton
            onClick={handleUpdateCard}
            color="GREEN"
            width="100px"
            height="27px"
            disabled={serializedTo === currentSerializedTo}
          >
            Save
          </StyledButton>
        </ButtonContainer>
      </ModalWindow>
    </ModalBackground>
  );
}
