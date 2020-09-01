import React, { useEffect } from "react";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { useParams } from "react-router-dom";
import { RootState } from "../store";
import { Set } from "../store/collection/types";
import { fetchSets } from "../store/collection/thunks";

import SetCard from "./SetCard";

const CollectionSets: React.FC<Props> = (props) => {
  const { year } = useParams();
  console.log(year);
  useEffect(() => {
    if (props.sets.length === 0) {
      props.getSets();
    }
  }, []);

  return (
    <div id="set-card-container">
      {props.sets
        .filter((set) => {
          if (set.year === +year) return true;
          return false;
        })
        .map((set) => {
          return <SetCard key={set.id} set={set} />;
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

export default connect(mapState, mapDispatch)(CollectionSets);

interface StateProps {
  sets: Set[];
}

interface DispatchProps {
  getSets: () => void;
}

type Props = StateProps & DispatchProps;
