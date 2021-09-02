import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { RootState } from "../../../store";
import { fetchCardsBySubset } from "../../../store/collection/thunks";
import { fetchSet } from "../../../store/library/sets/thunks";
import { createLoadingSelector } from "../../../store/loading/reducer";
import DataTable from "react-data-table-component";
import columns from "./dataTableColumns";
import { CollectionPageContainer, DataTableContainer } from "../shared";
import ContentContainer from "./ContentContainer";

const loadingSelector = createLoadingSelector([
  "GET_SINGLE_SET",
  "GET_CARDS_BY_SUBSET",
]);

type TParams = {
  setId: string;
};

const SetPage = (props: RouteComponentProps<TParams>) => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state: RootState) => loadingSelector(state));
  const cardsBySubset = useSelector(
    (state: RootState) => state.collection.cardsBySubset
  );
  const singleSet = useSelector(
    (state: RootState) => state.library.sets.singleSet
  );
  const setId = +props.match.params.setId;

  useEffect(() => {
    dispatch(fetchCardsBySubset(setId));
    dispatch(fetchSet(setId));
  }, []);

  if (isLoading) {
    return <h1>LOADING</h1>;
  }

  return (
    <CollectionPageContainer>
      <h2>{singleSet.name}</h2>
      <ContentContainer>
        <h4>About:</h4>
        {singleSet.description}
      </ContentContainer>
      <DataTableContainer>
        <DataTable
          noHeader
          progressPending={isLoading}
          columns={columns}
          data={singleSet.subsets.map((subset) => {
            const collectionSubsetData = cardsBySubset.subsets.find(
              (collectionSubset) => subset.id === collectionSubset.subsetId
            );
            return {
              name: subset.name,
              id: subset.id,
              totalCards: collectionSubsetData
                ? collectionSubsetData.totalCards
                : 0,
              distinctCards: collectionSubsetData
                ? collectionSubsetData.distinctCards
                : 0,
            };
          })}
          highlightOnHover
        />
      </DataTableContainer>
    </CollectionPageContainer>
  );
};

export default SetPage;
