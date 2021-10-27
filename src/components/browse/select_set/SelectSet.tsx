import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { RootState } from "../../../store";
import DataTable from "react-data-table-component";
import { CollectionPageContainer } from "../../Collection/shared";
import dataTableColumns from "./dataTableColumns";
import DateTableHeader from "../../shared/DataTableHeader";

export default function SelectSet() {
  // year url param
  const { year } = useParams();
  const sets = useSelector((state: RootState) => state.library.sets.allSets);

  return (
    <CollectionPageContainer>
      <DateTableHeader>{`Sets from ${year}`}</DateTableHeader>
      <DataTable
        noHeader
        data={sets.filter((set) => set.release_date.slice(0, 4) === year)}
        columns={dataTableColumns}
        dense
        highlightOnHover
      />
    </CollectionPageContainer>
  );
}
