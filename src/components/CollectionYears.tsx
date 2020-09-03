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
  function formatData(): Array<{ year: number; cardCount: number }> {
    return props.sets.reduce((setsByYear: any, set) => {
      if (
        setsByYear.length > 0 &&
        setsByYear[setsByYear.length - 1].year === set.year
      ) {
        setsByYear[setsByYear.length - 1].cardCount += set.Cards;
      } else {
        setsByYear.push({ year: set.year, cardCount: set.Cards });
      }
      return setsByYear;
    }, []);
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
