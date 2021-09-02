import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, RouteComponentProps } from "react-router-dom";
import { fetchCardsBySet } from "../../../store/collection/thunks";
import { RootState } from "../../../store";
import { createLoadingSelector } from "../../../store/loading/reducer";
import DataTable from "react-data-table-component";
import { CollectionPageContainer, DataTableContainer } from "../shared";
import columns from "./dataTableColumns";

const isLoadingSelector = createLoadingSelector(["GET_CARDS_BY_SET"]);

type TParams = { year: string };

const customStyles = {
  rows: {
    style: {
      minHeight: "72px", // override the row height
    },
  },
};

const AllSetsPage: React.FC<RouteComponentProps<TParams>> = (props) => {
  const dispatch = useDispatch();

  const cardsBySet = useSelector(
    (state: RootState) => state.collection.cardsBySet
  );

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
      <h2>{`All Sets in ${props.match.params.year}`}</h2>
      <DataTableContainer>
        <DataTable
          noHeader
          progressPending={isLoading}
          columns={columns}
          data={cardsBySet.filter(
            (set) => set.year === +props.match.params.year
          )}
          highlightOnHover
        />
      </DataTableContainer>
    </CollectionPageContainer>
  );
};

export default AllSetsPage;
