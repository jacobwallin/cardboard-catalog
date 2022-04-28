import React, { useState } from "react";
import * as Styled from "./styled";
import StyledButton from "../../Admin/components/StyledButton";
import dataFieldsByTransactionType from "../shared/dataFieldsByType";
import { TransactionTypes } from "../../../store/collection/transactions/types";

export interface FormData {
  date: string;
  note: string | null;
  platform: string | null;
  individual: string | null;
  money: number | null;
}

interface Props {
  handleSubmit(data: FormData): void;
  type: TransactionTypes;
}

export default function TradeForm(props: Props) {
  const [date, setDate] = useState("");
  const [note, setNote] = useState("");
  const [platform, setPlatform] = useState("");
  const [individual, setIndividual] = useState("");
  const [money, setMoney] = useState("");

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    switch (e.target.id) {
      case "date":
        setDate(e.target.value);
        break;
      case "ind":
        setIndividual(e.target.value);
        break;
      case "platform":
        setPlatform(e.target.value);
        break;
      case "money":
        if (+e.target.value >= 0) {
          setMoney(e.target.value);
        }
        break;
    }
  }

  function handleNoteChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setNote(e.target.value);
  }

  function submit() {
    props.handleSubmit({
      date: date,
      note: note === "" ? null : note,
      platform: platform === "" ? null : platform,
      individual: individual === "" ? null : individual,
      money: money === "" ? null : +money,
    });
  }

  return (
    <Styled.Container>
      <Styled.InputContainer>
        <Styled.Label htmlFor="date">Date of Trade*</Styled.Label>
        <Styled.DateInput id="date" value={date} onChange={handleInputChange} />
      </Styled.InputContainer>
      <Styled.InputContainer>
        <Styled.Label htmlFor="platform">Traded through</Styled.Label>
        <Styled.TextInput
          id="platform"
          value={platform}
          onChange={handleInputChange}
        />
      </Styled.InputContainer>
      <Styled.Flex>
        <Styled.InputContainer>
          <Styled.Label htmlFor="ind">Traded To</Styled.Label>
          <Styled.TextInput
            id="ind"
            value={individual}
            onChange={handleInputChange}
          />
        </Styled.InputContainer>
        <Styled.InputContainer>
          <Styled.Label htmlFor="money">$</Styled.Label>
          <Styled.NumberInput
            id="money"
            value={money}
            onChange={handleInputChange}
          />
        </Styled.InputContainer>
      </Styled.Flex>
      <Styled.InputContainer>
        <Styled.Label htmlFor="note">Note</Styled.Label>
        <Styled.Textarea id="note" value={note} onChange={handleNoteChange} />
      </Styled.InputContainer>
      <StyledButton
        id="submit-cards-button"
        onClick={submit}
        disabled={date === ""}
        color="GREEN"
        height="35px"
        width="130px"
      >
        Submit Trade
      </StyledButton>
    </Styled.Container>
  );
}
