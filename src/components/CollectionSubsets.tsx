import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { RootState } from "../store";
import { fetchSets } from "../store/collection/thunks";

import SubsetCard from "./SubsetCard";

type TParams = {
  year: string;
  setId: string;
};

const CollectionSubsets = (props: RouteComponentProps<TParams>) => {
  const dispatch = useDispatch();
  const subsets = useSelector((state: RootState) => state.collection.subsets);

  useEffect(() => {
    if (subsets.length === 0) {
      dispatch(fetchSets());
    }
  }, []);

  return subsets
    .filter((subset) => {
      return subset.setId === +props.match.params.setId;
    })
    .map((subset) => {
      return <SubsetCard key={subset.subsetId} subset={subset} />;
    });
};

export default CollectionSubsets;
