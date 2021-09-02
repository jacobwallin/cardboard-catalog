import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCardsBySet } from "../../../store/collection/thunks";
import { createLoadingSelector } from "../../../store/loading/reducer";
import { RootState } from "../../../store";
import DataTable from "react-data-table-component";
import { aggregateCardsByYear } from "./aggregateCards";
import columns from "./dataTableColumns";

import { DataTableContainer, CollectionPageContainer } from "../shared";

const isLoadingSelector = createLoadingSelector(["GET_CARDS_BY_SET"]);

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
    <CollectionPageContainer>
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
    </CollectionPageContainer>
  );
};

export default CardsByYearPage;