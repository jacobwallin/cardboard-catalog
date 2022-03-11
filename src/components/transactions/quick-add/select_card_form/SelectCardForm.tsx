import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../store";
import { CardFormData } from "../AddCardsForm";

import StyledButton from "../../../Admin/components/StyledButton";
import { fetchAllSetData } from "../../../../store/library/sets/thunks";
import { fetchAllGradingCompanies } from "../../../../store/library/grading_companies/thunks";
import { fetchSet } from "../../../../store/library/sets/thunks";
import { fetchCardsBySet } from "../../../../store/collection/browse/thunks";
import { fetchSubset } from "../../../../store/library/subsets/thunks";
import { fetchCardsBySubset } from "../../../../store/collection/browse/thunks";
import { fetchCardsInSingleSubset } from "../../../../store/collection/browse/thunks";
import {
  SeriesTableData,
  DeleteTableDataPoint,
  TableDataPoint,
} from "../../../Collection/subset_page/createTableData";
import * as aggregate from "./aggregate";
import { SetSummary } from "../../../../store/library/sets/types";
import * as Styled from "./styled";
import { createLoadingSelector } from "../../../../store/loading/reducer";

const setLoadingSelector = createLoadingSelector([
  "GET_SINGLE_SET",
  "GET_CARDS_BY_SUBSET",
]);
const subsetLoadingSelector = createLoadingSelector([
  "GET_SUBSET",
  "GET_CARDS_IN_SINGLE_SUBSET",
]);

interface Props {
  addCard(card: CardFormData): void;
  selectFrom: "COLLECTION" | "DATABASE";
  cardData: CardFormData[];
}

export default function SelectCardForm(props: Props) {
  const dispatch = useDispatch();
  const { addCard, selectFrom, cardData } = props;

  // LIBRARY STORE DATA
  const allSets = useSelector((state: RootState) => state.library.sets.allSets);
  const userAllSets = useSelector(
    (state: RootState) => state.collection.browse.cardsBySet
  );
  const set = useSelector((state: RootState) => state.library.sets.set);
  const userSet = useSelector(
    (state: RootState) => state.collection.browse.cardsBySubset
  );
  const subset = useSelector((state: RootState) => state.library.subsets);
  const userSubset = useSelector(
    (state: RootState) => state.collection.browse.cardsInSingleSubset
  );

  // SELECT FORM DATA
  const [yearOptions, setYearOptions] = useState<number[]>([]);
  const [setOptions, setSetOptions] = useState<SetSummary[]>([]);
  const [subsetOptions, setSubsetOptions] = useState<aggregate.SubsetData[]>(
    []
  );
  const [seriesOptions, setSeriesOptions] = useState<SeriesTableData[]>([]);

  const [databaseCardOptions, setDatabaseCardOptions] = useState<
    TableDataPoint[]
  >([]);
  const [collectionCardOptions, setCollectionCardOptions] = useState<
    DeleteTableDataPoint[]
  >([]);

  // CONTROLLED FORM DATA
  const [selectedYear, setSelectedYear] = useState(-1);
  const [selectedSetId, setSelectedSetId] = useState(-1);
  const [selectedSubsetId, setSelectedSubsetId] = useState(-1);
  const [selectedSeriesId, setSelectedSeriesId] = useState(-1);
  const [selectedCardId, setSelectedCardId] = useState(-1);
  const [cardIdField, setCardIdField] = useState("");
  const [prefix, setPrefix] = useState("");

  // LOADING STATE
  const loadingSet = useSelector((state: RootState) =>
    setLoadingSelector(state)
  );
  const loadingSubset = useSelector((state: RootState) =>
    subsetLoadingSelector(state)
  );

  // FETCH DATA
  useEffect(() => {
    // initial data load, either get all sets or only sets in user's collection
    dispatch(fetchAllGradingCompanies());
    if (selectFrom === "COLLECTION") {
      dispatch(fetchCardsBySet());
    } else {
      dispatch(fetchAllSetData());
    }
  }, []);

  useEffect(() => {
    // fetch set data, but only if a set is selected
    if (selectedSetId !== -1) {
      if (selectFrom === "COLLECTION") {
        dispatch(fetchCardsBySubset(selectedSetId));
      } else {
        dispatch(fetchSet(selectedSetId));
      }
    }
  }, [selectedSetId]);

  useEffect(() => {
    // fetch subset data, same data is needed regardless of selectFrom
    if (selectedSubsetId !== -1) {
      dispatch(fetchSubset(selectedSubsetId));
      dispatch(fetchCardsInSingleSubset(selectedSubsetId));
    }
  }, [selectedSubsetId]);

  // AGGREGATE DATA FOR FORM
  useEffect(() => {
    if (selectFrom === "COLLECTION") {
      setYearOptions(aggregate.collectionYears(userAllSets));
    } else {
      setYearOptions(aggregate.aggregateYears(allSets));
    }
  }, [allSets, userAllSets, selectFrom]);

  useEffect(() => {
    if (selectedYear !== -1) {
      if (selectFrom === "COLLECTION") {
        setSetOptions(
          aggregate.collectionSetsInYear(userAllSets, selectedYear)
        );
      } else {
        setSetOptions(aggregate.aggregateSets(allSets, selectedYear));
      }
    }
  }, [allSets, userAllSets, selectedYear, selectFrom]);

  useEffect(() => {
    if (
      selectedSetId !== -1 &&
      (set.id === selectedSetId || userSet.setId === selectedSetId)
    ) {
      if (selectFrom === "COLLECTION") {
        setSubsetOptions(aggregate.collectionSubsets(userSet.subsets));
      } else {
        setSubsetOptions(aggregate.aggregateSubsets(set));
      }
    }
  }, [set, userSet, selectedSetId, selectFrom]);

  useEffect(() => {
    if (
      selectedSubsetId !== -1 &&
      subset.id === selectedSubsetId &&
      userSubset.subsetId === selectedSubsetId
    ) {
      setSeriesOptions(aggregate.aggregateSubset(subset, userSubset));
    }
  }, [subset, userSubset, selectedSubsetId]);

  useEffect(() => {
    if (selectedSeriesId !== -1) {
      if (selectFrom === "COLLECTION") {
        const userCards = seriesOptions.find(
          (series) => series.series.id === selectedSeriesId
        )!.userCards;
        setCollectionCardOptions(userCards);
      } else {
        const cards = seriesOptions.find(
          (series) => series.series.id === selectedSeriesId
        )!.cards;
        setDatabaseCardOptions(cards);
      }
    }
  }, [seriesOptions, selectedSeriesId, selectFrom]);

  useEffect(() => {
    // automatically set card prefix in card number field
    if (subset.prefix !== "") {
      if (subset.card_data.length > 0) {
        const cardNumber = subset.card_data[0].number;
        let newPrefix = subset.prefix;
        if (cardNumber.charAt(subset.prefix.length) === "-") {
          newPrefix += "-";
        }
        setPrefix(newPrefix);
        setCardIdField(newPrefix);
      }
    } else {
      setPrefix("");
      setCardIdField("");
    }
  }, [subset]);

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
        if (selectFrom === "COLLECTION") {
          const userCard = collectionCardOptions.find(
            (userCard) => userCard.id === +event.target.value
          )!;
          setCardIdField(userCard.card.cardData.number);
        } else {
          const card = databaseCardOptions.find(
            (card) => card.id === +event.target.value
          )!;
          setCardIdField(card.cardData.number);
        }
        break;
    }
  }

  function handleInputChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    // set input value, subset prefix cannot be deleted
    if (event.target.value.indexOf(prefix) !== -1) {
      setCardIdField(event.target.value.toUpperCase());
    } else {
      setCardIdField(prefix);
    }
    // set the selectedCardId to change the selected card when input changes
    let card = undefined;
    if (selectFrom === "COLLECTION") {
      card = collectionCardOptions.find((userCard) => {
        return (
          userCard.card.cardData.number === event.target.value &&
          cardData.findIndex((card) => card.cardId === userCard.id) === -1
        );
      });
    } else {
      card = databaseCardOptions.find(
        (card) => card.cardData.number === event.target.value
      );
    }
    if (card) {
      setSelectedCardId(card.id);
    } else {
      setSelectedCardId(-1);
    }
  }

  function handleAddCard(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (selectFrom === "COLLECTION") {
      const userCard = collectionCardOptions.find(
        (userCard) => userCard.id === selectedCardId
      )!;
      if (userCard) {
        const newCardData: CardFormData = {
          cardId: selectedCardId,
          serialNumber:
            userCard.serialNumber === null ? "" : String(userCard.serialNumber),
          grade: userCard.grade === null ? "" : String(userCard.grade),
          gradingCompanyId: userCard.gradingCompanyId || -1,
          card: {
            ...userCard.card,
            card_datum: userCard.card.cardData,
            createdBy: 0,
            updatedBy: 0,
            createdByUser: {
              username: "",
            },
            updatedByUser: {
              username: "",
            },
          },
          serialNumberError: false,
          gradeError: false,
          gradingCompanyError: false,
          qtyInCollection: userSubset.cards.filter(
            (userCardy) => userCardy.cardId === userCard.card.id
          ).length,
          serialized: userCard.card.series.serialized,
          shortPrint: userCard.card.series.shortPrint,
          auto: userCard.card.series.auto,
          relic: userCard.card.series.relic,
          manufacturedRelic: userCard.card.series.manufacturedRelic,
          refractor: userCard.card.series.refractor,
        };
        addCard(newCardData);
        // reset selected card, same card cannot be added twice from collection
        setSelectedCardId(-1);
        setCardIdField(prefix);
      }
    } else {
      const card = databaseCardOptions.find(
        (card) => card.id === selectedCardId
      )!;
      if (card) {
        const newCardData: CardFormData = {
          cardId: selectedCardId,
          serialNumber: "",
          grade: "",
          gradingCompanyId: -1,
          card: {
            ...card,
            card_datum: card.cardData,
            createdBy: 0,
            updatedBy: 0,
            createdByUser: {
              username: "",
            },
            updatedByUser: {
              username: "",
            },
          },
          serialNumberError: false,
          gradeError: false,
          gradingCompanyError: false,
          qtyInCollection: userSubset.cards.filter(
            (userCard) => userCard.cardId === card.id
          ).length,
          serialized: card.series.serialized,
          shortPrint: card.series.shortPrint,
          auto: card.series.auto,
          relic: card.series.relic,
          manufacturedRelic: card.series.manufacturedRelic,
          refractor: card.series.refractor,
        };
        addCard(newCardData);
      }
    }
  }

  return (
    <>
      <Styled.Select
        value={selectedYear}
        name="select-year"
        id="select-year"
        onChange={handleSelectChange}
      >
        <option value={-1}>Select Year</option>
        {yearOptions.map((year) => {
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
        disabled={selectedYear === -1}
        onChange={handleSelectChange}
      >
        <option value={-1}>Select Set</option>
        {setOptions.map((set) => {
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
        disabled={selectedSetId === -1 || loadingSet}
        onChange={handleSelectChange}
      >
        <option value={-1}>Select Subset</option>
        {
          // only render drop down options once the correct subset has been fetched from API
          (set.id === selectedSetId || userSet.setId === selectedSetId) &&
            subsetOptions.map((subset) => {
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
        disabled={selectedSubsetId === -1 || loadingSubset}
        onChange={handleSelectChange}
      >
        <option value={-1}>Select Parallel</option>
        {
          // only render drop down options once the correct subset has been fetched from API
          subset.id === selectedSubsetId &&
            seriesOptions.map((series) => {
              return (
                <option key={series.series.id} value={series.series.id}>
                  {series.series.name}
                  {series.series.serialized && ` /${series.series.serialized}`}
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
          disabled={selectedSeriesId === -1}
          onChange={handleSelectChange}
        >
          <option value={-1}>Select Card</option>
          {selectFrom === "COLLECTION"
            ? collectionCardOptions.map((userCard) => {
                return (
                  <option
                    key={userCard.id}
                    value={userCard.id}
                    disabled={
                      cardData.findIndex(
                        (card) => card.cardId === userCard.id
                      ) !== -1
                    }
                  >
                    {`${userCard.card.cardData.number} - ${userCard.card.cardData.name}`}
                    {userCard.card.cardData.note !== "" &&
                      ` (${userCard.card.cardData.note})`}
                  </option>
                );
              })
            : databaseCardOptions.map((card) => {
                return (
                  <option key={card.id} value={card.id}>
                    {`${card.cardData.number} - ${card.cardData.name}`}
                    {card.cardData.note !== "" && ` (${card.cardData.note})`}
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

// TODO: disabled select option if it has already been added (pass down cardData from AddCardsForm)
