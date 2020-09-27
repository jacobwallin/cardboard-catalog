import React, { useEffect } from "react";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { RouteComponentProps } from "react-router-dom";
import { RootState } from "../store";
import { Subset } from "../store/collection/types";
import { fetchCollectionSubsets } from "../store/collection/thunks";

import SetCard from "./SetCard";

const CollectionSets: React.FC<Props> = (props) => {
  useEffect(() => {
    if (props.subsets.length === 0) {
      props.getSets();
    }
  }, []);

  function formatData(): formattedProps {
    return props.subsets
      .filter((subset) => {
        return subset.setYear === +props.match.params.year;
      })
      .reduce((cardsBySet: formattedProps, subset) => {
        if (
          cardsBySet.length > 0 &&
          cardsBySet[cardsBySet.length - 1].setId === subset.setId
        ) {
          cardsBySet[
            cardsBySet.length - 1
          ].distinctCards += +subset.distinctCards;
          cardsBySet[cardsBySet.length - 1].totalCards += +subset.totalCards;
        } else {
          cardsBySet.push({
            setId: subset.setId,
            name: subset.setName,
            distinctCards: +subset.distinctCards,
            totalCards: +subset.totalCards,
          });
        }
        return cardsBySet;
      }, []);
  }

  return (
    <div id="set-card-container">
      {formatData().map((set) => {
        return <SetCard key={set.setId} set={set} />;
      })}
    </div>
  );
};

const mapState = (state: RootState): StateProps => {
  return {
    subsets: state.collection.subsets,
  };
};

const mapDispatch = (dispatch: ThunkDispatch<{}, {}, any>): DispatchProps => {
  return {
    getSets: () => dispatch(fetchCollectionSubsets()),
  };
};

export default connect(mapState, mapDispatch)(CollectionSets);

type formattedProps = Array<{
  setId: number;
  name: string;
  distinctCards: number;
  totalCards: number;
}>;

interface StateProps {
  subsets: Subset[];
}

interface DispatchProps {
  getSets: () => void;
}

type TParams = { year: string };

type Props = StateProps & DispatchProps & RouteComponentProps<TParams>;
