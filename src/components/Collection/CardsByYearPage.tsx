import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { fetchCardsBySet } from "../../store/collection/thunks";
import { createLoadingSelector } from "../../store/loading/reducer";
import { SetCards } from "../../store/collection/types";
import { RootState } from "../../store";

import DataTable from "react-data-table-component";

import "../../styling/collection.css";

const isLoadingSelector = createLoadingSelector(["GET_CARDS_BY_SET"]);

const columns = [
  {
    name: "Year",
    selector: "year",
    sortable: true,
    cell: (row: any) => <Link to={`/collection/${row.year}`}>{row.year}</Link>,
  },
  {
    name: "Total Cards",
    selector: "totalCards",
    sortable: true,
  },
  {
    name: "Unique Cards",
    selector: "distinctCards",
    sortable: true,
  },
];

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TableContainer = styled.div`
  width: 90%;
`;

const CardsByYearPage = () => {
  const cardsBySet = useSelector(
    (state: RootState) => state.collection.cardsBySet
  );

  const isLoading = useSelector((state: RootState) => isLoadingSelector(state));
  const initialDataLoadComplete = useSelector(
    (state: RootState) => state.collection.initialDataLoadComplete
  );

  const dispatch = useDispatch();

  useEffect(() => {
    // only fetch data once
    if (!initialDataLoadComplete) {
      dispatch(fetchCardsBySet());
    }
  }, []);

  return (
    <PageContainer>
      <h2>My Collection</h2>
      <TableContainer>
        <DataTable
          noHeader
          progressPending={isLoading}
          columns={columns}
          data={aggregateCardsByYear(cardsBySet)}
          highlightOnHover
          dense
        />
      </TableContainer>
    </PageContainer>
  );
};

export default CardsByYearPage;

// transform api data to show total cards in collection aggregated by year
function aggregateCardsByYear(
  cardsBySet: SetCards[]
): Array<{
  year: number;
  distinctCards: number;
  totalCards: number;
}> {
  return cardsBySet.reduce(
    (
      cardsByYear: Array<{
        year: number;
        distinctCards: number;
        totalCards: number;
      }>,
      set
    ) => {
      if (
        cardsByYear.length > 0 &&
        cardsByYear[cardsByYear.length - 1].year === set.year
      ) {
        cardsByYear[cardsByYear.length - 1].distinctCards += +set.distinctCards;
        cardsByYear[cardsByYear.length - 1].totalCards += +set.totalCards;
      } else {
        cardsByYear.push({
          year: set.year,
          distinctCards: +set.distinctCards,
          totalCards: +set.totalCards,
        });
      }
      return cardsByYear;
    },
    []
  );
}
