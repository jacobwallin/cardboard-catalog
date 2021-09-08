import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { RootState } from "../../../store";
import { fetchSubset } from "../../../store/library/subsets/thunks";
import { fetchCardsInSingleSubset } from "../../../store/collection/thunks";
import DataTable from "react-data-table-component";
import {
  CollectionPageContainer,
  DataTableContainer,
  ContentContainer,
} from "../shared";
import columns from "./dataTableColumns";

const CardFilterContainer = styled.div`
  display: flex;
  width: 90%;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  justify-content: right;
  margin-bottom: 8px;
`;

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

  const userCardsInSubset = useSelector(
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

  const userCardsTotals = userCardsInSubset.cards.reduce(
    (cardTotals: any, card) => {
      if (cardTotals[card.cardId]) {
        return { ...cardTotals, [card.cardId]: cardTotals[card.cardId] + 1 };
      } else {
        return { ...cardTotals, [card.cardId]: 1 };
      }
    },
    {}
  );

  // allow 0(1) lookup into card data to create array for DataTable
  const cardDataHashTable: any = librarySubset.card_data.reduce(
    (hashTable, cardData) => {
      return { ...hashTable, [cardData.id]: cardData };
    },
    {}
  );

  const allCardsTableData = librarySubset.series.reduce(
    (allCards: any, series) => {
      const cardDataArray = series.cards.map((card) => {
        return {
          ...card,
          cardData: cardDataHashTable[card.cardDataId],
          quantity: userCardsTotals[card.id] ? userCardsTotals[card.id] : 0,
        };
      });
      return [...allCards, ...cardDataArray];
    },
    []
  );

  return (
    <CollectionPageContainer>
      <h2>{librarySubset.name}</h2>
      <ContentContainer>
        {`Total Cards in Collection: ${userCardsInSubset.cards.length}`} <br />
        {`Distinct Cards in Collection: ${
          Object.keys(
            userCardsInSubset.cards.reduce((uniqueCardsMap: any, card) => {
              return { ...uniqueCardsMap, [card.cardId]: true };
            }, {})
          ).length
        }`}
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
      <DataTableContainer>
        <DataTable
          dense
          noHeader
          // progressPending={isLoading}
          columns={columns}
          data={allCardsTableData.filter((card: any) => card.quantity > 0)}
          highlightOnHover
          pagination
          paginationRowsPerPageOptions={[10, 20, 30, 40, 50]}
          paginationPerPage={20}
        />
      </DataTableContainer>
    </CollectionPageContainer>
  );
};

export default SubsetPage;
