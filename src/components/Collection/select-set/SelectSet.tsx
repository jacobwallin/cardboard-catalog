import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Navigate } from "react-router-dom";
import { fetchCardsBySet } from "../../../store/collection/browse/thunks";
import { fetchLeagues } from "../../../store/library/leagues/thunks";
import { createLoadingSelector } from "../../../store/loading/reducer";
import { RootState } from "../../../store";
import DataTable from "react-data-table-component";
import {
  aggregateCollectionByYear,
  aggregateCollectionBySport,
} from "./aggregateSets";
import { sportsColumns, yearsColumns, setsColumns } from "./dataTableColumns";
import * as Shared from "../shared";
import PageContainer from "../../shared/PageContainer";
import { LoadingDots } from "../../shared/Loading";
import { NoDataMessage } from "../../shared/NoDataMessage";
import { SetCards } from "../../../store/collection/browse/types";
import { CollectionYears, CollectionSports } from "./aggregateSets";
import { TableHeader, TableTitle } from "../../shared/TableHeader";

const isLoadingSelector = createLoadingSelector([
  "GET_CARDS_BY_SET",
  "GET_ALL_LEAGUES",
]);

const SelectSet = () => {
  let { sport, year } = useParams();

  const sports = useSelector(
    (state: RootState) => state.library.leagues.allLeagues
  );
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
  const [filteredSets, setFilteredSets] = useState<SetCards[]>([]);
  const [yearsInCollection, setYearsInCollection] = useState<CollectionYears[]>(
    []
  );
  const [sportsInCollection, setSportsInCollection] = useState<
    CollectionSports[]
  >([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLeagues());
    // fetch collection data for user and friend if one is selected
    if (!initialDataLoadComplete) {
      dispatch(fetchCardsBySet());
    }
    if (collectionFriend.id !== 0) {
      dispatch(fetchCardsBySet(collectionFriend.id));
    }
  }, [initialDataLoadComplete, collectionFriend, dispatch]);

  // aggregate collection based on sport and year selected
  useEffect(() => {
    if (year) {
      // year is selected, display the sets in collection for given sport and year
      const setsYear = collectionSets.filter((s) => String(s.year) === year);
      setFilteredSets(setsYear);
      setTotalCards(
        setsYear.reduce((totalCards, set) => {
          return (totalCards += +set.totalCards);
        }, 0)
      );
    } else if (sport) {
      // sport is selected, display the years in collection that exist for given sport
      const selectedSport = sports.find((s) => s.name.toLowerCase() === sport);
      if (selectedSport) {
        const collectionByYearAndSport = aggregateCollectionByYear(
          collectionSets,
          selectedSport.id
        );
        setYearsInCollection(collectionByYearAndSport);
        setTotalCards(
          collectionByYearAndSport.reduce((totalCards, set) => {
            return (totalCards += +set.totalCards);
          }, 0)
        );
      }
    } else {
      // sport not selected, display the sports that exist in collection
      const collectionBySport = aggregateCollectionBySport(
        collectionSets,
        sports
      );
      console.log("WTF: ", collectionBySport);
      setSportsInCollection(collectionBySport);
      setTotalCards(
        collectionBySport.reduce((totalCards, set) => {
          return (totalCards += +set.totalCards);
        }, 0)
      );
    }
  }, [year, sport, sports, collectionSets]);

  if (isLoading) return <LoadingDots />;

  // render 404 if year param is not a year
  if (year && !/^\d{4}$/.test(year)) {
    return <Navigate to="/404" />;
  }

  return (
    <PageContainer>
      {year && sport && (
        <>
          <TableHeader>
            <TableTitle>{`Select Set`}</TableTitle>
            <Shared.TotalCards totalCards={totalCards} />
          </TableHeader>
          <DataTable
            progressPending={isLoading}
            columns={setsColumns}
            data={filteredSets}
            highlightOnHover
            theme="grey"
            dense
            pagination={filteredSets.length > 10}
            paginationRowsPerPageOptions={[10, 20, 30, 40, 50]}
            paginationPerPage={20}
            noDataComponent={
              <NoDataMessage>{`You have no cards from ${year}`}</NoDataMessage>
            }
          />
        </>
      )}
      {!year && sport && (
        <Shared.DataTableContainer>
          <TableHeader>
            <TableTitle>{`Select Set`}</TableTitle>
            <Shared.TotalCards totalCards={totalCards} />
          </TableHeader>
          <DataTable
            progressPending={isLoading}
            columns={yearsColumns(sport)}
            data={yearsInCollection}
            highlightOnHover
            theme="grey"
            dense
            pagination={yearsInCollection.length > 10}
            paginationRowsPerPageOptions={[10, 20, 30, 40, 50]}
            paginationPerPage={20}
            noDataComponent={
              <NoDataMessage>{`You have no cards from ${year}`}</NoDataMessage>
            }
          />
        </Shared.DataTableContainer>
      )}
      {!year && !sport && (
        <>
          <TableHeader>
            <TableTitle>{`Select Set`}</TableTitle>
            <Shared.TotalCards totalCards={totalCards} />
          </TableHeader>
          <DataTable
            dense
            columns={sportsColumns}
            data={sportsInCollection}
            highlightOnHover
            theme="grey"
            noDataComponent={
              <NoDataMessage>
                There are no cards in your collection.
              </NoDataMessage>
            }
            pagination={sportsInCollection.length > 10}
            paginationRowsPerPageOptions={[10, 20, 30, 40, 50]}
            paginationPerPage={20}
          />
        </>
      )}
    </PageContainer>
  );
};

export default SelectSet;
