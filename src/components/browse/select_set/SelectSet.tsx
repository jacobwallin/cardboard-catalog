import React from "react";
import { useSelector } from "react-redux";
import { useParams, Navigate } from "react-router-dom";
import { RootState } from "../../../store";
import DataTable from "react-data-table-component";
import PageContainer from "../../shared/PageContainer";
import dataTableColumns from "./dataTableColumns";
import DateTableHeader from "../../shared/DataTableHeader";
import { createLoadingSelector } from "../../../store/loading/reducer";
import { LoadingDots } from "../../shared/Loading";

const loadingSelector = createLoadingSelector(["GET_ALL_SETS"]);

export default function SelectSet() {
  const { year } = useParams<"year">();
  const sets = useSelector((state: RootState) => state.library.sets.allSets);
  const isLoading = useSelector((state: RootState) => loadingSelector(state));

  // render 404 if year param is not a year
  if (!year || !/^\d{4}$/.test(year)) {
    return <Navigate to="/404" />;
  }

  return (
    <PageContainer>
      <DateTableHeader>{`Sets from ${year}`}</DateTableHeader>
      <DataTable
        noHeader
        data={sets.filter((set) => set.year === +year)}
        columns={dataTableColumns}
        progressPending={isLoading}
        progressComponent={<LoadingDots />}
        dense
        highlightOnHover
        pagination
        paginationRowsPerPageOptions={[10, 20, 30, 40, 50]}
        paginationPerPage={20}
      />
    </PageContainer>
  );
}
