import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { RootState } from "../../../store";
import { fetchSubset } from "../../../store/library/subsets/thunks";
import { fetchCardsInSingleSubset } from "../../../store/collection/browse/thunks";
import DataTable from "react-data-table-component";
import {
  CollectionPageContainer,
  DataTableContainer,
  ContentContainer,
  DataTableTitle,
} from "../shared";
import CollectionWrapper from "../CollectionWrapper";
import CollectionContainer from "../CollectionContainer";
import columns from "./dataTableColumns";
import createTableData from "./createTableData";
import SeriesSelect from "./SeriesSelect";
import SelectLabel from "./SelectLabel";
import CardFilterContainer from "./CardFilterContainer";
import dataTableConditionalStyles from "./dataTableConditionalStyles";

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

  const [showCollection, setShowCollection] = useState(false);
  const [selectedSeriesId, setSelectedSeriesId] = useState(0);
  const [showAllCards, setShowAllCards] = useState(false);
  const [checklistToggleSelect, setChecklistToggleSelect] = useState(false);

  const SUBSET_ID_PARAM = +props.match.params.subsetId;

  useEffect(() => {
    // get the complete subset data from the library api and all the user's cards that belong to the subset from the collection api
    dispatch(fetchSubset(SUBSET_ID_PARAM));
    dispatch(fetchCardsInSingleSubset(SUBSET_ID_PARAM));
  }, []);

  useEffect(() => {
    setSelectedSeriesId(librarySubset.baseSeriesId || 0);
  }, [librarySubset]);

  function handleSeriesChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedSeriesId(+event.target.value);
  }
  function handleShowAllChange(event: React.ChangeEvent<HTMLInputElement>) {
    setShowAllCards(!showAllCards);
  }

  // TODO: DataTable wants a string[] ???
  const tableData: any = createTableData(librarySubset, userCardsInSubset);

  return (
    <CollectionWrapper>
      <CollectionContainer>
        <CollectionPageContainer>
          <h2>{librarySubset.name}</h2>
          <ContentContainer>
            {`Total Cards in Collection: ${userCardsInSubset.cards.length}`}{" "}
            <br />
            {`Unique Cards in Collection: ${
              Object.keys(
                userCardsInSubset.cards.reduce((uniqueCardsMap: any, card) => {
                  return { ...uniqueCardsMap, [card.cardId]: true };
                }, {})
              ).length
            }`}
          </ContentContainer>
          <CardFilterContainer>
            <SelectLabel>Show Missing Cards: </SelectLabel>
            <input
              type="checkbox"
              onChange={handleShowAllChange}
              checked={showAllCards}
            />
          </CardFilterContainer>
          <CardFilterContainer>
            <SelectLabel>Select Parallel Set: </SelectLabel>
            <SeriesSelect
              value={selectedSeriesId}
              onChange={handleSeriesChange}
            >
              <option value={0}>Show All Parallels</option>
              {librarySubset.series.map((series) => {
                return (
                  <option key={series.id} value={series.id}>
                    {series.name}
                  </option>
                );
              })}
            </SeriesSelect>
          </CardFilterContainer>
          <DataTableContainer>
            <DataTable
              dense
              title="Cards"
              actions={
                <button
                  onClick={(e) =>
                    setChecklistToggleSelect(!checklistToggleSelect)
                  }
                >
                  {" "}
                  Add Cards to Collection
                </button>
              }
              columns={columns}
              data={tableData.filter((card: any) => {
                return (
                  selectedSeriesId === 0 || card.seriesId === selectedSeriesId
                );
              })}
              highlightOnHover
              pagination
              paginationRowsPerPageOptions={[10, 20, 30, 40, 50]}
              paginationPerPage={20}
              defaultSortField={"Card #"}
              selectableRows={checklistToggleSelect}
              onSelectedRowsChange={({ selectedRows }) => {
                console.log(selectedRows);
              }}
            />
          </DataTableContainer>
        </CollectionPageContainer>
      </CollectionContainer>
    </CollectionWrapper>
  );
};

export default SubsetPage;
