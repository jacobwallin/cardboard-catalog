import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { Card } from "../../store/library/series/types";
import { fetchAllSetData } from "../../store/library/sets/thunks";
import { fetchAllGradingCompanies } from "../../store/library/grading_companies/thunks";
import { addCards } from "../../store/collection/browse/thunks";
import AddCardsLine from "./add_cards_line/AddCardsLine";
import StyledButton from "../Admin/components/StyledButton";
import SelectCardForm from "./select_card_form/SelectCardForm";
import {
  createLoadingSelector,
  createStatusSelector,
} from "../../store/loading/reducer";
import * as validate from "./validateCardData";

import * as Styled from "./styled";
export interface CardFormData {
  cardId: number;
  serialNumber: string;
  grade: string;
  gradingCompanyId: number;
  card: Card;
  serialNumberError: boolean;
  gradeError: boolean;
  gradingCompanyError: boolean;
}

const postingCards = createLoadingSelector(["ADD_CARDS"]);
const postingCardsStatusSelector = createStatusSelector("ADD_CARDS");

interface Props {
  formData?: CardFormData[];
}
export default function AddCardsForm(props: Props) {
  const dispatch = useDispatch();

  // error message will be displayed to user if form is not filled out correctly
  const [validationError, setValidationError] = useState(false);
  const [cardsSuccessfullyAdded, setCardsSuccessfullyAdded] = useState(0);

  // API DATA
  const [cardData, setCardData] = useState<CardFormData[]>(
    props.formData ? props.formData : []
  );

  // LIBRARY DATA
  const series = useSelector((state: RootState) => state.library.series.series);
  const gradingCompanies = useSelector(
    (state: RootState) => state.library.gradingCompanies
  );

  // LOADING STATUS FOR POSTING CARDS
  const isPostingCards = useSelector((state: RootState) => postingCards(state));
  const postingCardsStatus = useSelector((state: RootState) =>
    postingCardsStatusSelector(state)
  );

  useEffect(() => {
    dispatch(fetchAllSetData());
    dispatch(fetchAllGradingCompanies());
  }, []);

  // reset card data only if post to server is successfull
  // data will remain if there is a server error so user can re-submit
  useEffect(() => {
    if (postingCardsStatus === "SUCCESS") {
      setCardData([]);
    }
  }, [postingCardsStatus]);

  function addCard(card: CardFormData) {
    setCardData([...cardData, card]);
  }

  function handleSerializedChange(cardIndex: number, serialNumber: string) {
    setCardData(
      cardData.map((data, index) => {
        if (index === cardIndex) {
          return {
            ...data,
            serialNumber,
            serialNumberError: validate.serialNumber(
              serialNumber,
              series.serialized
            ),
          };
        }
        return data;
      })
    );
  }

  function handleGradeChange(cardIndex: number, grade: string) {
    setCardData(
      cardData.map((data, index) => {
        if (index === cardIndex) {
          return { ...data, grade: grade, gradeError: validate.grade(grade) };
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
      cardData.map((data, index) => {
        if (index === cardIndex) {
          return {
            ...data,
            gradingCompanyId,
            gradingCompanyError: validate.gradingCompany(
              gradingCompanyId,
              gradingCompanies
            ),
          };
        }
        return data;
      })
    );
  }

  function clearGradeData(cardIndex: number) {
    setCardData(
      cardData.map((data, index) => {
        if (index === cardIndex) {
          return {
            ...data,
            gradingCompanyId: -1,
            gradingCompanyError: false,
            grade: "",
            gradeError: false,
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
    const { errorsFound, validatedCardData } = validate.allCardData(
      cardData,
      series.serialized
    );

    setValidationError(errorsFound);

    // only dispatch if there were no validation errors
    if (!errorsFound) {
      dispatch(
        addCards(
          cardData.map((card) => {
            const newData: any = { cardId: card.cardId };
            if (card.serialNumber !== "") {
              newData.serialNumber = +card.serialNumber;
            }
            if (card.grade !== "") {
              newData.grade = +card.grade;
            }
            if (card.gradingCompanyId !== -1) {
              newData.gradingCompanyId = card.gradingCompanyId;
            }
            return newData;
          })
        )
      );

      // set how many cards were successfully added to display success message to user
      setCardsSuccessfullyAdded(cardData.length);
    } else {
      setCardData(validatedCardData);
    }
  };

  return (
    <div>
      <Styled.FormContainer>
        <h2>Add Cards to Your Collection</h2>
        {!props.formData && (
          <SelectCardForm cardData={cardData} addCard={addCard} />
        )}
        <Styled.SubmitContainer>
          <Styled.TotalCardsLabel>
            {cardData.length > 0
              ? `Total Cards: ${cardData.length}`
              : "No Cards Selected"}
          </Styled.TotalCardsLabel>
          <StyledButton
            id="submit-cards-button"
            onClick={handleSubmit}
            disabled={isPostingCards || cardData.length === 0}
            color="GREEN"
            height="40px"
            width="130px"
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
            {postingCardsStatus !== "FAILURE"
              ? `${cardsSuccessfullyAdded} cards have been added to your collection`
              : "Error Adding Cards to Collection"}
          </Styled.PostResultMessage>
        )}

        <Styled.CardDataContainer>
          {cardData.map((card, index) => {
            return (
              <AddCardsLine
                key={String(card.cardId) + String(index)}
                serialized={series.serialized}
                index={index}
                card={card}
                clearGradeData={clearGradeData}
                handleDelete={handleDeleteCard}
                handleSerializedChange={handleSerializedChange}
                handleGradeChange={handleGradeChange}
                handleGradingCompanyIdChange={handleGradingCompanyIdChange}
              />
            );
          })}
        </Styled.CardDataContainer>
      </Styled.FormContainer>
    </div>
  );
}
