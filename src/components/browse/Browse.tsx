import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useParams, Navigate } from "react-router-dom";
import PageHeader from "../shared/PageHeader";
import CollectionWrapper from "../shared/CollectionWrapper";
import CollectionContainer from "../shared/CollectionContainer";
import Breadcrumbs from "../breadcrumbs/Breadcrumbs";
import { RootState } from "../../store";
import { fetchAllSetData } from "../../store/library/sets/thunks";
import { fetchLeagues } from "../../store/library/leagues/thunks";
import DataTable from "react-data-table-component";
import { sportColumns, yearColumns, setColumns } from "./dataTableColumns";
import aggregateByYear from "./aggregateByYear";
import PageContainer from "../shared/PageContainer";
import DateTableHeader from "../shared/DataTableHeader";
import { createLoadingSelector } from "../../store/loading/reducer";
import { LoadingDots } from "../shared/Loading";

const loadingSelector = createLoadingSelector([
  "GET_ALL_LEAGUES",
  "GET_ALL_SETS",
]);

export default function Browse() {
  const dispatch = useDispatch();
  const { sport, year } = useParams();

  const sets = useSelector(
    (state: RootState) => state.library.sets.allSets.rows
  );
  const sports = useSelector(
    (state: RootState) => state.library.leagues.allLeagues
  );
  const isLoading = useSelector((state: RootState) => loadingSelector(state));

  useEffect(() => {
    dispatch(fetchLeagues());
  }, [dispatch]);

  useEffect(() => {
    if (sport) {
      // find selected sport by name
      const selectedSport = sports.find((s) => s.name.toLowerCase() === sport);

      // if sport is found, fetch sets by sport id
      if (selectedSport) {
        dispatch(fetchAllSetData(`sportId=${selectedSport.id}`));
      }
    }
  }, [sport, sports, dispatch]);

  // render 404 if sport does not exist
  // if (!isLoading || !/^\d{4}$/.test(sport)) {
  //   return <Navigate to="/404" />;
  // }

  return (
    <CollectionWrapper>
      <CollectionContainer>
        <Breadcrumbs />
        <PageHeader title="Browse Catalogue" />
        <PageContainer>
          {year && sport && (
            <>
              <DateTableHeader>{`Sets from ${year}`}</DateTableHeader>
              <DataTable
                noHeader
                data={sets.filter((set) => set.year === +year)}
                columns={setColumns}
                progressPending={isLoading}
                progressComponent={<LoadingDots />}
                dense
                highlightOnHover
                pagination
                paginationRowsPerPageOptions={[10, 20, 30, 40, 50]}
                paginationPerPage={20}
              />
            </>
          )}

          {!year && sport && (
            <>
              <DateTableHeader>Select Year</DateTableHeader>
              <DataTable
                noHeader
                data={aggregateByYear(sets)}
                columns={yearColumns}
                progressPending={isLoading}
                progressComponent={<LoadingDots />}
                dense
                highlightOnHover
                pagination
                paginationRowsPerPageOptions={[10, 20, 30, 40, 50]}
                paginationPerPage={20}
              />
            </>
          )}

          {!year && !sport && (
            <>
              <DateTableHeader>Select Sport</DateTableHeader>
              <DataTable
                noHeader
                data={sports.sort((a, b) => {
                  if (a.name > b.name) return 1;
                  return -1;
                })}
                columns={sportColumns}
                progressPending={isLoading}
                progressComponent={<LoadingDots />}
                dense
                highlightOnHover
              />
            </>
          )}
        </PageContainer>
      </CollectionContainer>
    </CollectionWrapper>
  );
}
