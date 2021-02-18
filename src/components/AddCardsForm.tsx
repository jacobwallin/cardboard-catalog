import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { SetSummary } from "../store/library/sets/types";
import { Card } from "../store/library/series/types";
import { fetchAllSetData, fetchSet } from "../store/library/sets/thunks";
import { fetchSubset } from "../store/library/subsets/thunks";
import { fetchSeriesById } from "../store/library/series/thunks";
import { fetchAllGradingCompanies } from "../store/library/grading_companies/thunks";
import { clearCollection } from "../store/collection/actions";
import { addCards } from "../store/collection/thunks";
import AddCardsLine from "./AddCardsLine";
import styled from "styled-components";
import StyledButton from "./Admin/components/StyledButton";
import { createLoadingSelector } from "../store/loading/reducer";

import "../styling/addCardsForm.css";

const FormContainer = styled.div`
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  width: 100%;
  max-width: 800px;
  min-width: 250px;
  @media (max-width: 900px) {
    width: 90%;
  }
`;

const Select = styled.select`
  height: 40px;
  width: 100%;
  padding-left: 10px;
  padding-right: 20px;
`;

const Input = styled.input`
  height: 40px;
  width: 100px;
  margin: 0 10px 0 10px;
  padding-left: 10px;
  @media (max-width: 768px) {
    width: 65px;
  }
`;
const SubmitButton = styled.button`
  width: 100px;
`;
const SelectCardContainer = styled.form`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

interface APIData {
  cardId: number;
  serialNumber: string;
  grade: string;
  gradingCompanyId: number;
  card: Card;
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

  // API DATA
  const [cardData, setCardData] = useState<APIData[]>([]);

  // LIBRARY DATA
  const allSets = useSelector((state: RootState) => state.library.sets.allSets);
  const set = useSelector((state: RootState) => state.library.sets.singleSet);
  const subset = useSelector(
    (state: RootState) => state.library.subsets.subset
  );
  const series = useSelector((state: RootState) => state.library.series.series);

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
      };
      setCardData([...cardData, newData]);
    }
  }

  function handleSerializedChange(cardIndex: number, serialNumber: string) {
    setCardData(
      cardData.map((data, index) => {
        if (index === cardIndex) {
          return { ...data, serialNumber };
        }
        return data;
      })
    );
  }
  function handleGradeChange(cardIndex: number, grade: string) {
    setCardData(
      cardData.map((data, index) => {
        if (index === cardIndex) {
          return { ...data, grade };
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
          return { ...data, gradingCompanyId };
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
  };

  return (
    <div className="add-cards">
      <FormContainer>
        <Select
          value={selectedYear}
          name="select-year"
          id="select-year"
          onChange={handleSelectChange}
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
          disabled={selectedYear === -1}
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
          disabled={selectedSetId === -1}
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
          disabled={selectedSubsetId === -1}
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
            disabled={selectedCardId === -1}
          >
            Add
          </StyledButton>
        </SelectCardContainer>

        <SubmitButton
          id="submit-cards-button"
          onClick={handleSubmit}
          disabled={isPostingCards || cardData.length === 0}
        >
          Submit
        </SubmitButton>
        <div>
          {cardData.map((card, index) => {
            return (
              <AddCardsLine
                key={String(card.cardId) + String(index)}
                cardNumber={card.card.card_datum.number}
                cardName={card.card.card_datum.name}
                serialized={series.serialized !== null}
                index={index}
                serialNumber={card.serialNumber}
                grade={card.grade}
                gradingCompanyId={card.gradingCompanyId}
                handleDelete={handleDeleteCard}
                handleSerializedChange={handleSerializedChange}
                handleGradeChange={handleGradeChange}
                handleGradingCompanyIdChange={handleGradingCompanyIdChange}
              />
            );
          })}
        </div>
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
