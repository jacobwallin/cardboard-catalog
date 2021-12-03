import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { fetchAllPlayers } from "../../../store/library/players/thunks";
import AdminPageContainer from "../components/AdminPageContainer";
import EditFormHeader from "../components/EditFormHeader";
import { DataTableWrapper } from "../components/WrappedDataTable";
import DataTable from "react-data-table-component";
import columns from "./columns";
import StyledButton from "../components/StyledButton";
import { Player } from "../../../store/library/players/types";
import { ReactComponent as XIcon } from "../components/modal/close.svg";
import PlayerModal from "./PlayerModal";
import * as Styled from "./styled";

export default function AdminPlayer() {
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [filteredPlayers, setFilteredPlayers] = useState<Player[]>([]);
  const [showPlayerModal, setShowPlayerModal] = useState(false);
  const [playerToEdit, setPlayerToEdit] = useState<Player | undefined>(
    undefined
  );

  const players = useSelector((state: RootState) => state.library.players);

  useEffect(() => {
    dispatch(fetchAllPlayers());
  }, []);

  useEffect(() => {
    setFilteredPlayers(
      players.filter((p) => {
        return p.name.toLowerCase().includes(filter);
      })
    );
  }, [filter, players]);

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
    if (e.target.value === "") setFilter("");
  }

  function handleFilterChange(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();
    setFilter(search);
  }

  function clearSearch() {
    setSearch("");
    setFilter("");
  }

  function closePlayerModal() {
    setPlayerToEdit(undefined);
    setShowPlayerModal(false);
  }
  function openPlayerModal() {
    setShowPlayerModal(true);
  }

  function editPlayer(p: Player) {
    setPlayerToEdit(p);
  }

  return (
    <AdminPageContainer>
      {showPlayerModal && <PlayerModal dismiss={closePlayerModal} />}
      {playerToEdit && (
        <PlayerModal dismiss={closePlayerModal} editPlayer={playerToEdit} />
      )}
      <EditFormHeader text="Manage Player Library" />
      <DataTableWrapper>
        <Styled.AddButtonWrapper>
          <StyledButton
            color="GREEN"
            width="125px"
            height="27px"
            onClick={openPlayerModal}
          >
            Add Player
          </StyledButton>
        </Styled.AddButtonWrapper>
        <DataTable
          title={`Players`}
          actions={
            <form>
              <Styled.SearchContainer>
                <Styled.Search
                  type="text"
                  placeholder="search for player"
                  value={search}
                  onChange={handleSearchChange}
                />
                <StyledButton
                  color="BLUE"
                  width="50px"
                  height="30px"
                  fontSize=".85rem"
                  type="submit"
                  onClick={handleFilterChange}
                >
                  Search
                </StyledButton>
                <Styled.ClearSearch onClick={clearSearch}>
                  <XIcon />
                </Styled.ClearSearch>
              </Styled.SearchContainer>
            </form>
          }
          data={filteredPlayers}
          columns={columns(editPlayer)}
          dense
          pagination
          paginationPerPage={20}
          highlightOnHover
        />
      </DataTableWrapper>
    </AdminPageContainer>
  );
}
