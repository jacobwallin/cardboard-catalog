import React, { useState } from "react";
import * as Styled from "./styled";
import StyledButton from "../../../../Admin/components/StyledButton";

export default function TradeForm() {
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

  return (
    <Styled.Container>
      <Styled.InputContainer>
        <Styled.Label htmlFor="date">Date of Trade</Styled.Label>
        <Styled.DateInput id="date" value={date} onChange={handleInputChange} />
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
        // onClick={handleSubmit}
        color="GREEN"
        height="35px"
        width="130px"
      >
        Submit Trade
      </StyledButton>
    </Styled.Container>
  );
}
