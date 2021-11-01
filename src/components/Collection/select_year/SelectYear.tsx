import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCardsBySet } from "../../../store/collection/browse/thunks";
import { createLoadingSelector } from "../../../store/loading/reducer";
import { RootState } from "../../../store";
import DataTable from "react-data-table-component";
import { aggregateCardsByYear } from "./aggregateCards";
import columns from "./dataTableColumns";
import * as Shared from "../shared";
import { LoadingDots } from "../../shared/Loading";
import { NoDataMessage } from "../../shared/NoDataMessage";

const isLoadingSelector = createLoadingSelector(["GET_CARDS_BY_SET"]);

const SelectYear = () => {
  const cardsBySet = useSelector(
    (state: RootState) => state.collection.browse.cardsBySet
  );

  const isLoading = useSelector((state: RootState) => isLoadingSelector(state));
  const initialDataLoadComplete = useSelector(
    (state: RootState) => state.collection.browse.initialDataLoadComplete
  );

  const dispatch = useDispatch();

  useEffect(() => {
    // only fetch data once
    if (!initialDataLoadComplete) {
      dispatch(fetchCardsBySet());
    }
  }, []);

  if (isLoading) return <LoadingDots />;

  return (
    <Shared.CollectionPageContainer>
      <Shared.DataTableContainer>
        <DataTable
          dense
          title={<Shared.DataTableTitle>Select Year</Shared.DataTableTitle>}
          actions={
            <Shared.TotalCards
              totalCards={cardsBySet.reduce((total, set) => {
                return (total += +set.totalCards);
              }, 0)}
            />
          }
          columns={columns}
          data={aggregateCardsByYear(cardsBySet)}
          highlightOnHover
          theme="grey"
          noDataComponent={
            <NoDataMessage>
              There are no cards in your collection.
            </NoDataMessage>
          }
        />
      </Shared.DataTableContainer>
    </Shared.CollectionPageContainer>
  );
};

export default SelectYear;
