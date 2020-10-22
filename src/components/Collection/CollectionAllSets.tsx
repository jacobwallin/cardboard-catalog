import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { fetchCardsBySet } from "../../store/collection/thunks";
import { RootState } from "../../store";

import SetCard from "./SetCard";

type TParams = { year: string };

const CollectionSets: React.FC<RouteComponentProps<TParams>> = (props) => {
  const dispatch = useDispatch();

  const cardsBySet = useSelector(
    (state: RootState) => state.collection.cardsBySet
  );

  useEffect(() => {
    if (cardsBySet.length === 0) {
      dispatch(fetchCardsBySet());
    }
  }, []);

  return (
    <div id="collection-sets">
      <h1>{`All Sets for ${props.match.params.year}`}</h1>
      <div id="set-card-container">
        {cardsBySet
          .filter((set) => set.year === +props.match.params.year)
          .map((set) => {
            return <SetCard key={set.setId} set={set} />;
          })}
      </div>
    </div>
  );
};

export default CollectionSets;
