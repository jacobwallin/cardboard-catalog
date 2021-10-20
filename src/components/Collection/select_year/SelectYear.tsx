import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCardsBySet } from "../../../store/collection/browse/thunks";
import { createLoadingSelector } from "../../../store/loading/reducer";
import { RootState } from "../../../store";
import DataTable from "react-data-table-component";
import { aggregateCardsByYear } from "./aggregateCards";
import columns from "./dataTableColumns";
import {
  DataTableContainer,
  CollectionPageContainer,
  CollectionData,
  DataTableTitle,
} from "../shared";
import { customStyles } from "../shared/dataTableStyles";

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

  return (
    <CollectionPageContainer>
      <CollectionData
        totalCards={cardsBySet.reduce((total, set) => {
          return (total += +set.totalCards);
        }, 0)}
        distinctCards={cardsBySet.reduce((total, set) => {
          return (total += +set.distinctCards);
        }, 0)}
      />
      <DataTableTitle>{`Your Cards by Year`}</DataTableTitle>
      <DataTableContainer>
        <DataTable
          noHeader
          progressPending={isLoading}
          columns={columns}
          data={aggregateCardsByYear(cardsBySet)}
          highlightOnHover
          theme="grey"
          customStyles={customStyles}
          dense
        />
      </DataTableContainer>
    </CollectionPageContainer>
  );
};

export default SelectYear;
