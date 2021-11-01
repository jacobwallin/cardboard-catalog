import React from "react";
import { useSelector } from "react-redux";
import { useParams, Redirect } from "react-router";
import { RootState } from "../../../store";
import DataTable from "react-data-table-component";
import { CollectionPageContainer } from "../../Collection/shared";
import dataTableColumns from "./dataTableColumns";
import DateTableHeader from "../../shared/DataTableHeader";
import { createLoadingSelector } from "../../../store/loading/reducer";
import { LoadingDots } from "../../shared/Loading";

const loadingSelector = createLoadingSelector(["GET_ALL_SETS"]);

export default function SelectSet() {
  // year url param
  const { year } = useParams();
  const sets = useSelector((state: RootState) => state.library.sets.allSets);
  const isLoading = useSelector((state: RootState) => loadingSelector(state));

  // render 404 if year param is not a year
  if (!/^\d{4}$/.test(year)) {
    return <Redirect to="/404" />;
  }

  return (
    <CollectionPageContainer>
      <DateTableHeader>{`Sets from ${year}`}</DateTableHeader>
      <DataTable
        noHeader
        data={sets.filter((set) => set.release_date.slice(0, 4) === year)}
        columns={dataTableColumns}
        progressPending={isLoading}
        progressComponent={<LoadingDots />}
        dense
        highlightOnHover
      />
    </CollectionPageContainer>
  );
}
