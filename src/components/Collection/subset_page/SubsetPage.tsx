import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { RootState } from "../../../store";
import { fetchSubset } from "../../../store/library/subsets/thunks";
import { fetchCardsInSingleSubset } from "../../../store/collection/browse/thunks";

import CollectionWrapper from "../../shared/CollectionWrapper";
import CollectionContainer from "../../shared/CollectionContainer";
import { createTableData, createUserCardTableData } from "./createTableData";
// import dataTableConditionalStyles from "./dataTableConditionalStyles";
import SubsetHeader from "../header/SubsetHeader";
import BrowseSubset from "./browse/BrowseSubset";
import CollectionSubset from "./collection/CollectionSubset";
import * as Styled from "./styled";

import { createLoadingSelector } from "../../../store/loading/reducer";
const loadingSelector = createLoadingSelector([
  "GET_CARDS_BY_SUBSET",
  "GET_SUBSET",
]);

type Params = {
  year: string;
  setId: string;
  subsetId: string;
};

const SubsetPage = (props: RouteComponentProps<Params>) => {
  const dispatch = useDispatch();

  const librarySubset = useSelector(
    (state: RootState) => state.library.subsets.subset
  );
  const userCardsInSubset = useSelector(
    (state: RootState) => state.collection.browse.cardsInSingleSubset
  );
  const loading = useSelector((state: RootState) => loadingSelector(state));

  const [showCollection, setShowCollection] = useState(false);

  useEffect(() => {
    // get the complete subset data from the library api and all the user's cards that belong to the subset from the collection api
    dispatch(fetchSubset(+props.match.params.subsetId));
    dispatch(fetchCardsInSingleSubset(+props.match.params.subsetId));
  }, []);

  function showChecklistClicked() {
    setShowCollection(false);
  }

  function showCollectionClicked() {
    setShowCollection(true);
  }

  // DataTable wants a string[] ???
  const tableData: any = createTableData(librarySubset, userCardsInSubset);
  const idk: any = createUserCardTableData(librarySubset, userCardsInSubset);

  return (
    <CollectionWrapper>
      <CollectionContainer>
        <SubsetHeader
          title={librarySubset.name}
          handleBrowseClick={showChecklistClicked}
          handleCollectionClick={showCollectionClicked}
          collectionSelected={showCollection}
        />
        {!loading &&
          (!showCollection ? (
            <BrowseSubset tableData={tableData} />
          ) : (
            <CollectionSubset tableData={tableData} userCardTableData={idk} />
          ))}
      </CollectionContainer>
    </CollectionWrapper>
  );
};

export default SubsetPage;
