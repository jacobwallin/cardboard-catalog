import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { fetchCards } from "../../../store/collection/filter/thunks";
import { fetchCardsBySet } from "../../../store/collection/browse/thunks";
import { fetchAllPlayers } from "../../../store/library/players/thunks";
import { fetchAllTeams } from "../../../store/library/teams/thunks";
import DataTable from "react-data-table-component";
import { columns } from "./columns";
import { createLoadingSelector, createStatusSelector } from "../../../store/loading/reducer";
import { createPdf } from "../../../utils/createPdf";
import createPdfData from "./createPdfData";

import { Filters, initialFilters, TableColumns, initialTableColumns } from "./types";
import { filterCards } from "./filterCards";

import { CollectionPageContainer, DataTableContainer, TotalCards } from "../shared";
import { LoadingDots } from "../../shared/Loading";
import * as Styled from "./styled";

const loadingCardsSelector = createLoadingSelector(["GET_CARDS"]);
const fetchCardsStatusSelector = createStatusSelector("GET_CARDS");

export default function FilterPage() {
  const dispatch = useDispatch();

  const cards = useSelector((state: RootState) => state.collection.filter.rows);
  const players = useSelector((state: RootState) => state.library.players);
  const teams = useSelector((state: RootState) => state.library.teams);
  const cardsBySet = useSelector((state: RootState) => state.collection.browse.cardsBySet);
  const loadingCards = useSelector((state: RootState) => loadingCardsSelector(state));
  const fetchCardsStatus = useSelector((state: RootState) => fetchCardsStatusSelector(state));

  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [shownColumns, setShownColumns] = useState<TableColumns>(initialTableColumns);
  const [playerSearch, setPlayerSearch] = useState("");
  const [showColumnsMenu, setShowColumnsMenu] = useState(false);

  const filteredCards = filterCards(cards, filters);

  useEffect(() => {
    dispatch(fetchCardsBySet());
    dispatch(fetchAllPlayers());
    dispatch(fetchAllTeams());
  }, []);

  useEffect(() => {
    if (cards.length === 0 && !fetchCardsStatus) {
      dispatch(fetchCards());
    }
  }, [cards, fetchCardsStatus]);

  function resetFilters() {
    setFilters(initialFilters);
  }

  function playerSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
    setPlayerSearch(event.target.value);
  }

  function setFiltersChange(event: React.ChangeEvent<HTMLSelectElement>) {
    switch (event.target.id) {
      case "year":
        setFilters({
          ...filters,
          year: +event.target.value,
        });
        break;
      case "set":
        setFilters({
          ...filters,
          setId: +event.target.value,
        });
        break;
    }
  }

  function teamPlayerFiltersChange(event: React.ChangeEvent<HTMLSelectElement>) {
    switch (event.target.id) {
      case "team":
        setFilters({
          ...filters,
          teamId: +event.target.value,
        });
        break;
      case "player":
        setFilters({
          ...filters,
          playerId: +event.target.value,
        });
        break;
    }
  }

  function cardAttributeChange(event: React.ChangeEvent<HTMLInputElement>) {
    setFilters({
      ...filters,
      [event.target.id]: event.target.checked,
    });
  }

  function shownColumnsChange(event: React.ChangeEvent<HTMLInputElement>) {
    setShownColumns({
      ...shownColumns,
      [event.target.id]: event.target.checked,
    });
  }

  return (
    <CollectionPageContainer>
      <Styled.PageHeader>Filter / Search</Styled.PageHeader>
      <Styled.FiltersContainer>
        <Styled.FilterSection>
          <Styled.SectionHeader>Set</Styled.SectionHeader>
          <Styled.Filter>
            <Styled.Label htmlFor="year">Year: </Styled.Label>
            <Styled.Select id="year" value={filters.year} onChange={setFiltersChange}>
              <option value={0}>Select</option>]
              {Object.keys(
                cardsBySet.reduce((years: any, set) => {
                  if (years[set.release_date.slice(0, 4)]) return years;
                  years[set.release_date.slice(0, 4)] = true;
                  return years;
                }, {})
              ).map((year) => {
                return (
                  <option key={year} value={+year}>
                    {year}
                  </option>
                );
              })}
            </Styled.Select>
          </Styled.Filter>
          <Styled.Filter>
            <Styled.Label htmlFor="set">Set: </Styled.Label>
            <Styled.Select id="set" value={filters.setId} onChange={setFiltersChange}>
              <option value={0}>Select</option>]
              {cardsBySet.map((set) => {
                return (
                  <option key={set.setId} value={set.setId}>
                    {set.setName}
                  </option>
                );
              })}
            </Styled.Select>
          </Styled.Filter>
        </Styled.FilterSection>
        <Styled.FilterSection>
          <Styled.SectionHeader>Team/Player</Styled.SectionHeader>
          <Styled.Filter>
            <Styled.Label htmlFor="team">Team: </Styled.Label>
            <Styled.Select id="team" value={filters.teamId} onChange={teamPlayerFiltersChange}>
              <option value={0}>Select</option>
              {teams.map((team) => {
                return (
                  <option key={team.id} value={team.id}>
                    {team.name}
                  </option>
                );
              })}
            </Styled.Select>
          </Styled.Filter>
          <Styled.Filter>
            <Styled.Label htmlFor="playerSearch">Find: </Styled.Label>
            <Styled.TextInput
              id="playerSearch"
              type="text"
              value={playerSearch}
              placeholder="player name"
              onChange={playerSearchChange}
            />
          </Styled.Filter>
          <Styled.Filter>
            <Styled.Label htmlFor="player">Player: </Styled.Label>
            <Styled.Select id="player" onChange={teamPlayerFiltersChange}>
              <option value={0}>Select</option>
              {players
                .filter((player) => {
                  return player.name.toLowerCase().includes(playerSearch.toLowerCase());
                })
                .map((player) => {
                  return (
                    <option key={player.id} value={player.id}>
                      {player.name}
                    </option>
                  );
                })}
            </Styled.Select>
          </Styled.Filter>
        </Styled.FilterSection>
        <Styled.FilterSection>
          <Styled.SectionHeader>Attribute</Styled.SectionHeader>
          <Styled.Filter>
            <Styled.Label htmlFor="rookie">Rookie: </Styled.Label>
            <Styled.Checkbox
              id="rookie"
              checked={filters.rookie}
              type="checkbox"
              onChange={cardAttributeChange}
            />
          </Styled.Filter>
          <Styled.Filter>
            <Styled.Label htmlFor="serialized">Serialized: </Styled.Label>
            <Styled.Checkbox
              id="serialized"
              checked={filters.serialized}
              type="checkbox"
              onChange={cardAttributeChange}
            />
          </Styled.Filter>
          <Styled.Filter>
            <Styled.Label htmlFor="auto">Auto: </Styled.Label>
            <Styled.Checkbox
              id="auto"
              checked={filters.auto}
              type="checkbox"
              onChange={cardAttributeChange}
            />
          </Styled.Filter>
          <Styled.Filter>
            <Styled.Label htmlFor="relic">Relic: </Styled.Label>
            <Styled.Checkbox
              id="relic"
              checked={filters.relic}
              type="checkbox"
              onChange={cardAttributeChange}
            />
          </Styled.Filter>
          <Styled.Filter>
            <Styled.Label htmlFor="manufacturedRelic">Manufactured Relic: </Styled.Label>
            <Styled.Checkbox
              id="manufacturedRelic"
              checked={filters.manufacturedRelic}
              type="checkbox"
              onChange={cardAttributeChange}
            />
          </Styled.Filter>
          <Styled.Filter>
            <Styled.Label htmlFor="parallel">Parallel: </Styled.Label>
            <Styled.Checkbox
              id="parallel"
              checked={filters.parallel}
              type="checkbox"
              onChange={cardAttributeChange}
            />
          </Styled.Filter>
          <Styled.Filter>
            <Styled.Label htmlFor="shortPrint">Short Print: </Styled.Label>
            <Styled.Checkbox
              id="shortPrint"
              checked={filters.shortPrint}
              type="checkbox"
              onChange={cardAttributeChange}
            />
          </Styled.Filter>
        </Styled.FilterSection>
      </Styled.FiltersContainer>
      <Styled.ResetPdfButtons>
        <Styled.Pdf
          onClick={(e) => createPdf(createPdfData(filteredCards, shownColumns, "Checklist"))}
        >
          Download PDF
        </Styled.Pdf>
        <Styled.Reset onClick={resetFilters}>Reset Filters</Styled.Reset>
      </Styled.ResetPdfButtons>
      <Styled.TableHeader>
        <TotalCards totalCards={filteredCards.length} />
        <Styled.TableColumns onClick={(e) => setShowColumnsMenu(!showColumnsMenu)}>
          table columns
        </Styled.TableColumns>
        <Styled.SelectColumns show={showColumnsMenu}>
          <Styled.ShowColumn>
            <Styled.Label htmlFor="cardNumber">Card #: </Styled.Label>
            <Styled.Checkbox
              id="cardNumber"
              checked={shownColumns.cardNumber}
              type="checkbox"
              onChange={shownColumnsChange}
            />
          </Styled.ShowColumn>
          <Styled.ShowColumn>
            <Styled.Label htmlFor="cardName">Card Name: </Styled.Label>
            <Styled.Checkbox
              id="cardName"
              checked={shownColumns.cardName}
              type="checkbox"
              onChange={shownColumnsChange}
            />
          </Styled.ShowColumn>
          <Styled.ShowColumn>
            <Styled.Label htmlFor="team">Team: </Styled.Label>
            <Styled.Checkbox
              id="team"
              checked={shownColumns.team}
              type="checkbox"
              onChange={shownColumnsChange}
            />
          </Styled.ShowColumn>
          <Styled.ShowColumn>
            <Styled.Label htmlFor="setName">Set: </Styled.Label>
            <Styled.Checkbox
              id="setName"
              checked={shownColumns.setName}
              type="checkbox"
              onChange={shownColumnsChange}
            />
          </Styled.ShowColumn>
          <Styled.ShowColumn>
            <Styled.Label htmlFor="dateAdded">Date Added: </Styled.Label>
            <Styled.Checkbox
              id="dateAdded"
              checked={shownColumns.dateAdded}
              type="checkbox"
              onChange={shownColumnsChange}
            />
          </Styled.ShowColumn>
        </Styled.SelectColumns>
      </Styled.TableHeader>
      <DataTableContainer>
        <DataTable
          columns={columns(shownColumns)}
          data={filteredCards}
          dense
          noHeader
          pagination
          progressPending={loadingCards}
          progressComponent={<LoadingDots />}
          paginationPerPage={20}
          paginationRowsPerPageOptions={[10, 20, 30, 40, 50]}
        />
      </DataTableContainer>
    </CollectionPageContainer>
  );
}
