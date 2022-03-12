import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import DataTable from "react-data-table-component";
import dataTableColumns from "./dataTableColumns";
import aggregateByYear from "./aggregateByYear";
import PageContainer from "../../shared/PageContainer";
import DateTableHeader from "../../shared/DataTableHeader";
import { createLoadingSelector } from "../../../store/loading/reducer";
import { LoadingDots } from "../../shared/Loading";

const loadingSelector = createLoadingSelector(["GET_ALL_SETS"]);

export default function SelectYear() {
  const sets = useSelector((state: RootState) => state.library.sets.allSets);
  const isLoading = useSelector((state: RootState) => loadingSelector(state));

  return (
    <PageContainer>
      <DateTableHeader>Select Year</DateTableHeader>
      <DataTable
        noHeader
        data={aggregateByYear(sets)}
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
