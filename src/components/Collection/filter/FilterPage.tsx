import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { fetchCards } from "../../../store/collection/filter/thunks";
import DataTable from "react-data-table-component";
import columns from "./dataTableColumns";
import { createLoadingSelector } from "../../../store/loading/reducer";

import {
  CollectionPageContainer,
  DataTableContainer,
  ContentContainer,
  DataTableTitle,
  CollectionData,
} from "../shared";

const loadingCardsSelector = createLoadingSelector(["GET_CARDS"]);
const CARD_LIMIT = 10;

export default function FilterPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCards());
  }, []);

  const cards = useSelector((state: RootState) => state.collection.filter.rows);
  const cardCount = useSelector(
    (state: RootState) => state.collection.filter.count
  );

  const loadingCards = useSelector((state: RootState) =>
    loadingCardsSelector(state)
  );

  return (
    <CollectionPageContainer>
      <DataTableContainer>
        <DataTable
          columns={columns}
          data={cards}
          dense
          progressPending={loadingCards}
          pagination
          paginationPerPage={25}
          paginationRowsPerPageOptions={[10, 25, 50]}
        />
      </DataTableContainer>
    </CollectionPageContainer>
  );
}
