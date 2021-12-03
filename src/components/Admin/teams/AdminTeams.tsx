import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { fetchTeamsByLeague } from "../../../store/library/teams/thunks";
import { Team } from "../../../store/library/teams/types";
import AdminPageContainer from "../components/AdminPageContainer";
import EditFormHeader from "../components/EditFormHeader";
import { DataTableWrapper } from "../components/WrappedDataTable";
import DataTable from "react-data-table-component";
import columns from "./columns";
import StyledButton from "../components/StyledButton";

export default function AdminTeams() {
  const dispatch = useDispatch();

  const [leagueId, setLeagueId] = useState(1);

  const teams = useSelector((state: RootState) => state.library.teams);

  useEffect(() => {
    if (leagueId !== 0) {
      dispatch(fetchTeamsByLeague(leagueId));
    }
  }, [leagueId, dispatch]);

  function editTeam(t: Team) {}

  return (
    <AdminPageContainer>
      <EditFormHeader text="Manage Teams" />
      <DataTableWrapper>
        <DataTable
          title="Teams"
          actions={
            <StyledButton
              color="GREEN"
              width="125px"
              height="30px"
              fontSize=".9rem"
            >
              Add Team
            </StyledButton>
          }
          data={teams}
          columns={columns(editTeam)}
          dense
          pagination
          paginationPerPage={20}
          highlightOnHover
        />
      </DataTableWrapper>
    </AdminPageContainer>
  );
}
