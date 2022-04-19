import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import { RootState } from "../../../store";
import { fetchCardsBySubset } from "../../../store/collection/browse/thunks";
import { fetchSet } from "../../../store/library/sets/thunks";
import { createLoadingSelector } from "../../../store/loading/reducer";
import DataTable from "react-data-table-component";
import columns from "./dataTableColumns";
import * as Shared from "../shared";
import PageContainer from "../../shared/PageContainer";
import CollectionWrapper from "../../shared/CollectionWrapper";
import CollectionContainer from "../../shared/CollectionContainer";
import PageHeader from "../../shared/PageHeader";
import { LoadingDots } from "../../shared/Loading";
import Breadcrumbs from "../../breadcrumbs/Breadcrumbs";
import aggregateSubsetData, {
  AggregatedSubsetData,
} from "./aggregateSubsetData";

const loadingSelector = createLoadingSelector([
  "GET_SINGLE_SET",
  "GET_CARDS_BY_SUBSET",
]);

const SetPage = () => {
  const dispatch = useDispatch();
  let { setId } = useParams<"setId">();
  let { search } = useLocation();
  const isLoading = useSelector((state: RootState) => loadingSelector(state));
  const cardsBySubset = useSelector(
    (state: RootState) => state.collection.browse.cardsBySubset
  );
  const set = useSelector((state: RootState) => state.library.sets.set);

  const [aggregatedSubsetData, setAggregatedSubsetData] = useState<
    AggregatedSubsetData | undefined
  >(undefined);

  useEffect(() => {
    if (setId) {
      dispatch(fetchCardsBySubset(+setId));
      dispatch(fetchSet(+setId));
    }
  }, []);

  useEffect(() => {
    if (!isLoading && set.id !== 0 && cardsBySubset.setId !== 0) {
      setAggregatedSubsetData(
        aggregateSubsetData(
          set.subsets,
          cardsBySubset.subsets,
          set.baseSubsetId ? set.baseSubsetId : 0
        )
      );
    }
  }, [cardsBySubset, set, isLoading]);

  if (isLoading || !setId || +setId !== set.id)
    return (
      <CollectionWrapper>
        <CollectionContainer>
          <LoadingDots />
        </CollectionContainer>
      </CollectionWrapper>
    );

  return (
    <CollectionWrapper>
      <CollectionContainer>
        <Breadcrumbs />
        <PageHeader title={set.name} />
        <PageContainer>
          {set.description !== "" && (
            <Shared.ContentContainer>
              <Shared.ContentTitle>About:</Shared.ContentTitle>
              <Shared.ContentData>{set.description}</Shared.ContentData>
            </Shared.ContentContainer>
          )}
          {set.release_date && (
            <Shared.ContentContainer>
              <Shared.ContentTitle>Release Date:</Shared.ContentTitle>
              <Shared.ContentData>{set.release_date}</Shared.ContentData>
            </Shared.ContentContainer>
          )}

          <Shared.CollectionData
            totalCards={cardsBySubset.subsets.reduce((totalCards, subset) => {
              return (totalCards += +subset.totalCards);
            }, 0)}
          />

          {aggregatedSubsetData && (
            <>
              <Shared.DataTableHeader>{`Base Set`}</Shared.DataTableHeader>
              <Shared.DataTableContainer>
                <DataTable
                  noHeader
                  dense
                  progressPending={isLoading}
                  columns={columns(
                    cardsBySubset.subsets.length === 0,
                    search.slice(search.length - 4) === "coll"
                  )}
                  data={
                    aggregatedSubsetData.base ? [aggregatedSubsetData.base] : []
                  }
                  highlightOnHover
                />
              </Shared.DataTableContainer>
              {aggregatedSubsetData.shortPrints.length > 0 && (
                <>
                  <Shared.DataTableHeader>{`Short Prints`}</Shared.DataTableHeader>
                  <Shared.DataTableContainer>
                    <DataTable
                      noHeader
                      dense
                      progressPending={isLoading}
                      columns={columns(
                        cardsBySubset.subsets.length === 0,
                        search.slice(search.length - 4) === "coll"
                      )}
                      data={aggregatedSubsetData.shortPrints}
                      highlightOnHover
                    />
                  </Shared.DataTableContainer>
                </>
              )}
              {aggregatedSubsetData.inserts.length > 0 && (
                <>
                  <Shared.DataTableHeader>{`Inserts`}</Shared.DataTableHeader>
                  <Shared.DataTableContainer>
                    <DataTable
                      noHeader
                      dense
                      progressPending={isLoading}
                      columns={columns(
                        cardsBySubset.subsets.length === 0,
                        search.slice(search.length - 4) === "coll"
                      )}
                      data={aggregatedSubsetData.inserts}
                      highlightOnHover
                      pagination
                      paginationRowsPerPageOptions={[10, 20, 30, 40, 50]}
                      paginationPerPage={10}
                    />
                  </Shared.DataTableContainer>
                </>
              )}
              {aggregatedSubsetData.autoRelic.length > 0 && (
                <>
                  <Shared.DataTableHeader>{`Autograph & Relic Sets`}</Shared.DataTableHeader>
                  <Shared.DataTableContainer>
                    <DataTable
                      noHeader
                      dense
                      progressPending={isLoading}
                      columns={columns(
                        cardsBySubset.subsets.length === 0,
                        search.slice(search.length - 4) === "coll"
                      )}
                      data={aggregatedSubsetData.autoRelic}
                      highlightOnHover
                      pagination
                      paginationRowsPerPageOptions={[10, 20, 30, 40, 50]}
                      paginationPerPage={10}
                    />
                  </Shared.DataTableContainer>
                </>
              )}
            </>
          )}
        </PageContainer>
      </CollectionContainer>
    </CollectionWrapper>
  );
};

export default SetPage;
