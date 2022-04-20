import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { fetchTeamsByLeague } from "../../../store/library/teams/thunks";
import { fetchLeagues } from "../../../store/library/leagues/thunks";
import { Team } from "../../../store/library/teams/types";
import AdminPageContainer from "../components/AdminPageContainer";
import * as DataTableComponents from "../components/DataTableComponents";
import DataTable from "react-data-table-component";
import columns from "./columns";
import StyledButton from "../components/StyledButton";
import * as Styled from "./styled";
import TeamModal from "./TeamModal";
import { Header } from "../components/PageHeader";

export default function AdminTeams() {
  const dispatch = useDispatch();

  const [leagueId, setLeagueId] = useState(0);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [teamToEdit, setTeamToEdit] = useState<Team | undefined>(undefined);

  const teams = useSelector((state: RootState) => state.library.teams);
  const leagues = useSelector(
    (state: RootState) => state.library.leagues.allLeagues
  );

  useEffect(() => {
    dispatch(fetchLeagues());
  }, []);

  useEffect(() => {
    if (leagueId !== 0) {
      dispatch(fetchTeamsByLeague(leagueId));
    }
  }, [leagueId, dispatch]);

  function leagueIdChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setLeagueId(+e.target.value);
  }

  function editTeam(t: Team) {
    setTeamToEdit(t);
  }

  function closeCreateModal() {
    setShowCreateModal(false);
    setTeamToEdit(undefined);
  }

  function openCreateModal() {
    setShowCreateModal(true);
  }

  return (
    <AdminPageContainer>
      {showCreateModal && (
        <TeamModal dismiss={closeCreateModal} leagueId={leagueId} />
      )}
      {teamToEdit && (
        <TeamModal
          dismiss={closeCreateModal}
          editTeam={teamToEdit}
          leagueId={leagueId}
        />
      )}
      <Header>MANAGE TEAMS</Header>
      <DataTableComponents.DataTableWrapper>
        <Styled.SelectLeague value={leagueId} onChange={leagueIdChange}>
          <option value={0}>Select League</option>
          {leagues.map((l) => {
            return (
              <option key={l.id} value={l.id}>
                {l.name}
              </option>
            );
          })}
        </Styled.SelectLeague>
        <DataTableComponents.DataTableHeader>
          <DataTableComponents.DataTableTitle>
            Teams
          </DataTableComponents.DataTableTitle>
          <DataTableComponents.DataTableButtonsContainer>
            <Styled.AddButtonWrapper>
              <StyledButton
                color="GREEN"
                width="125px"
                height="27px"
                fontSize=".9rem"
                disabled={leagueId === 0}
                onClick={openCreateModal}
              >
                Add Team
              </StyledButton>
            </Styled.AddButtonWrapper>
          </DataTableComponents.DataTableButtonsContainer>
        </DataTableComponents.DataTableHeader>
        <DataTable
          noHeader
          data={teams}
          columns={columns(editTeam)}
          dense
          pagination
          paginationPerPage={20}
          highlightOnHover
        />
      </DataTableComponents.DataTableWrapper>
    </AdminPageContainer>
  );
}
