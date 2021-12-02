import React from "react";
import AdminPageContainer from "../components/AdminPageContainer";
import EditFormHeader from "../components/EditFormHeader";
import { DataTableWrapper } from "../components/WrappedDataTable";
import DataTable from "react-data-table-component";

export default function AdminTeams() {
  return (
    <AdminPageContainer>
      <EditFormHeader text="Manage Teams" />
    </AdminPageContainer>
  );
}
