import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { RootState } from "../../store";
import { fetchCardsBySubset } from "../../store/collection/thunks";
import { fetchSet } from "../../store/library/sets/thunks";

import SubsetCard from "./SubsetCard";

type TParams = {
  year: string;
  setId: string;
};

const CollectionSubsets = (props: RouteComponentProps<TParams>) => {
  const dispatch = useDispatch();
  const cardsBySubset = useSelector(
    (state: RootState) => state.collection.cardsBySubset
  );
  const singleSet = useSelector(
    (state: RootState) => state.library.sets.singleSet
  );
  const setId = +props.match.params.setId;

  useEffect(() => {
    // fetch data if necessary
    if (
      cardsBySubset.length === 0 ||
      singleSet.id !== setId ||
      cardsBySubset[0].setId !== setId
    ) {
      dispatch(fetchCardsBySubset(setId));
      dispatch(fetchSet(setId));
    }
  }, []);

  if (
    cardsBySubset.length > 0 &&
    singleSet.id === setId &&
    cardsBySubset[0].setId === setId
  ) {
    return (
      <>
        {singleSet.subsets.map((subset) => {
          const subsetCards = cardsBySubset.find(
            (subsetSummary) => subsetSummary.subsetId === subset.id
          );
          return (
            <SubsetCard
              key={subset.id}
              subset={subset}
              totalCards={subsetCards ? +subsetCards.totalCards : 0}
              distinctCards={subsetCards ? +subsetCards.distinctCards : 0}
            />
          );
        })}
      </>
    );
  } else {
    return <h1>LOADING DATA</h1>;
  }
};

export default CollectionSubsets;
