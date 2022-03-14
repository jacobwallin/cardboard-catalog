import React, { useState } from "react";
import * as FormComponents from "../../shared/FormComponents";
import StyledButton from "../../../Admin/components/StyledButton";

export interface FormData {
  date: string;
  note: string | null;
  platform: string | null;
  individual: string | null;
  money: number | null;
}

interface Props {
  handleSubmit(data: FormData): void;
  transactionType: "SALE" | "PURCHASE";
}

export default function SalePurchaseForm(props: Props) {
  const { transactionType } = props;

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
      money:
        money === "" ? null : transactionType === "SALE" ? +money : -+money,
    });
  }

  return (
    <FormComponents.Container>
      <FormComponents.InputContainer>
        <FormComponents.Label htmlFor="date">
          {transactionType === "SALE" ? "Date of Sale*" : "Date of Purchase*"}
        </FormComponents.Label>
        <FormComponents.DateInput
          id="date"
          value={date}
          onChange={handleInputChange}
        />
      </FormComponents.InputContainer>
      <FormComponents.InputContainer>
        <FormComponents.Label htmlFor="platform">
          {transactionType === "SALE" ? "Sold Through" : "Purchased Through"}
        </FormComponents.Label>
        <FormComponents.TextInput
          id="platform"
          value={platform}
          onChange={handleInputChange}
        />
      </FormComponents.InputContainer>
      <FormComponents.InputContainer>
        <FormComponents.Label htmlFor="ind">
          {transactionType === "SALE" ? "Sold To" : "Purchased From"}
        </FormComponents.Label>
        <FormComponents.TextInput
          id="ind"
          value={individual}
          onChange={handleInputChange}
        />
      </FormComponents.InputContainer>

      <FormComponents.InputContainer>
        <FormComponents.Label htmlFor="money">
          {transactionType === "SALE" ? "$ Received" : "$ Spent"}
        </FormComponents.Label>
        <FormComponents.NumberInput
          min="0"
          id="money"
          value={money}
          onChange={handleInputChange}
        />
      </FormComponents.InputContainer>

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
        {transactionType === "SALE" ? "Submit Sale" : "Submit Purchase"}
      </StyledButton>
    </FormComponents.Container>
  );
}
