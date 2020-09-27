import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { Set, SubsetSummary, Card } from "../store/library/types";
import { fetchAllSetData, fetchSubsetData } from "../store/library/thunks";
import PlayerCard from "./PlayerCard";

import "../styling/addCardsForm.css";

export default function AddCardsForm() {
  const [selectedYear, setSelectedYear] = useState(-1);
  const [selectedSetId, setSelectedSetId] = useState(-1);
  const [selectedSubsetId, setSelectedSubsetId] = useState(-1);
  const [selectedSeriesId, setSelectedSeriesId] = useState(-1);
  const [cardNumbers, setCardNumbers] = useState("");

  const allSets = useSelector((state: RootState) => state.library.allSets);
  const subset = useSelector((state: RootState) => state.library.subset);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllSetData());
  }, []);

  useEffect(() => {
    // fetch subset data, but only if a subset is selected
    if (selectedSubsetId !== -1) {
      dispatch(fetchSubsetData(selectedSubsetId));
    }
  }, [selectedSubsetId]);

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    // reset preceding select forms to default before updating year (hopefully react does this in order??)
    setCardNumbers("");
    setSelectedSeriesId(-1);
    setSelectedSubsetId(-1);
    setSelectedSetId(-1);
    setSelectedYear(+event.target.value);
  };
  const handleSetChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCardNumbers("");
    setSelectedSeriesId(-1);
    setSelectedSubsetId(-1);
    setSelectedSetId(+event.target.value);
  };
  const handleSubsetChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCardNumbers("");
    setSelectedSeriesId(-1);
    setSelectedSubsetId(+event.target.value);
  };
  const handleSeriesChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSeriesId(+event.target.value);
  };
  const handleCardNumbersChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCardNumbers(event.target.value);
  };

  const parseCardNumbers = (): {
    notFound: string[];
    found: Array<{ card: Card; quantity: number; color: string }>;
  } => {
    // parse string
    const numbers = cardNumbers.split(",").map((cardNum) => cardNum.trim());
    // do not add a card number until there is a trailing comma added to the string
    numbers.pop();

    const initialParsedData: {
      notFound: string[];
      found: Array<{ card: Card; quantity: number; color: string }>;
    } = { notFound: [], found: [] };

    // create array of objects containing each card and quantity to add
    const cards = numbers.reduce((parsedData, cardNum) => {
      const currentSeries = subset.series.find(
        (series) => series.id === selectedSeriesId
      )!;
      const card = currentSeries.cards.find(
        (card) => card.card_datum.number === cardNum
      );
      if (card) {
        const index = parsedData.found.findIndex(
          (cardsToAdd) => cardsToAdd.card.id === card.id
        );
        if (index === -1) {
          parsedData.found.push({
            card,
            quantity: 1,
            color: currentSeries.color,
          });
        } else {
          parsedData.found[index].quantity++;
        }
      } else {
        parsedData.notFound.push(cardNum);
      }
      return parsedData;
    }, initialParsedData);

    return cards;
  };

  return (
    <div className="add-cards">
      <div className="add-cards-form">
        <select
          value={selectedYear}
          name="select-year"
          id="select-year"
          onChange={handleYearChange}
        >
          <option value={-1}>Select Year</option>
          {aggregateYears(allSets).map((year) => {
            return (
              <option key={year} value={year}>
                {year}
              </option>
            );
          })}
        </select>
        <select
          value={selectedSetId}
          name="select-set"
          id="select-set"
          disabled={selectedYear === -1}
          onChange={handleSetChange}
        >
          <option value={-1}>Select Set</option>
          {aggregateSets(allSets, selectedYear).map((set) => {
            return (
              <option key={set.id} value={set.id}>
                {set.name}
              </option>
            );
          })}
        </select>
        <select
          value={selectedSubsetId}
          name="select-subset"
          id="select-subset"
          disabled={selectedSetId === -1}
          onChange={handleSubsetChange}
        >
          <option value={-1}>Select Subset</option>
          {aggregateSubsets(allSets, selectedSetId).map((subset) => {
            return (
              <option key={subset.id} value={subset.id}>
                {subset.name}
              </option>
            );
          })}
        </select>
        <select
          value={selectedSeriesId}
          name="select-series"
          id="select-series"
          disabled={selectedSubsetId === -1}
          onChange={handleSeriesChange}
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
        </select>
        <label htmlFor="card-numbers">Enter Card Numbers: </label>
        <input
          type="text"
          value={cardNumbers}
          onChange={handleCardNumbersChange}
          id="card-numbers"
          name="card-numbers"
          disabled={selectedSeriesId === -1}
        />
      </div>

      <div className="invalid-card-numbers">
        {parseCardNumbers().notFound.length > 0 && (
          <p>{`Cannot find card numbers ${parseCardNumbers().notFound.join(
            ", "
          )}`}</p>
        )}
      </div>

      <div className="cards-added">
        {parseCardNumbers()
          .found.sort((a, b) => {
            // parse to int if possible, otherwise compare as strings
            const aInt =
              parseInt(a.card.card_datum.number) || a.card.card_datum.number;
            const bInt = parseInt(
              b.card.card_datum.number || b.card.card_datum.number
            );
            if (aInt < bInt) {
              return -1;
            } else if (aInt === bInt) {
              return 0;
            }
            return 1;
          })
          .map((cardData) => {
            return (
              <PlayerCard
                key={cardData.card.id}
                card={cardData.card}
                quantity={cardData.quantity}
                color={cardData.color}
              />
            );
          })}
      </div>
    </div>
  );
}

// these functions aggregate the API data for each of the select drop down menus
function aggregateYears(allSets: Set[]): number[] {
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
function aggregateSets(allSets: Set[], year: number): Set[] {
  return allSets.filter((set) => {
    return set.year === year;
  });
}
function aggregateSubsets(allSets: Set[], setId: number): SubsetSummary[] {
  const theSet = allSets.find((set) => set.id === setId);
  if (theSet) {
    return theSet.subsets;
  }
  return [];
}
