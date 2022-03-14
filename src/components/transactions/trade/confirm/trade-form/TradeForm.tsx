import React, { useState } from "react";
import * as Styled from "./styled";
import * as FormComponents from "../../../shared/FormComponents";
import StyledButton from "../../../../Admin/components/StyledButton";

export interface FormData {
  date: string;
  note: string | null;
  individual: string | null;
  money: number | null;
}

interface Props {
  handleSubmit(data: FormData): void;
}

export default function TradeForm(props: Props) {
  const [date, setDate] = useState("");
  const [note, setNote] = useState("");
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
      case "money":
        setMoney(e.target.value);
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
      individual: individual === "" ? null : individual,
      money: money === "" ? null : +money,
    });
  }

  return (
    <FormComponents.Container>
      <FormComponents.InputContainer>
        <FormComponents.Label htmlFor="date">
          Date of Trade*
        </FormComponents.Label>
        <FormComponents.DateInput
          id="date"
          value={date}
          onChange={handleInputChange}
        />
      </FormComponents.InputContainer>
      <Styled.Flex>
        <FormComponents.InputContainer>
          <FormComponents.Label htmlFor="ind">Traded To</FormComponents.Label>
          <FormComponents.TextInput
            id="ind"
            value={individual}
            onChange={handleInputChange}
          />
        </FormComponents.InputContainer>
        <FormComponents.InputContainer>
          <FormComponents.Label htmlFor="money">$</FormComponents.Label>
          <FormComponents.NumberInput
            id="money"
            value={money}
            onChange={handleInputChange}
          />
        </FormComponents.InputContainer>
      </Styled.Flex>
      <FormComponents.InputContainer>
        <FormComponents.Label htmlFor="note">Note</FormComponents.Label>
        <FormComponents.Textarea
          id="note"
          value={note}
          onChange={handleNoteChange}
        />
      </FormComponents.InputContainer>
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
    </FormComponents.Container>
  );
}
