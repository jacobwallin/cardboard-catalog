import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { RootState } from "../../../store";
import { fetchCardsBySubset } from "../../../store/collection/browse/thunks";
import { fetchSet } from "../../../store/library/sets/thunks";
import { createLoadingSelector } from "../../../store/loading/reducer";
import DataTable from "react-data-table-component";
import columns from "./dataTableColumns";
import * as Shared from "../shared";
import CollectionWrapper from "../../shared/CollectionWrapper";
import CollectionContainer from "../../shared/CollectionContainer";
import SetHeader from "../header/SetHeader";

const loadingSelector = createLoadingSelector(["GET_SINGLE_SET", "GET_CARDS_BY_SUBSET"]);

type TParams = {
  setId: string;
};

const SetPage = (props: RouteComponentProps<TParams>) => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state: RootState) => loadingSelector(state));
  const cardsBySubset = useSelector((state: RootState) => state.collection.browse.cardsBySubset);
  const singleSet = useSelector((state: RootState) => state.library.sets.singleSet);
  const setId = +props.match.params.setId;

  useEffect(() => {
    dispatch(fetchCardsBySubset(setId));
    dispatch(fetchSet(setId));
  }, []);

  return (
    <CollectionWrapper>
      <CollectionContainer>
        <SetHeader title={singleSet.name} />
        <Shared.CollectionPageContainer>
          {singleSet.description !== "" && (
            <Shared.ContentContainer>
              <Shared.ContentTitle>About:</Shared.ContentTitle>
              <Shared.ContentData>{singleSet.description}</Shared.ContentData>
            </Shared.ContentContainer>
          )}
          <Shared.ContentContainer>
            <Shared.ContentTitle>Release Date:</Shared.ContentTitle>
            <Shared.ContentData>{singleSet.release_date}</Shared.ContentData>
          </Shared.ContentContainer>

          <Shared.CollectionData
            totalCards={cardsBySubset.subsets.reduce((totalCards, subset) => {
              return (totalCards += +subset.totalCards);
            }, 0)}
          />

          <Shared.DataTableTitle>{`Base Set`}</Shared.DataTableTitle>
          <Shared.DataTableContainer>
            <DataTable
              noHeader
              dense
              progressPending={isLoading}
              columns={columns(cardsBySubset.subsets.length === 0)}
              data={singleSet.subsets
                .filter((subset) => {
                  return subset.id === singleSet.baseSubsetId;
                })
                .map((subset) => {
                  const collectionSubsetData = cardsBySubset.subsets.find(
                    (collectionSubset) => subset.id === collectionSubset.subsetId
                  );
                  return {
                    name: subset.name,
                    id: subset.id,
                    totalCards: collectionSubsetData ? collectionSubsetData.totalCards : 0,
                    distinctCards: collectionSubsetData ? collectionSubsetData.distinctCards : 0,
                  };
                })}
              highlightOnHover
            />
          </Shared.DataTableContainer>
          <Shared.DataTableTitle>{`Inserts and Other Sets`}</Shared.DataTableTitle>
          <Shared.DataTableContainer>
            <DataTable
              noHeader
              dense
              progressPending={isLoading}
              columns={columns(cardsBySubset.subsets.length === 0)}
              data={singleSet.subsets
                .filter((subset) => {
                  return subset.id !== singleSet.baseSubsetId;
                })
                .sort((a, b) => {
                  if (a.name < b.name) return -1;
                  if (a.name > b.name) return 1;
                  return 0;
                })
                .map((subset) => {
                  const collectionSubsetData = cardsBySubset.subsets.find(
                    (collectionSubset) => subset.id === collectionSubset.subsetId
                  );
                  return {
                    name: subset.name,
                    id: subset.id,
                    totalCards: collectionSubsetData ? collectionSubsetData.totalCards : 0,
                    distinctCards: collectionSubsetData ? collectionSubsetData.distinctCards : 0,
                  };
                })}
              highlightOnHover
            />
          </Shared.DataTableContainer>
        </Shared.CollectionPageContainer>
      </CollectionContainer>
    </CollectionWrapper>
  );
};

export default SetPage;
