import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import DataTable from "react-data-table-component";
import dataTableColumns from "./dataTableColumns";
import aggregateByYear from "./aggregateByYear";
import { CollectionPageContainer } from "../../Collection/shared";
import DateTableTitle from "../../shared/DataTableTitle";

export default function SelectYear() {
  const sets = useSelector((state: RootState) => state.library.sets.allSets);

  const tableData = aggregateByYear(sets);

  console.log(tableData);

  return (
    <CollectionPageContainer>
      <DateTableTitle>Select Year</DateTableTitle>
      <DataTable
        noHeader
        data={aggregateByYear(sets)}
        columns={dataTableColumns}
        dense
        highlightOnHover
      />
    </CollectionPageContainer>
  );
}
