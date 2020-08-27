import React, { useEffect } from "react";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { fetchSets } from "../store/collection/thunks";
import { Set } from "../store/collection/types";

import YearCard from "./YearCard";

// complete Redux store state type
import { RootState } from "../store";

const dummyData = [
  { year: 2017, cardCount: 102 },
  { year: 2018, cardCount: 655 },
  { year: 2019, cardCount: 99 },
  { year: 2020, cardCount: 402 },
];

const CollectionYears = (props: Props) => {
  useEffect(() => {
    // dipatch thunk for getting cards
    props.getSets();
  }, []);

  return (
    <div>
      {dummyData.map((yearData) => {
        return <YearCard key={yearData.year} yearData={yearData} />;
      })}
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
