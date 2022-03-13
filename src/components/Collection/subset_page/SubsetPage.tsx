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
import { TableData } from "./createTableData";

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

  // subset and user's cards in subset data
  const isLoading = useSelector((state: RootState) => loadingSelector(state));
  const subset = useSelector((state: RootState) => state.library.subsets);
  const userCardsInSubset = useSelector(
    (state: RootState) => state.collection.browse.cardsInSingleSubset
  );

  // ui state, toggles between collection and checklist view
  const [showCollection, setShowCollection] = useState(
    props.location.search.slice(props.location.search.length - 4) === "coll"
  );

  // disables series select when adding cards to collection
  const [disableSeriesSelect, setDisableSeriesSelect] = useState(false);

  // currently selected series id and it's index in tableData
  const [selectedSeriesId, setSelectedSeriesId] = useState(0);

  // table data
  const [tableData, setTableData] = useState<TableData>({});

  // initial data fetch
  useEffect(() => {
    dispatch(fetchSubset(+props.match.params.subsetId));
    dispatch(fetchCardsInSingleSubset(+props.match.params.subsetId));
  }, []);

  // create table data once fetched
  useEffect(() => {
    if (!isLoading && subset.id === +props.match.params.subsetId) {
      // create table data
      const data = createTableData(subset, userCardsInSubset);
      setTableData(data);

      // get base series id or in case it is null, the first series in the array
      const selectedSeries = data[subset.baseSeriesId || subset.series[0].id];
      setSelectedSeriesId(selectedSeries.seriesId);
    }
  }, [isLoading, subset, userCardsInSubset, props]);

  function showChecklistClicked() {
    setShowCollection(false);
    setDisableSeriesSelect(false);
  }

  function showCollectionClicked() {
    setShowCollection(true);
    setDisableSeriesSelect(false);
  }

  function toggleDisableSeriesSelect() {
    setDisableSeriesSelect(!disableSeriesSelect);
  }

  function handleSeriesChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedSeriesId(+event.target.value);
  }

  // show loading indicator until tableData has been fetched and generated
  if (selectedSeriesId === 0)
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
              disabled={disableSeriesSelect}
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
                      {tableData[series.id].totalCards > 0 &&
                        (tableData[series.id].totalCards > 1
                          ? ` (${tableData[series.id].totalCards} Cards)`
                          : ` (${tableData[series.id].totalCards} Card)`)}
                    </option>
                  );
                })}
            </Styled.SeriesSelect>
          </Styled.SelectParallel>
        )}
        {!showCollection ? (
          <BrowseSubset
            tableData={tableData[selectedSeriesId]}
            toggleDisableSeriesSelect={toggleDisableSeriesSelect}
          />
        ) : (
          <CollectionSubset
            tableData={tableData[selectedSeriesId]}
            toggleDisableSeriesSelect={toggleDisableSeriesSelect}
          />
        )}
      </CollectionContainer>
    </CollectionWrapper>
  );
};

export default SubsetPage;
