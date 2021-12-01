import React from "react";
import styled from "styled-components";
import DataTable from "react-data-table-component";

export const DataTableWrapper = styled.div`
  width: 100%;
  margin: 10px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
`;

export default function WrappedDataTable(props: any) {
  return (
    <DataTableWrapper>
      <DataTable {...props} />
    </DataTableWrapper>
  );
}
