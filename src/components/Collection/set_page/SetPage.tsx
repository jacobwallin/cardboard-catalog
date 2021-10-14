import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { RootState } from "../../../store";
import { fetchCardsBySubset } from "../../../store/collection/browse/thunks";
import { fetchSet } from "../../../store/library/sets/thunks";
import { createLoadingSelector } from "../../../store/loading/reducer";
import DataTable from "react-data-table-component";
import columns from "./dataTableColumns";
import {
  CollectionPageContainer,
  DataTableContainer,
  ContentContainer,
  DataTableTitle,
  CollectionData,
} from "../shared";
import CollectionWrapper from "../CollectionWrapper";
import CollectionContainer from "../CollectionContainer";

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
    (state: RootState) => state.collection.browse.cardsBySubset
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
    <CollectionWrapper>
      <CollectionContainer>
        <CollectionPageContainer>
          <h2>{singleSet.name}</h2>
          <ContentContainer>
            <h4>About:</h4>
            {singleSet.description}
          </ContentContainer>
          <CollectionData
            totalCards={cardsBySubset.subsets.reduce((totalCards, subset) => {
              return (totalCards += +subset.totalCards);
            }, 0)}
            distinctCards={cardsBySubset.subsets.reduce(
              (totalCards, subset) => {
                return (totalCards += +subset.distinctCards);
              },
              0
            )}
          />
          <DataTableTitle>{`Subsets in ${singleSet.name}`}</DataTableTitle>
          <DataTableContainer>
            <DataTable
              noHeader
              dense
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
      </CollectionContainer>
    </CollectionWrapper>
  );
};

export default SetPage;
