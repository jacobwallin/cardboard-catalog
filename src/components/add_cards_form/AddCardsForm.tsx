import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { SetSummary } from "../../store/library/sets/types";
import { Card } from "../../store/library/series/types";
import { fetchAllSetData } from "../../store/library/sets/thunks";
import { fetchAllGradingCompanies } from "../../store/library/grading_companies/thunks";
import { addCards } from "../../store/collection/thunks";
import AddCardsLine from "./AddCardsLine";
import StyledButton from "../Admin/components/StyledButton";
import SelectCardForm from "./SelectCardForm";
import {
  createLoadingSelector,
  createStatusSelector,
} from "../../store/loading/reducer";
import {
  FormContainer,
  CardDataContainer,
  SubmitContainer,
  TotalCardsLabel,
} from ".";
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

export default function AddCardsForm() {
  const dispatch = useDispatch();

  // error message will be displayed to user if form is not filled out correctly
  const [validationError, setValidationError] = useState(false);
  const [cardsSuccessfullyAdded, setCardsSuccessfullyAdded] = useState(0);

  // API DATA
  const [cardData, setCardData] = useState<CardFormData[]>([]);

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
          let foundError = false;
          const serialNumberLimit = series.serialized;
          // check if serialNumber converts to number, and is also in range
          // check if serialNumberLimit holds a value to prevent warning in VScode
          if (serialNumberLimit) {
            if (!+serialNumber) {
              foundError = true;
            } else if (+serialNumber < 0 || +serialNumber > serialNumberLimit) {
              foundError = true;
            }
            return { ...data, serialNumber, serialNumberError: foundError };
          }
          return data;
        }
        return data;
      })
    );
  }

  function handleGradeChange(cardIndex: number, grade: string) {
    console.log("in handle grade change: ", grade);
    setCardData(
      cardData.map((data, index) => {
        if (index === cardIndex) {
          console.log("current grade: ", data.grade);
          let foundError = false;
          // validate grade converts to number, is between 0-10, and is devisible by 0.5
          if (!+grade || +grade > 10 || +grade < 0 || +grade % 0.5 !== 0) {
            foundError = true;
          }
          // adjust grade
          return { ...data, grade: grade, gradeError: foundError };
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
          let foundError = false;
          // make sure id is valid and matches a pk from database
          if (
            gradingCompanies.findIndex(
              (company) => company.id === gradingCompanyId
            ) === -1
          ) {
            foundError = true;
          }

          return { ...data, gradingCompanyId, gradingCompanyError: foundError };
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

    // store if validation error is found since setState does not happen immediately
    let foundError = false;

    // VALIDATE DATA
    const cardDataWithErrors = cardData.map((data) => {
      let serialNumberError = data.serialNumberError;
      let gradeError = data.gradeError;
      let gradingCompanyError = data.gradingCompanyError;

      // make sure a serial number is entered by the user if the series is serialized
      if (series.serialized) {
        if (data.serialNumber === "") {
          foundError = true;
          serialNumberError = true;
        }
      }
      // either both or neither the grade and grading company must be entered
      if (data.grade !== "" || data.gradingCompanyId !== -1) {
        if (data.grade !== "") {
          if (data.gradingCompanyId === -1) {
            gradingCompanyError = true;
            foundError = true;
          }
        } else {
          gradeError = true;
          foundError = true;
        }
      }
      return { ...data, serialNumberError, gradeError, gradingCompanyError };
    });

    setValidationError(foundError);

    // only dispatch if there were no validation errors
    if (!foundError) {
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
      setCardData(cardDataWithErrors);
    }
  };

  return (
    <div>
      <FormContainer>
        <h2>Add Cards to Your Collection</h2>
        <SelectCardForm cardData={cardData} addCard={addCard} />
        <SubmitContainer>
          <TotalCardsLabel>
            {cardData.length > 0
              ? `Total Cards: ${cardData.length}`
              : "No Cards Selected"}
          </TotalCardsLabel>
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
        </SubmitContainer>

        {validationError && (
          <h6
            style={{
              alignSelf: "flex-end",
              width: "130px",
              margin: 0,
              color: "red",
              textAlign: "center",
            }}
          >
            Fix Errors to Submit
          </h6>
        )}
        {cardsSuccessfullyAdded > 0 && cardData.length === 0 && (
          <h2>{`${cardsSuccessfullyAdded} cards have been added to your collection.`}</h2>
        )}
        {postingCardsStatus === "FAILURE" && <h2>{`ERROR POSTING CARDS`}</h2>}
        <CardDataContainer>
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
        </CardDataContainer>
      </FormContainer>
    </div>
  );
}

// these functions aggregate the API data for each of the select drop down menus
function aggregateYears(allSets: SetSummary[]): number[] {
  let yearsArray: number[] = [];
  allSets.forEach((set) => {
    if (
      yearsArray.length === 0 ||
      yearsArray[yearsArray.length - 1] !== set.year
    ) {
      yearsArray.push(set.year);
    }
  });
  return yearsArray;
}
function aggregateSets(allSets: SetSummary[], year: number): SetSummary[] {
  return allSets.filter((set) => {
    return set.year === year;
  });
}
