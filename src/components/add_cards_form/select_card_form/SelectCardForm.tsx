import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
import { CardFormData } from "../AddCardsForm";
import StyledButton from "../../Admin/components/StyledButton";
import { SetSummary } from "../../../store/library/sets/types";
import { fetchSet } from "../../../store/library/sets/thunks";
import { fetchSubset } from "../../../store/library/subsets/thunks";
import { fetchSeriesById } from "../../../store/library/series/thunks";
import { fetchCardsInSingleSubset } from "../../../store/collection/browse/thunks";
import * as Styled from "./styled";
import sortCardNumbers from "../../../utils/sortCardNumbers";
import sortSeries from "../../Collection/subset_page/sortSeries";
import { createLoadingSelector } from "../../../store/loading/reducer";

const setLoadingSelector = createLoadingSelector(["GET_SINGLE_SET"]);
const subsetLoadingSelector = createLoadingSelector([
  "GET_SUBSET",
  "GET_CARDS_IN_SINGLE_SUBSET",
]);
const seriesLoadingSelector = createLoadingSelector(["GET_SERIES"]);

interface Props {
  addCard(card: CardFormData): void;
  cardData: CardFormData[];
}

export default function SelectCardForm(props: Props) {
  const dispatch = useDispatch();
  const { addCard, cardData } = props;

  // CONTROLLED FORM DATA
  const [selectedYear, setSelectedYear] = useState(-1);
  const [selectedSetId, setSelectedSetId] = useState(-1);
  const [selectedSubsetId, setSelectedSubsetId] = useState(-1);
  const [selectedSeriesId, setSelectedSeriesId] = useState(-1);
  const [selectedCardId, setSelectedCardId] = useState(-1);
  const [cardIdField, setCardIdField] = useState("");

  // LIBRARY STORE DATA
  const allSets = useSelector((state: RootState) => state.library.sets.allSets);
  const set = useSelector((state: RootState) => state.library.sets.set);
  const subset = useSelector((state: RootState) => state.library.subsets);
  const series = useSelector((state: RootState) => state.library.series.series);
  const userCardsInSubset = useSelector(
    (state: RootState) => state.collection.browse.cardsInSingleSubset.cards
  );

  // LOADING STATE
  const loadingSet = useSelector((state: RootState) =>
    setLoadingSelector(state)
  );
  const loadingSubset = useSelector((state: RootState) =>
    subsetLoadingSelector(state)
  );
  const loadingSeries = useSelector((state: RootState) =>
    seriesLoadingSelector(state)
  );

  // FETCH FORM DATA AS NEEDED WHEN USER MAKES SELECTIONS
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
      dispatch(fetchCardsInSingleSubset(selectedSubsetId));
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
      (card) =>
        card.card_datum.number.toUpperCase() ===
        event.target.value.toUpperCase()
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
      const newCardData: CardFormData = {
        cardId: selectedCardId,
        serialNumber: "",
        grade: "",
        gradingCompanyId: -1,
        card: card,
        serialNumberError: false,
        gradeError: false,
        gradingCompanyError: false,
        qtyInCollection: userCardsInSubset.filter(
          (userCard) => userCard.cardId === card.id
        ).length,
        serialized: series.serialized,
        shortPrint: series.shortPrint,
        auto: series.auto,
        relic: series.relic,
        manufacturedRelic: series.manufacturedRelic,
        refractor: series.refractor,
      };
      addCard(newCardData);
    }
  }

  return (
    <>
      <Styled.Select
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
      </Styled.Select>
      <Styled.Select
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
      </Styled.Select>
      <Styled.Select
        value={selectedSubsetId}
        name="select-subset"
        id="select-subset"
        disabled={selectedSetId === -1 || cardData.length > 0 || loadingSet}
        onChange={handleSelectChange}
      >
        <option value={-1}>Select Subset</option>
        {
          // only render drop down options once the correct subset has been fetched from API
          set.id === selectedSetId &&
            set.subsets
              .sort((subsetA, subsetB) => {
                if (subsetA.id === set.baseSubsetId) return -1;
                if (subsetB.id === set.baseSubsetId) return 1;

                if (subsetA.name < subsetB.name) return -1;
                if (subsetA.name > subsetB.name) return 1;
                return 0;
              })
              .map((subset) => {
                return (
                  <option key={subset.id} value={subset.id}>
                    {`${subset.name}`}
                    {subset.prefix !== "" && ` (${subset.prefix})`}
                  </option>
                );
              })
        }
      </Styled.Select>
      <Styled.Select
        value={selectedSeriesId}
        name="select-series"
        id="select-series"
        disabled={
          selectedSubsetId === -1 || cardData.length > 0 || loadingSubset
        }
        onChange={handleSelectChange}
      >
        <option value={-1}>Select Parallel</option>
        {
          // only render drop down options once the correct subset has been fetched from API
          subset.id === selectedSubsetId &&
            subset.series
              .sort((seriesA, seriesB) => {
                return sortSeries(seriesA, seriesB, subset.baseSeriesId || 0);
              })
              .map((series) => {
                return (
                  <option key={series.id} value={series.id}>
                    {series.name}
                    {series.serialized && ` /${series.serialized}`}
                  </option>
                );
              })
        }
      </Styled.Select>
      <Styled.SelectCardContainer onSubmit={handleAddCard}>
        <Styled.Select
          value={selectedCardId}
          name="select-card"
          id="select-card"
          disabled={selectedSeriesId === -1 || loadingSeries}
          onChange={handleSelectChange}
        >
          <option value={-1}>Select Card</option>
          {series.id === selectedSeriesId &&
            series.cards
              .sort((cardA, cardB) => {
                return sortCardNumbers(
                  cardA.card_datum.number,
                  cardB.card_datum.number
                );
              })
              .map((card) => {
                return (
                  <option key={card.id} value={card.id}>
                    {`${card.card_datum.number} - ${card.card_datum.name}`}
                  </option>
                );
              })}
        </Styled.Select>
        <Styled.Input
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
      </Styled.SelectCardContainer>
    </>
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
  return allSets
    .filter((set) => {
      return set.year === year;
    })
    .sort((setA, setB) => {
      if (setA.name < setB.name) return -1;
      if (setA.name > setB.name) return 1;
      return 0;
    });
}
