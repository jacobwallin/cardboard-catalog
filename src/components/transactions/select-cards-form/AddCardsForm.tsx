import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
import { fetchAllGradingCompanies } from "../../../store/library/grading_companies/thunks";
import { CardData } from "../../../store/collection/browse/types";
import { FilterCard } from "../../../store/collection/filter/types";
import StyledButton from "../../Admin/components/StyledButton";
import SelectCardForm from "./select_card_form/SelectCardForm";
import SelectedCards from "./selected-cards/SelectedCards";
import {
  createLoadingSelector,
  createStatusSelector,
} from "../../../store/loading/reducer";
import * as validate from "./validateCardData";
import * as Styled from "./styled";

export interface CardFormData {
  id: number;
  formData: {
    serialNumber: string;
    grade: string;
    gradingCompanyId: number;
  };
  validation: {
    serialNumberError: boolean;
    gradeError: boolean;
    gradingCompanyError: boolean;
  };
  qtyInCollection: number;
  card: FilterCard;
}

const postingCards = createLoadingSelector(["ADD_TRANSACTION"]);
const postingCardsStatusSelector = createStatusSelector("ADD_TRANSACTION");

interface Props {
  selectFrom: "COLLECTION" | "DATABASE" | "NONE";
  cardData: CardFormData[];
  setCardData(cardData: CardFormData[]): void;
  submit(cardData: CardData[]): void;
  canEditSelectedCards: boolean;
  title?: string;
}
export default function AddCardsForm(props: Props) {
  const {
    selectFrom,
    cardData,
    setCardData,
    submit,
    canEditSelectedCards,
    title,
  } = props;
  const dispatch = useDispatch();

  // error message will be displayed to user if form is not filled out correctly
  const [validationError, setValidationError] = useState(false);
  const [cardsSuccessfullyAdded, setCardsSuccessfullyAdded] = useState(0);

  // LIBRARY DATA
  const gradingCompanies = useSelector(
    (state: RootState) => state.library.gradingCompanies
  );

  // LOADING STATUS FOR POSTING CARDS
  const isPostingCards = useSelector((state: RootState) => postingCards(state));
  const postingCardsStatus = useSelector((state: RootState) =>
    postingCardsStatusSelector(state)
  );

  useEffect(() => {
    dispatch(fetchAllGradingCompanies());
  }, [dispatch]);

  // reset card data only if post to server is successfull
  // data will remain if there is a server error so user can re-submit
  useEffect(() => {
    if (postingCardsStatus === "SUCCESS" && cardsSuccessfullyAdded > 0) {
      setCardData([]);
    }
  }, [postingCardsStatus]);

  function addCards(cards: CardFormData[]) {
    setCardData([...cards, ...cardData]);
  }

  function handleSerializedChange(cardIndex: number, serialNumber: string) {
    setCardData(
      cardData.map((data, index): CardFormData => {
        if (index === cardIndex) {
          return {
            ...data,
            formData: { ...data.formData, serialNumber },
            validation: {
              ...data.validation,
              serialNumberError: validate.serialNumber(
                serialNumber,
                data.card.serializedTo || data.card.series.serialized
              ),
            },
          };
        }
        return data;
      })
    );
  }

  function handleGradeChange(cardIndex: number, grade: string) {
    setCardData(
      cardData.map((data, index): CardFormData => {
        if (index === cardIndex) {
          return {
            ...data,
            formData: { ...data.formData, grade: grade },
            validation: {
              ...data.validation,
              gradeError: validate.grade(grade),
            },
          };
        }
        return data;
      })
    );
  }

  function handleGradingCompanyIdChange(
    cardIndex: number,
    gradingCompanyId: number
  ) {
    setCardData(
      cardData.map((data, index): CardFormData => {
        if (index === cardIndex) {
          return {
            ...data,
            formData: {
              ...data.formData,
              gradingCompanyId,
            },
            validation: {
              ...data.validation,
              gradingCompanyError: validate.gradingCompany(
                gradingCompanyId,
                gradingCompanies
              ),
            },
          };
        }
        return data;
      })
    );
  }

  function clearGradeData(cardIndex: number) {
    setCardData(
      cardData.map((data, index): CardFormData => {
        if (index === cardIndex) {
          return {
            ...data,
            formData: {
              ...data.formData,
              gradingCompanyId: -1,
              grade: "",
            },
            validation: {
              ...data.validation,
              gradingCompanyError: false,
              gradeError: false,
            },
          };
        }
        return data;
      })
    );
  }

  function handleDeleteCard(cardIndex: number) {
    setCardData(cardData.filter((card, index) => index !== cardIndex));
  }

  const handleSubmit = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    // prevent refresh
    event.preventDefault();

    // reset validation error to false
    setValidationError(false);

    // validate data
    const { errorsFound, validatedCardData } = validate.allCardData(cardData);

    setValidationError(errorsFound);

    // only dispatch if there were no validation errors
    if (!errorsFound) {
      const postData: CardData[] = cardData.map((card) => {
        let newData: CardData = {
          cardId: card.id,
        };
        if (card.formData.serialNumber !== "") {
          newData.serialNumber = +card.formData.serialNumber;
        }
        if (card.formData.grade !== "") {
          newData.grade = +card.formData.grade;
        }
        if (card.formData.gradingCompanyId !== -1) {
          newData.gradingCompanyId = card.formData.gradingCompanyId;
        }
        return newData;
      });

      // submit API data
      submit(postData);

      // set how many cards were successfully added to display success message to user
      setCardsSuccessfullyAdded(cardData.length);
    } else {
      setCardData(validatedCardData);
    }
  };

  return (
    <Styled.FormContainer>
      {title && <Styled.SelectFormTitle>{title}</Styled.SelectFormTitle>}
      {selectFrom !== "NONE" && (
        <SelectCardForm
          addCards={addCards}
          selectFrom={selectFrom}
          cardData={cardData}
        />
      )}
      <Styled.SubmitContainer>
        <StyledButton
          id="submit-cards-button"
          onClick={handleSubmit}
          disabled={isPostingCards || cardData.length === 0}
          color="GREEN"
          height="35px"
          width="120px"
        >
          Submit
        </StyledButton>
      </Styled.SubmitContainer>

      {validationError && (
        <Styled.SubmitError>Fix Errors to Submit</Styled.SubmitError>
      )}
      {((cardsSuccessfullyAdded > 0 && cardData.length === 0) ||
        postingCardsStatus === "FAILURE") && (
        <Styled.PostResultMessage success={postingCardsStatus !== "FAILURE"}>
          {postingCardsStatus !== "FAILURE" ? "Success" : "Error Adding Cards"}
        </Styled.PostResultMessage>
      )}

      <SelectedCards
        cardData={cardData}
        handleDelete={handleDeleteCard}
        handleSerializedChange={handleSerializedChange}
        handleGradeChange={handleGradeChange}
        handleGradingCompanyIdChange={handleGradingCompanyIdChange}
        clearGradeData={clearGradeData}
        preventGradeChanges={!canEditSelectedCards}
      />
    </Styled.FormContainer>
  );
}
