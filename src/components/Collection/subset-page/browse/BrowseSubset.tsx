import React from "react";

import DataTable from "react-data-table-component";
import columns from "./dataTableColumns";
import PageContainer from "../../../shared/PageContainer";
import * as Styled from "../styled";
import { NoDataMessage } from "../../../shared/NoDataMessage";
import { TotalCards } from "../../shared";
import { SeriesTableData } from "../createTableData";

interface Props {
  tableData: SeriesTableData;
  toggleDisableSeriesSelect(): void;
}
export default function BrowseSubset(props: Props) {
  return (
    <PageContainer>
      <Styled.PageTitle>Set Checklist</Styled.PageTitle>
      <Styled.TableHeader>
        <Styled.TableHeaderRow>
          <TotalCards totalCards={props.tableData.cards.length} />
        </Styled.TableHeaderRow>
      </Styled.TableHeader>
      <DataTable
        noHeader
        dense
        columns={columns()}
        data={props.tableData.cards}
        highlightOnHover
        pagination
        paginationPerPage={20}
        paginationRowsPerPageOptions={[10, 20, 30, 40, 50]}
        noDataComponent={
          <NoDataMessage>No cards belong to this set.</NoDataMessage>
        }
      />
    </PageContainer>
  );
}
