import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Navigate } from "react-router-dom";
import { fetchCardsBySet } from "../../../store/collection/browse/thunks";
import { createLoadingSelector } from "../../../store/loading/reducer";
import { RootState } from "../../../store";
import DataTable from "react-data-table-component";
import { aggregateCardsByYear } from "./aggregateCards";
import { allSetsColumns, yearColumns } from "./dataTableColumns";
import * as Shared from "../shared";
import PageContainer from "../../shared/PageContainer";
import { LoadingDots } from "../../shared/Loading";
import { NoDataMessage } from "../../shared/NoDataMessage";
import { SetCards } from "../../../store/collection/browse/types";
import { TableData } from "./aggregateCards";

const isLoadingSelector = createLoadingSelector(["GET_CARDS_BY_SET"]);

const SelectSet = () => {
  let { year } = useParams<"year">();

  const collectionSets = useSelector(
    (state: RootState) => state.collection.browse.cardsBySet
  );
  const collectionFriend = useSelector(
    (state: RootState) => state.collection.browse.friend
  );
  const isLoading = useSelector((state: RootState) => isLoadingSelector(state));
  const initialDataLoadComplete = useSelector(
    (state: RootState) => state.collection.browse.initialDataLoadComplete
  );

  const [totalCards, setTotalCards] = useState(0);
  const [totalCardsInYear, setTotalCardsInYear] = useState(0);
  const [setsInYear, setSetsInYear] = useState<SetCards[]>([]);
  const [collectionYears, setCollectionYears] = useState<TableData[]>([]);

  const dispatch = useDispatch();

  useEffect(() => {
    // fetch collection data for user and friend if one is selected
    if (!initialDataLoadComplete) {
      dispatch(fetchCardsBySet());
    }
    if (collectionFriend.id !== 0) {
      dispatch(fetchCardsBySet(collectionFriend.id));
    }
  }, [initialDataLoadComplete, dispatch, collectionFriend]);

  useEffect(() => {
    setCollectionYears(aggregateCardsByYear(collectionSets));
    setTotalCards(
      collectionSets.reduce((total, set) => {
        return (total += +set.totalCards);
      }, 0)
    );
  }, [collectionSets]);

  useEffect(() => {
    if (year) {
      const setsYear = collectionSets.filter((s) => String(s.year) === year);
      setSetsInYear(setsYear);
      setTotalCardsInYear(
        setsYear.reduce((totalCards, set) => {
          return (totalCards += +set.totalCards);
        }, 0)
      );
    }
  }, [year, collectionSets, setsInYear]);

  if (isLoading) return <LoadingDots />;

  // render 404 if year param is not a year
  if (year && !/^\d{4}$/.test(year)) {
    return <Navigate to="/404" />;
  }

  return (
    <PageContainer>
      {!year && (
        <Shared.DataTableContainer>
          <DataTable
            dense
            title={<Shared.DataTableTitle>Select Year</Shared.DataTableTitle>}
            actions={<Shared.TotalCards totalCards={totalCards} />}
            columns={allSetsColumns}
            data={collectionYears}
            highlightOnHover
            theme="grey"
            noDataComponent={
              <NoDataMessage>
                There are no cards in your collection.
              </NoDataMessage>
            }
            pagination={collectionYears.length > 10}
            paginationRowsPerPageOptions={[10, 20, 30, 40, 50]}
            paginationPerPage={20}
          />
        </Shared.DataTableContainer>
      )}
      {year && (
        <Shared.DataTableContainer>
          <DataTable
            title={
              <Shared.DataTableTitle>{`Sets from ${year}`}</Shared.DataTableTitle>
            }
            actions={<Shared.TotalCards totalCards={totalCardsInYear} />}
            progressPending={isLoading}
            columns={yearColumns}
            data={setsInYear}
            highlightOnHover
            theme="grey"
            dense
            pagination={setsInYear.length > 10}
            paginationRowsPerPageOptions={[10, 20, 30, 40, 50]}
            paginationPerPage={20}
            noDataComponent={
              <NoDataMessage>{`You have no cards from ${year}`}</NoDataMessage>
            }
          />
        </Shared.DataTableContainer>
      )}
    </PageContainer>
  );
};

export default SelectSet;
