import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { fetchCardsBySet } from "../../../store/collection/thunks";
import { createLoadingSelector } from "../../../store/loading/reducer";
import { RootState } from "../../../store";
import DataTable from "react-data-table-component";
import { aggregateCardsByYear } from "./aggregateCards";

import DataTableContainer from "../shared/DataTableContainer";

import "../../../styling/collection.css";

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
    name: "Distinct Cards",
    selector: "distinctCards",
    sortable: true,
  },
];

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
      <DataTableContainer>
        <DataTable
          noHeader
          progressPending={isLoading}
          columns={columns}
          data={aggregateCardsByYear(cardsBySet)}
          highlightOnHover
          dense
        />
      </DataTableContainer>
    </PageContainer>
  );
};

export default CardsByYearPage;
