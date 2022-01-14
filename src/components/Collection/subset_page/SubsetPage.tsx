import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { RootState } from "../../../store";
import { fetchSubset } from "../../../store/library/subsets/thunks";
import { fetchCardsInSingleSubset } from "../../../store/collection/browse/thunks";

import CollectionWrapper from "../../shared/CollectionWrapper";
import CollectionContainer from "../../shared/CollectionContainer";
import { createTableData } from "./createTableData";
import SubsetHeader from "../header/SubsetHeader";
import BrowseSubset from "./browse/BrowseSubset";
import CollectionSubset from "./collection/CollectionSubset";
import { LoadingDots } from "../../shared/Loading";
import * as Styled from "./styled";
import sortSeries from "./sortSeries";

import { createLoadingSelector } from "../../../store/loading/reducer";
const loadingSelector = createLoadingSelector([
  "GET_CARDS_BY_SUBSET",
  "GET_SUBSET",
]);

type Params = {
  subsetId: string;
};

const SubsetPage = (props: RouteComponentProps<Params>) => {
  const dispatch = useDispatch();

  const subset = useSelector((state: RootState) => state.library.subsets);
  const userCardsInSubset = useSelector(
    (state: RootState) => state.collection.browse.cardsInSingleSubset
  );
  const isLoading = useSelector((state: RootState) => loadingSelector(state));

  const [showCollection, setShowCollection] = useState(
    props.location.search.slice(props.location.search.length - 4) === "coll"
  );

  const [selectedSeriesId, setSelectedSeriesId] = useState(
    subset.baseSeriesId || 1
  );

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

  function handleSeriesChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedSeriesId(+event.target.value);
  }

  // DataTable wants a string[] ???
  const tableData: any = createTableData(subset, userCardsInSubset);

  if (isLoading || +props.match.params.subsetId !== subset.id)
    return (
      <CollectionWrapper>
        <CollectionContainer>
          <LoadingDots />
        </CollectionContainer>
      </CollectionWrapper>
    );

  return (
    <CollectionWrapper>
      <CollectionContainer>
        <SubsetHeader
          title={subset.set.name}
          subTitle={subset.name}
          handleBrowseClick={showChecklistClicked}
          handleCollectionClick={showCollectionClicked}
          collectionSelected={showCollection}
        />
        {subset.series.length > 1 && (
          <Styled.SelectParallel>
            <Styled.SelectLabel>Select Parallel Set</Styled.SelectLabel>
            <Styled.SeriesSelect
              value={selectedSeriesId}
              onChange={handleSeriesChange}
              // disabled={checklistToggleSelect}
            >
              {subset.series
                .sort((a, b) => {
                  return sortSeries(a, b, subset.baseSeriesId || 0);
                })
                .map((series) => {
                  return (
                    <option key={series.id} value={series.id}>
                      {series.name}
                      {series.serialized && ` /${series.serialized}`}
                    </option>
                  );
                })}
            </Styled.SeriesSelect>
          </Styled.SelectParallel>
        )}
        {!showCollection ? (
          <BrowseSubset
            tableData={tableData.find(
              (series: any) => series.seriesId === selectedSeriesId
            )}
          />
        ) : (
          <CollectionSubset
            tableData={tableData.find(
              (series: any) => series.seriesId === selectedSeriesId
            )}
          />
        )}
      </CollectionContainer>
    </CollectionWrapper>
  );
};

export default SubsetPage;
