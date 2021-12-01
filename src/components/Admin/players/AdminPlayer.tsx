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
import * as Styled from "./styled";

export default function AdminPlayer() {
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [filteredPlayers, setFilteredPlayers] = useState<Player[]>([]);

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
  }

  function handleFilterChange() {
    setFilter(search);
  }

  return (
    <AdminPageContainer>
      <EditFormHeader text="Manage Player Library" />

      <DataTableWrapper>
        <DataTable
          title={`Players`}
          actions={
            <Styled.SearchContainer>
              <Styled.Search
                type="text"
                placeholder="Search"
                value={search}
                onChange={handleSearchChange}
              />
              <StyledButton
                color="BLUE"
                width="50px"
                height="30px"
                fontSize=".85rem"
                onClick={handleFilterChange}
              >
                Search
              </StyledButton>
            </Styled.SearchContainer>
          }
          data={filteredPlayers}
          columns={columns}
          dense
          pagination
          paginationPerPage={20}
          highlightOnHover
        />
      </DataTableWrapper>
    </AdminPageContainer>
  );
}
