import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { RootState } from "../../store";
import { fetchSubset } from "../../store/library/subsets/thunks";
import { fetchCardsInSingleSubset } from "../../store/collection/thunks";
import DataTable from "react-data-table-component";
import {
  PageContainer,
  ContentContainer,
  TableContainer,
} from "./CommonComponents";

const CardFilterContainer = styled.div`
  display: flex;
  width: 90%;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  justify-content: right;
  margin-bottom: 8px;
`;

const dataTableColumns = [
  {
    name: "Card #",
    selector: "card.card_datum.number",
    sortable: true,
  },
  {
    name: "Card Name",
    selector: "card.card_datum.name",
    sortable: true,
  },
];

const SeriesSelect = styled.select`
  width: 175px;
  height: 20px;
`;

const SelectLabel = styled.div`
  font-size: 0.8em;
  font-weight: 700;
`;

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
  const subsetUserCards = useSelector(
    (state: RootState) => state.collection.cardsInSingleSubset
  );

  let [selectedSeriesId, setSelectedSeriesId] = useState(-1);
  let [showAllCards, setShowAllCards] = useState(false);

  const SUBSET_ID_PARAM = +props.match.params.subsetId;

  useEffect(() => {
    // get the complete subset data from the library api and all the user's cards that belong to the subset from the collection api

    dispatch(fetchSubset(SUBSET_ID_PARAM));
    dispatch(fetchCardsInSingleSubset(SUBSET_ID_PARAM));
  }, []);

  function handleSeriesChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedSeriesId(+event.target.value);
  }
  function handleShowAllChange(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    setShowAllCards(!showAllCards);
  }

  return (
    <PageContainer>
      <h2>{librarySubset.name}</h2>
      <ContentContainer>
        {`Total Cards in Collection: `} <br />
        {`Distinct Cards in Collection: `}
      </ContentContainer>
      <h3>Cards in Collection</h3>
      <CardFilterContainer>
        <SelectLabel>Filter: </SelectLabel>
        <SeriesSelect value={selectedSeriesId} onChange={handleSeriesChange}>
          <option value={-1}>Show All</option>
          {librarySubset.series.map((series) => {
            return (
              <option key={series.id} value={series.id}>
                {series.name}
              </option>
            );
          })}
        </SeriesSelect>
      </CardFilterContainer>
      <TableContainer>
        <DataTable
          dense
          noHeader
          // progressPending={isLoading}
          columns={dataTableColumns}
          data={subsetUserCards.cards.filter((card) => {
            return (
              card.card.seriesId === selectedSeriesId || selectedSeriesId === -1
            );
          })}
          highlightOnHover
        />
      </TableContainer>
    </PageContainer>
  );
};

export default SubsetPage;
