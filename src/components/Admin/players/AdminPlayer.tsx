import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { fetchAllPlayers } from "../../../store/library/players/thunks";
import AdminPageContainer from "../components/AdminPageContainer";
import EditFormHeader from "../components/EditFormHeader";
import { DataTableWrapper } from "../components/WrappedDataTable";
import DataTable from "react-data-table-component";
import columns from "./columns";

export default function AdminPlayer() {
  const dispatch = useDispatch();

  const players = useSelector((state: RootState) => state.library.players);

  useEffect(() => {
    dispatch(fetchAllPlayers());
  }, []);

  return (
    <AdminPageContainer>
      <EditFormHeader text="Manage Player Library" />
      <DataTableWrapper>
        <DataTable
          title={`Players`}
          data={players}
          columns={columns}
          dense
          pagination
        />
      </DataTableWrapper>
    </AdminPageContainer>
  );
}
