import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { SetSummary } from "../../store/library/sets/types";
import { Card } from "../../store/library/series/types";
import { fetchAllSetData, fetchSet } from "../../store/library/sets/thunks";
import { fetchSubset } from "../../store/library/subsets/thunks";
import { fetchSeriesById } from "../../store/library/series/thunks";
import { fetchAllGradingCompanies } from "../../store/library/grading_companies/thunks";
import { clearCollection } from "../../store/collection/actions";
import { addCards } from "../../store/collection/thunks";
import AddCardsLine from "./AddCardsLine";
import StyledButton from "../Admin/components/StyledButton";
import { createLoadingSelector } from "../../store/loading/reducer";
import {
  FormContainer,
  Select,
  Input,
  SelectCardContainer,
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

export default function AddCardsForm() {
  const dispatch = useDispatch();

  // CONTROLLED FORM DATA
  const [selectedYear, setSelectedYear] = useState(-1);
  const [selectedSetId, setSelectedSetId] = useState(-1);
  const [selectedSubsetId, setSelectedSubsetId] = useState(-1);
  const [selectedSeriesId, setSelectedSeriesId] = useState(-1);
  const [selectedCardId, setSelectedCardId] = useState(-1);
  const [cardIdField, setCardIdField] = useState("");

  // error message will be displayed to user if form is not filled out correctly
  const [validationError, setValidationError] = useState(false);

  // API DATA
  const [cardData, setCardData] = useState<CardFormData[]>([]);

  // LIBRARY DATA
  const allSets = useSelector((state: RootState) => state.library.sets.allSets);
  const set = useSelector((state: RootState) => state.library.sets.singleSet);
  const subset = useSelector(
    (state: RootState) => state.library.subsets.subset
  );
  const series = useSelector((state: RootState) => state.library.series.series);
  const gradingCompanies = useSelector(
    (state: RootState) => state.library.gradingCompanies
  );

  // LOADING STATUS FOR POSTING CARDS
  const isPostingCards = useSelector((state: RootState) => postingCards(state));

  useEffect(() => {
    dispatch(fetchAllSetData());
    dispatch(fetchAllGradingCompanies());
  }, []);

  useEffect(() => {
    // fetch subset data, but only if a subset is selected
    if (selectedSetId !== -1) {
      dispatch(fetchSet(selectedSetId));
    }
  }, [selectedSetId]);

  useEffect(() => {
    // fetch subset data, but only if a subset is selected
    if (selectedSubsetId !== -1) {
      dispatch(fetchSubset(selectedSubsetId));
    }
  }, [selectedSubsetId]);

  useEffect(() => {
    // fetch subset data, but only if a subset is selected
    if (selectedSeriesId !== -1) {
      dispatch(fetchSeriesById(selectedSeriesId));
    }
  }, [selectedSeriesId]);

  function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
    switch (event.target.name) {
      case "select-year":
        setSelectedCardId(-1);
        setSelectedSeriesId(-1);
        setSelectedSubsetId(-1);
        setSelectedSetId(-1);
        setSelectedYear(+event.target.value);
        break;
      case "select-set":
        setSelectedCardId(-1);
        setSelectedSeriesId(-1);
        setSelectedSubsetId(-1);
        setSelectedSetId(+event.target.value);
        break;
      case "select-subset":
        setSelectedCardId(-1);
        setSelectedSeriesId(-1);
        setSelectedSubsetId(+event.target.value);
        break;
      case "select-series":
        setSelectedCardId(-1);
        setSelectedSeriesId(+event.target.value);
        break;
      case "select-card":
        setSelectedCardId(+event.target.value);
        setCardIdField(
          series.cards.find((card) => card.id === +event.target.value)
            ?.card_datum.number!
        );
        break;
    }
  }

  function handleInputChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setCardIdField(event.target.value);
    const card = series.cards.find(
      (card) => card.card_datum.number === event.target.value
    );
    if (card) {
      setSelectedCardId(card.id);
    } else {
      setSelectedCardId(-1);
    }
  }

  function handleAddCard(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const card = series.cards.find((card) => card.id === selectedCardId)!;
    if (card) {
      const newData = {
        cardId: selectedCardId,
        serialNumber: "",
        grade: "",
        gradingCompanyId: -1,
        card: card,
        serialNumberError: false,
        gradeError: false,
        gradingCompanyError: false,
      };
      setCardData([...cardData, newData]);
    }
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
    cardData.forEach((data) => {
      // make sure a serial number is entered by the user if the series is serialized
      if (series.serialized) {
        if (data.serialNumber === "") {
          data.serialNumberError = true;
          foundError = true;
        } else if (data.serialNumberError) {
          foundError = true;
        }
      }
      // either both or neither the grade and grading company must be entered
      if (data.grade !== "" || data.gradingCompanyId !== -1) {
        if (data.grade !== "") {
          if (data.gradingCompanyId === -1) {
            data.gradingCompanyError = true;
            foundError = true;
          }
        } else {
          data.gradeError = true;
          foundError = true;
        }
      }
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

      setCardData([]);
    }
  };

  return (
    <div>
      <FormContainer>
        <h2>Add Cards to Your Collection</h2>
        <Select
          value={selectedYear}
          name="select-year"
          id="select-year"
          onChange={handleSelectChange}
          disabled={cardData.length > 0}
        >
          <option value={-1}>Select Year</option>
          {aggregateYears(allSets).map((year) => {
            return (
              <option key={year} value={year}>
                {year}
              </option>
            );
          })}
        </Select>
        <Select
          value={selectedSetId}
          name="select-set"
          id="select-set"
          disabled={selectedYear === -1 || cardData.length > 0}
          onChange={handleSelectChange}
        >
          <option value={-1}>Select Set</option>
          {aggregateSets(allSets, selectedYear).map((set) => {
            return (
              <option key={set.id} value={set.id}>
                {set.name}
              </option>
            );
          })}
        </Select>
        <Select
          value={selectedSubsetId}
          name="select-subset"
          id="select-subset"
          disabled={selectedSetId === -1 || cardData.length > 0}
          onChange={handleSelectChange}
        >
          <option value={-1}>Select Subset</option>
          {
            // only render drop down options once the correct subset has been fetched from API
            set.id === selectedSetId &&
              set.subsets.map((subset) => {
                return (
                  <option key={subset.id} value={subset.id}>
                    {subset.name}
                  </option>
                );
              })
          }
        </Select>
        <Select
          value={selectedSeriesId}
          name="select-series"
          id="select-series"
          disabled={selectedSubsetId === -1 || cardData.length > 0}
          onChange={handleSelectChange}
        >
          <option value={-1}>Select Series</option>
          {
            // only render drop down options once the correct subset has been fetched from API
            subset.id === selectedSubsetId &&
              subset.series.map((series) => {
                return (
                  <option key={series.id} value={series.id}>
                    {series.name}
                  </option>
                );
              })
          }
        </Select>
        <SelectCardContainer onSubmit={handleAddCard}>
          <Select
            value={selectedCardId}
            name="select-card"
            id="select-card"
            disabled={selectedSeriesId === -1}
            onChange={handleSelectChange}
          >
            <option value={-1}>Select Card</option>
            {series.id === selectedSeriesId &&
              series.cards.map((card) => {
                return (
                  <option key={card.id} value={card.id}>
                    {`${card.card_datum.number} - ${card.card_datum.name}`}
                  </option>
                );
              })}
          </Select>

          <Input
            type="text"
            value={cardIdField}
            placeholder="Card #"
            onChange={handleInputChange}
            disabled={selectedSeriesId === -1}
          />

          <StyledButton
            type="submit"
            color="BLUE"
            height="40px"
            width="65px"
            disabled={selectedCardId === -1}
          >
            Add
          </StyledButton>
        </SelectCardContainer>
        <SubmitContainer>
          <TotalCardsLabel>
            {cardData.length > 0
              ? `Total Cards to Be Added: ${cardData.length}`
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
