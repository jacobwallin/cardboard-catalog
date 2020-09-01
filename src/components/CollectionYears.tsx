import React, { useEffect } from "react";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { fetchSets } from "../store/collection/thunks";
import { Set } from "../store/collection/types";

import "../styling/collection.css";

import YearCard from "./YearCard";

// complete Redux store state type
import { RootState } from "../store";

const CollectionYears = (props: Props) => {
  useEffect(() => {
    if (props.sets.length === 0) {
      props.getSets();
    }
  }, []);

  // format data to be an array of type {year: number, cardCount: number}
  // probably a better way to do this ¯\_(ツ)_/¯
  function formatData(): Array<{ year: number; cardCount: number }> {
    let setsByYear = props.sets.reduce((setsByYear: any, set) => {
      if (setsByYear.hasOwnProperty(set.year)) {
        setsByYear[set.year] += set.Cards;
      } else {
        setsByYear[set.year] = set.Cards;
      }
      return setsByYear;
    }, {});

    let returnArray = [];
    for (const year in setsByYear) {
      returnArray.push({
        year: +year,
        cardCount: setsByYear[year],
      });
    }
    return returnArray;
  }

  return (
    <div id="year-card-container">
      {props.sets.length !== 0 ? (
        formatData().map((yearData) => {
          return <YearCard key={yearData.year} yearData={yearData} />;
        })
      ) : (
        <p>Loading Collection</p>
      )}
    </div>
  );
};

const mapState = (state: RootState): StateProps => {
  return {
    sets: state.collection.sets,
  };
};

const mapDispatch = (dispatch: ThunkDispatch<{}, {}, any>): DispatchProps => {
  return {
    getSets: () => dispatch(fetchSets()),
  };
};

export default connect(mapState, mapDispatch)(CollectionYears);

interface StateProps {
  sets: Set[];
}

interface DispatchProps {
  getSets: () => void;
}

type Props = StateProps & DispatchProps;
