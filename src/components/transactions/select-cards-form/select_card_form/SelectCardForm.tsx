import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../store";
import { CardFormData } from "../AddCardsForm";
import StyledButton from "../../../Admin/components/StyledButton";
import {
  fetchAllSetData,
  fetchSetYears,
} from "../../../../store/library/sets/thunks";
import { fetchSet } from "../../../../store/library/sets/thunks";
import { fetchCardsBySet } from "../../../../store/collection/browse/thunks";
import { fetchSubset } from "../../../../store/library/subsets/thunks";
import { fetchCardsBySubset } from "../../../../store/collection/browse/thunks";
import { fetchCardsInSingleSubset } from "../../../../store/collection/browse/thunks";
import { fetchLeagues } from "../../../../store/library/leagues/thunks";
import { League } from "../../../../store/library/leagues/types";
import {
  SeriesTableData,
  DeleteTableDataPoint,
  TableDataPoint,
} from "../../../Collection/subset-page/createTableData";
import * as aggregate from "./aggregate";
import { SetSummary } from "../../../../store/library/sets/types";
import * as Styled from "./styled";
import { createLoadingSelector } from "../../../../store/loading/reducer";
import ChecklistSelect from "./checklist-select/ChecklistSelect";
import ChecklistCheckbox from "./ChecklistCheckbox";
import StyledSelect from "./select/StyledSelect";
import {
  createRemovedCardFormData,
  createAddedCardFormData,
} from "./createFormData";
import { aggregateSubsets } from "./aggregate";
import { AggregatedSubsetData } from "../../../Collection/set-page/aggregateSubsetData";
import {
  aggregateCollectionBySport,
  aggregateCollectionByYear,
  CollectionSports,
} from "../../../Collection/select-set/aggregateSets";

const setLoadingSelector = createLoadingSelector([
  "GET_SINGLE_SET",
  "GET_CARDS_BY_SUBSET",
]);
const subsetLoadingSelector = createLoadingSelector([
  "GET_SUBSET",
  "GET_CARDS_IN_SINGLE_SUBSET",
]);

interface Props {
  addCards(cards: CardFormData[]): void;
  selectFrom: "COLLECTION" | "DATABASE";
  cardData: CardFormData[];
}

export default function SelectCardForm(props: Props) {
  const dispatch = useDispatch();
  const { addCards, selectFrom, cardData } = props;

  // LIBRARY STORE DATA
  const catalogueSets = useSelector(
    (state: RootState) => state.library.sets.allSets
  );
  const catalogueYears = useSelector(
    (state: RootState) => state.library.sets.setYears
  );
  const collectionAllSets = useSelector(
    (state: RootState) => state.collection.browse.cardsBySet
  );
  const set = useSelector((state: RootState) => state.library.sets.set);
  const collectionSet = useSelector(
    (state: RootState) => state.collection.browse.cardsBySubset
  );
  const subset = useSelector((state: RootState) => state.library.subsets);
  const collectionSubset = useSelector(
    (state: RootState) => state.collection.browse.cardsInSingleSubset
  );
  const sports = useSelector(
    (state: RootState) => state.library.leagues.allLeagues
  );

  // SELECT FORM OPTIONS
  const [sportOptions, setSportOptions] = useState<League[]>([]);
  const [yearOptions, setYearOptions] = useState<number[]>([]);
  const [setOptions, setSetOptions] = useState<SetSummary[]>([]);
  const [subsetOptions, setSubsetOptions] = useState<AggregatedSubsetData>({
    base: [],
    inserts: [],
    shortPrints: [],
    autoRelic: [],
  });
  const [seriesOptions, setSeriesOptions] = useState<SeriesTableData[]>([]);

  const [databaseCardOptions, setDatabaseCardOptions] = useState<
    TableDataPoint[]
  >([]);
  const [collectionCardOptions, setCollectionCardOptions] = useState<
    DeleteTableDataPoint[]
  >([]);

  // FORM DATA
  const [selectedSportId, setSelectedSportId] = useState(-1);
  const [selectedYear, setSelectedYear] = useState(-1);
  const [selectedSetId, setSelectedSetId] = useState(-1);
  const [selectedSubsetId, setSelectedSubsetId] = useState(-1);
  const [selectedSeriesId, setSelectedSeriesId] = useState(-1);
  const [selectedCardId, setSelectedCardId] = useState(-1);
  const [cardIdField, setCardIdField] = useState("");
  const [prefix, setPrefix] = useState("");

  const [selectFromChecklist, setSelectFromChecklist] = useState(false);

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
    if (selectFrom === "COLLECTION") {
      dispatch(fetchCardsBySet());
    }
    dispatch(fetchLeagues());
  }, []);

  useEffect(() => {
    if (selectFrom === "DATABASE") {
      setSportOptions(
        sports.sort((a, b) => {
          if (a.name < b.name) return -1;
          return 1;
        })
      );
    }
  }, [sports, selectFrom]);

  useEffect(() => {
    if (selectedSportId !== -1) {
      if (selectFrom === "COLLECTION") {
        // if selecting from collection, aggregate by year
        setYearOptions(
          aggregateCollectionByYear(collectionAllSets, selectedSportId).map(
            (y) => y.year
          )
        );
      } else {
        // fetch years that exist in catalogue for given sport
        dispatch(fetchSetYears(selectedSportId));
      }
    }
  }, [selectedSportId, collectionAllSets, selectFrom, sports, dispatch]);

  useEffect(() => {
    const idk = catalogueYears.map((idk) => idk.year).sort((a, b) => b - a);
    setYearOptions(idk);
  }, [catalogueYears]);

  useEffect(() => {
    if (selectedYear !== -1) {
      if (selectFrom === "COLLECTION") {
        // if selecting from collection, filter sets by year
      } else {
        // fetch set that exist in catalogue for given year and sport
        dispatch(
          fetchAllSetData(`sportId=${selectedSportId}&year=${selectedYear}`)
        );
      }
    }
  }, [selectedYear, collectionAllSets, selectFrom, selectedSportId, dispatch]);

  useEffect(() => {
    // fetch set data, but only if a set is selected
    if (selectedSetId !== -1) {
      if (selectFrom === "COLLECTION") {
        dispatch(fetchCardsBySubset(selectedSetId));
      }
      dispatch(fetchSet(selectedSetId));
    }
  }, [selectedSetId, selectFrom, dispatch]);

  useEffect(() => {
    // fetch subset data, same data is needed regardless of selectFrom
    if (selectedSubsetId !== -1) {
      dispatch(fetchSubset(selectedSubsetId));
      dispatch(fetchCardsInSingleSubset(selectedSubsetId));
    }
  }, [selectedSubsetId, dispatch]);

  // AGGREGATE DATA FOR FORM
  useEffect(() => {
    if (selectFrom === "COLLECTION") {
      // if selecting from collection, aggregate by year
      setSportOptions(
        aggregateCollectionBySport(collectionAllSets, sports).map((s) => {
          return {
            id: s.sportId,
            name: s.sport,
          };
        })
      );
    }
  }, [collectionAllSets, selectFrom, sports]);

  useEffect(() => {
    if (selectedYear !== -1) {
      if (selectFrom === "COLLECTION") {
        setSetOptions(
          aggregate.collectionSetsInYear(
            collectionAllSets,
            selectedYear,
            selectedSportId
          )
        );
      } else {
        setSetOptions(
          aggregate.aggregateSets(catalogueSets.rows, selectedYear)
        );
      }
    }
  }, [
    catalogueSets,
    collectionAllSets,
    selectedYear,
    selectedSportId,
    selectFrom,
  ]);

  useEffect(() => {
    if (
      selectedSetId !== -1 &&
      (set.id === selectedSetId || collectionSet.setId === selectedSetId)
    ) {
      if (selectFrom === "COLLECTION") {
        setSubsetOptions(
          aggregateSubsets(set.subsets, collectionSet.subsets, true)
        );
      } else {
        setSubsetOptions(
          aggregateSubsets(set.subsets, collectionSet.subsets, false)
        );
      }
    }
  }, [set, collectionSet, selectedSetId, selectFrom]);

  useEffect(() => {
    if (
      selectedSubsetId !== -1 &&
      subset.id === selectedSubsetId &&
      collectionSubset.subsetId === selectedSubsetId
    ) {
      const newSeriesOptions = aggregate.aggregateSubset(
        subset,
        collectionSubset,
        selectFrom === "COLLECTION"
      );
      setSeriesOptions(newSeriesOptions);

      // automatically select the base series when the subset changes
      // first check if the base series exists within the series options
      setSelectedSeriesId(
        subset.baseSeriesId
          ? newSeriesOptions.some((s) => s.seriesId === subset.baseSeriesId)
            ? subset.baseSeriesId
            : -1
          : -1
      );
    }
  }, [subset, collectionSubset, selectedSubsetId, selectFrom]);

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
      case "select-sport":
        setSelectedCardId(-1);
        setSelectedSeriesId(-1);
        setSelectedSubsetId(-1);
        setSelectedSetId(-1);
        setSelectedYear(-1);
        setSelectedSportId(+event.target.value);
        break;
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
    const inputValue = event.target.value.toUpperCase();

    // set input value, subset prefix cannot be deleted
    if (event.target.value.indexOf(prefix) !== -1) {
      setCardIdField(inputValue);
    } else {
      setCardIdField(prefix);
    }
    // set the selectedCardId to change the selected card when input changes
    let card = undefined;
    if (selectFrom === "COLLECTION") {
      card = collectionCardOptions.find((userCard) => {
        return (
          userCard.card.cardData.number === inputValue &&
          cardData.findIndex((card) => card.id === userCard.id) === -1
        );
      });
    } else {
      card = databaseCardOptions.find(
        (card) => card.cardData.number === inputValue
      );
    }
    if (card) {
      setSelectedCardId(card.id);
    } else {
      setSelectedCardId(-1);
    }
  }

  // pass selected cards to parent component when user clicks add button
  function handleAddCard(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (selectFrom === "COLLECTION") {
      const userCard = collectionCardOptions.find(
        (userCard) => userCard.id === selectedCardId
      );
      if (userCard) {
        // convert into data needed for the AddCardsForm component
        const newCardData: CardFormData = createRemovedCardFormData(
          userCard,
          collectionSubset.cards,
          subset,
          set
        );
        addCards([newCardData]);
        // reset selected card, same card cannot be added twice from collection
        setSelectedCardId(-1);
        setCardIdField(prefix);
      }
    } else {
      const card = databaseCardOptions.find(
        (card) => card.id === selectedCardId
      );
      if (card) {
        const newCardData = createAddedCardFormData(
          card,
          collectionSubset.cards,
          subset,
          set
        );
        addCards([newCardData]);

        // reset form fields so new card can be typed in or selected
        setCardIdField(prefix);
        setSelectedCardId(-1);
      }
    }
  }

  return (
    <Styled.Container>
      <Styled.Flex>
        <Styled.SelectContainer>
          <Styled.Label htmlFor="select-sport">Sport</Styled.Label>
          <StyledSelect
            value={selectedSportId}
            name="select-sport"
            id="select-sport"
            onChange={handleSelectChange}
          >
            <option value={-1}>Select Sport</option>
            {sportOptions.map((sport) => {
              return (
                <option key={sport.id} value={sport.id}>
                  {sport.name}
                </option>
              );
            })}
          </StyledSelect>
        </Styled.SelectContainer>
        <Styled.SelectContainer>
          <Styled.Label htmlFor="select-year">Year</Styled.Label>
          <StyledSelect
            value={selectedYear}
            name="select-year"
            id="select-year"
            onChange={handleSelectChange}
            disabled={selectedSportId === -1}
          >
            <option value={-1}>Select Year</option>
            {yearOptions.map((year) => {
              return (
                <option key={year} value={year}>
                  {year}
                </option>
              );
            })}
          </StyledSelect>
        </Styled.SelectContainer>
      </Styled.Flex>
      <Styled.SelectContainer>
        <Styled.Label htmlFor="select-set">Set</Styled.Label>
        <StyledSelect
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
        </StyledSelect>
      </Styled.SelectContainer>
      <Styled.Flex>
        <Styled.SelectContainer>
          <Styled.Label htmlFor="select-subset">Subset</Styled.Label>
          <StyledSelect
            value={selectedSubsetId}
            name="select-subset"
            id="select-subset"
            disabled={selectedSetId === -1 || loadingSet}
            onChange={handleSelectChange}
          >
            <option value={-1}>Select Subset</option>
            {
              // only render drop down options once the correct subset has been fetched from API
              (set.id === selectedSetId ||
                collectionSet.setId === selectedSetId) && (
                <>
                  {subsetOptions.base && (
                    <optgroup
                      label={
                        subsetOptions.base.length > 1 ? "Base Sets" : "Base Set"
                      }
                    >
                      {subsetOptions.base.map((subset) => {
                        return (
                          <option key={subset.id} value={subset.id}>
                            {`${subset.name}`}
                            {subset.prefix !== "" && ` (${subset.prefix})`}
                          </option>
                        );
                      })}
                    </optgroup>
                  )}
                  {subsetOptions.shortPrints.length > 0 && (
                    <optgroup label="Short Prints">
                      {subsetOptions.shortPrints.map((subset) => {
                        return (
                          <option key={subset.id} value={subset.id}>
                            {`${subset.name}`}
                            {subset.prefix !== "" && ` (${subset.prefix})`}
                          </option>
                        );
                      })}
                    </optgroup>
                  )}
                  {subsetOptions.inserts.length > 0 && (
                    <optgroup label="Inserts">
                      {subsetOptions.inserts.map((subset) => {
                        return (
                          <option key={subset.id} value={subset.id}>
                            {`${subset.name}`}
                            {subset.prefix !== "" && ` (${subset.prefix})`}
                          </option>
                        );
                      })}
                    </optgroup>
                  )}
                  {subsetOptions.autoRelic.length > 0 && (
                    <optgroup label="Autos and Relics">
                      {subsetOptions.autoRelic.map((subset) => {
                        return (
                          <option key={subset.id} value={subset.id}>
                            {`${subset.name}`}
                            {subset.prefix !== "" && ` (${subset.prefix})`}
                          </option>
                        );
                      })}
                    </optgroup>
                  )}
                </>
              )
            }
          </StyledSelect>
        </Styled.SelectContainer>
        <Styled.SelectContainer>
          <Styled.Label htmlFor="select-series">Parallel</Styled.Label>
          <StyledSelect
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
                      {series.series.serialized &&
                        ` /${series.series.serialized}`}
                    </option>
                  );
                })
            }
          </StyledSelect>
        </Styled.SelectContainer>
      </Styled.Flex>
      <Styled.AbsoluteContainer>
        <ChecklistCheckbox
          checked={selectFromChecklist}
          disabled={selectedSeriesId === -1}
          onChange={(e) => setSelectFromChecklist(e.target.checked)}
        />
        {subset.code && (
          <Styled.CardCode>
            Card Code: <span>{subset.code}</span>
          </Styled.CardCode>
        )}
      </Styled.AbsoluteContainer>
      {!selectFromChecklist && (
        <>
          <Styled.SelectCardContainer onSubmit={handleAddCard}>
            <Styled.SelectContainer>
              <Styled.Label htmlFor="select-card">Card</Styled.Label>
              <StyledSelect
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
                              (card) => card.id === userCard.id
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
                          {card.cardData.note !== "" &&
                            ` (${card.cardData.note})`}
                        </option>
                      );
                    })}
              </StyledSelect>
            </Styled.SelectContainer>
            <Styled.Input
              type="text"
              value={cardIdField}
              placeholder="Card #"
              onChange={handleInputChange}
              disabled={selectedSeriesId === -1}
              autoComplete="off"
            />
            <StyledButton
              type="submit"
              color="BLUE"
              height="40px"
              width="55px"
              disabled={selectedCardId === -1}
            >
              Add
            </StyledButton>
          </Styled.SelectCardContainer>
        </>
      )}
      {selectFromChecklist && (
        <>
          {selectFrom === "COLLECTION" && (
            <ChecklistSelect
              removeCardsChecklist={collectionCardOptions}
              addCards={addCards}
              cardData={cardData}
            />
          )}
          {selectFrom === "DATABASE" && (
            <ChecklistSelect
              addCardsChecklist={databaseCardOptions}
              addCards={addCards}
            />
          )}
        </>
      )}
    </Styled.Container>
  );
}
