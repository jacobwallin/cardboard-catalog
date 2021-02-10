import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { SetSummary } from "../store/library/sets/types";
import { Card } from "../store/library/series/types";
import { fetchAllSetData, fetchSet } from "../store/library/sets/thunks";
import { fetchSubset } from "../store/library/subsets/thunks";
import { fetchSeriesById } from "../store/library/series/thunks";
import { clearCollection } from "../store/collection/actions";
import PlayerCard from "./PlayerCard";
import { postData } from "../utils/postData";
import styled from "styled-components";

import "../styling/addCardsForm.css";

const Select = styled.select`
  width: 50%;
  padding: 5px;
  margin: 5px auto;
  @media (max-width: 768px) {
    width: 90%;
  }
`;
const TextArea = styled.textarea`
  width: 50%;
  margin: 5px auto;
  resize: none;
  height: 50px;
`;
const SubmitButton = styled.button`
  width: 100px;
`;

export default function AddCardsForm() {
  const [selectedYear, setSelectedYear] = useState(-1);
  const [selectedSetId, setSelectedSetId] = useState(-1);
  const [selectedSubsetId, setSelectedSubsetId] = useState(-1);
  const [selectedSeriesId, setSelectedSeriesId] = useState(-1);
  const [cardNumbers, setCardNumbers] = useState("");
  const [submitDisabled, setSubmitDisabled] = useState(false);
  // lists any card numbers entered by the user that are not valid
  const [invalidCardNumbers, setInvalidCardNumbers] = useState<String[]>([]);
  const [validCards, setValidCards] = useState<Card[]>([]);

  const allSets = useSelector((state: RootState) => state.library.sets.allSets);
  const set = useSelector((state: RootState) => state.library.sets.singleSet);
  const subset = useSelector(
    (state: RootState) => state.library.subsets.subset
  );
  const series = useSelector((state: RootState) => state.library.series.series);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllSetData());
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

  useEffect(() => {
    // parse card numbers whenever user changes card number field
    parseCardNumbers();
  }, [cardNumbers]);

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    // reset preceding select forms to default before updating year (will react always decide to do this in order??)
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
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setCardNumbers(event.target.value);
  };

  const handleSubmit = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    // TODO: this should be done in REDUX
    const apiData = validCards.map((card) => {
      return { cardId: card.id };
    });
    setSubmitDisabled(true);
    postData("/api/collection/add", apiData).then((response) => {
      // clear collection data so it will be re-fetched and updated when user next goes to any collection pages
      dispatch(clearCollection());
    });
  };

  const parseCardNumbers = () => {
    // parse string
    const parsedCardNumbers = cardNumbers
      .split(",")
      .map((cardNum) => cardNum.trim());
    // do not add a card number until there is a trailing comma added to the string
    parsedCardNumbers.pop();

    parsedCardNumbers.forEach((cardNum) => {
      const cardFindResult = series.cards.find(
        (card) => card.card_datum.number === cardNum
      );
      if (cardFindResult) {
        // if the card number is valid, add the card to the array of valid cards
        setValidCards([...validCards, cardFindResult]);
      } else {
        // if invalid, the invalid number is added to state
        setInvalidCardNumbers([...invalidCardNumbers, cardNum]);
      }
    });
  };

  return (
    <div className="add-cards">
      <div className="add-cards-form">
        <Select
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
        </Select>
        <Select
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
        </Select>
        <Select
          value={selectedSubsetId}
          name="select-subset"
          id="select-subset"
          disabled={selectedSetId === -1}
          onChange={handleSubsetChange}
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
        </Select>
        <TextArea
          value={cardNumbers}
          placeholder="Enter Card Numbers"
          onChange={handleCardNumbersChange}
          id="card-numbers"
          name="card-numbers"
          disabled={selectedSeriesId === -1}
        />
        <SubmitButton
          id="submit-cards-button"
          onClick={handleSubmit}
          disabled={submitDisabled || cardNumbers === ""}
        >
          Submit
        </SubmitButton>
      </div>

      <div className="invalid-card-numbers">
        {invalidCardNumbers.length > 0 && (
          <p>{`Cannot find card numbers ${invalidCardNumbers.join(", ")}`}</p>
        )}
      </div>

      <div className="player-card-container">
        {validCards
          .sort((a, b) => {
            // parse to int if possible, otherwise compare as strings
            const aInt = parseInt(a.card_datum.number) || a.card_datum.number;
            const bInt = parseInt(b.card_datum.number || b.card_datum.number);
            if (aInt < bInt) {
              return -1;
            } else if (aInt === bInt) {
              return 0;
            }
            return 1;
          })
          .map((card) => {
            return (
              <PlayerCard
                key={card.id}
                card={card}
                quantity={1}
                color={series.color}
              />
            );
          })}
      </div>
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
