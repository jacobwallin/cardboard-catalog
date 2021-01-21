import React from "react";
import styled from "styled-components";
import DataTable from "react-data-table-component";

const DataTableWrapper = styled.div`
  max-width: 1200px;
  margin: 10px;
`;

export default function WrappedDataTable(props: any) {
  return (
    <DataTableWrapper>
      <DataTable {...props} />
    </DataTableWrapper>
  );
}
