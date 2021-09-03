import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { fetchCardsBySet } from "../../../store/collection/thunks";
import { RootState } from "../../../store";
import { createLoadingSelector } from "../../../store/loading/reducer";
import DataTable from "react-data-table-component";
import {
  CollectionPageContainer,
  DataTableContainer,
  DataTableTitle,
  CollectionData,
} from "../shared";
import columns from "./dataTableColumns";
import { customStyles } from "../shared/dataTableStyles";

const isLoadingSelector = createLoadingSelector(["GET_CARDS_BY_SET"]);

type TParams = { year: string };

const AllSetsPage: React.FC<RouteComponentProps<TParams>> = (props) => {
  const dispatch = useDispatch();

  const cardsBySetForYear = useSelector(
    (state: RootState) => state.collection.cardsBySet
  ).filter((set) => set.year === +props.match.params.year);

  const isLoading = useSelector((state: RootState) => isLoadingSelector(state));
  const initialDataLoadComplete = useSelector(
    (state: RootState) => state.collection.initialDataLoadComplete
  );

  useEffect(() => {
    if (!initialDataLoadComplete) {
      dispatch(fetchCardsBySet());
    }
  }, []);

  return (
    <CollectionPageContainer>
      <CollectionData
        totalCards={cardsBySetForYear.reduce((totalCards, set) => {
          return (totalCards += +set.totalCards);
        }, 0)}
        distinctCards={cardsBySetForYear.reduce((totalCards, set) => {
          return (totalCards += +set.distinctCards);
        }, 0)}
      />
      <DataTableTitle>{`Your Sets from ${props.match.params.year}`}</DataTableTitle>
      <DataTableContainer>
        <DataTable
          noHeader
          progressPending={isLoading}
          columns={columns}
          data={cardsBySetForYear}
          highlightOnHover
          theme="grey"
          customStyles={customStyles}
        />
      </DataTableContainer>
    </CollectionPageContainer>
  );
};

export default AllSetsPage;
