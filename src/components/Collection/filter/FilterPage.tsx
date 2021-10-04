import React, { useState, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { fetchCards } from "../../../store/collection/filter/thunks";
import { fetchCardsBySet } from "../../../store/collection/browse/thunks";
import { fetchAllPlayers } from "../../../store/library/players/thunks";
import { fetchAllTeams } from "../../../store/library/teams/thunks";
import DataTable from "react-data-table-component";
import columns from "./dataTableColumns";
import { createLoadingSelector } from "../../../store/loading/reducer";

import { Filters, initialFilters } from "./filters";
import { filterCards } from "./filterCards";

import {
  CollectionPageContainer,
  DataTableContainer,
  ContentContainer,
  DataTableTitle,
  CollectionData,
} from "../shared";

import * as Styled from "./styled";

const loadingCardsSelector = createLoadingSelector(["GET_CARDS"]);

export default function FilterPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCards());
    dispatch(fetchCardsBySet());
    dispatch(fetchAllPlayers());
    dispatch(fetchAllTeams());
  }, []);

  const cards = useSelector((state: RootState) => state.collection.filter.rows);
  const cardCount = useSelector(
    (state: RootState) => state.collection.filter.count
  );
  const players = useSelector((state: RootState) => state.library.players);
  const teams = useSelector((state: RootState) => state.library.teams);
  const cardsBySet = useSelector(
    (state: RootState) => state.collection.browse.cardsBySet
  );
  const loadingCards = useSelector((state: RootState) =>
    loadingCardsSelector(state)
  );

  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [isAuto, setIsAuto] = useState(false);

  const filteredCards = useMemo(
    () => filterCards(cards, filters),
    [cards, filters]
  );

  function setFiltersChange(event: React.ChangeEvent<HTMLSelectElement>) {
    switch (event.target.id) {
      case "year":
        setFilters({
          ...filters,
          year: {
            filter: +event.target.value !== 0,
            value: +event.target.value,
          },
        });
        break;
      case "set":
        setFilters({
          ...filters,
          setId: {
            filter: +event.target.value !== 0,
            value: +event.target.value,
          },
        });
        break;
    }
  }

  function teamPlayerFiltersChange(
    event: React.ChangeEvent<HTMLSelectElement>
  ) {
    switch (event.target.id) {
      case "team":
        console.log("TEAM FILTER: ", event.target.value);
        setFilters({
          ...filters,
          teamId: {
            filter: +event.target.value !== 0,
            value: +event.target.value,
          },
        });
        break;
      case "player":
        setFilters({
          ...filters,
          playerId: {
            filter: +event.target.value !== 0,
            value: +event.target.value,
          },
        });
        break;
    }
  }

  function cardAttributeChange(event: React.ChangeEvent<HTMLInputElement>) {
    setFilters({
      ...filters,
      [event.target.id]: {
        filter: event.target.checked,
        value: event.target.checked,
      },
    });
  }

  return (
    <CollectionPageContainer>
      <Styled.FiltersContainer>
        <Styled.FilterSection>
          <Styled.SectionHeader>Set</Styled.SectionHeader>
          <Styled.Filter>
            <Styled.Label htmlFor="year">Year: </Styled.Label>
            <Styled.Select id="year" onChange={setFiltersChange}>
              <option value={0}>Select</option>]
              {Object.keys(
                cardsBySet.reduce((years: any, set) => {
                  if (years[set.year]) return years;
                  years[set.year] = true;
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
            <Styled.Select id="set" onChange={setFiltersChange}>
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
            <Styled.Select id="team" onChange={teamPlayerFiltersChange}>
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
            <Styled.Label htmlFor="player">Player: </Styled.Label>
            <Styled.Select id="player" onChange={teamPlayerFiltersChange}>
              <option value={0}>Select</option>
              {players.map((player) => {
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
              type="checkbox"
              onChange={cardAttributeChange}
            />
          </Styled.Filter>
          <Styled.Filter>
            <Styled.Label htmlFor="serialized">Serialized: </Styled.Label>
            <Styled.Checkbox
              id="serialized"
              type="checkbox"
              onChange={cardAttributeChange}
            />
          </Styled.Filter>
          <Styled.Filter>
            <Styled.Label htmlFor="auto">Auto: </Styled.Label>
            <Styled.Checkbox
              id="auto"
              type="checkbox"
              onChange={cardAttributeChange}
            />
          </Styled.Filter>
          <Styled.Filter>
            <Styled.Label htmlFor="relic">Relic: </Styled.Label>
            <Styled.Checkbox
              id="relic"
              type="checkbox"
              onChange={cardAttributeChange}
            />
          </Styled.Filter>
          <Styled.Filter>
            <Styled.Label htmlFor="manufacturedRelic">
              Manufactured Relic:{" "}
            </Styled.Label>
            <Styled.Checkbox
              id="manufacturedRelic"
              type="checkbox"
              onChange={cardAttributeChange}
            />
          </Styled.Filter>
          <Styled.Filter>
            <Styled.Label htmlFor="parallel">Parallel: </Styled.Label>
            <Styled.Checkbox
              id="parallel"
              type="checkbox"
              onChange={cardAttributeChange}
            />
          </Styled.Filter>
          <Styled.Filter>
            <Styled.Label htmlFor="shortPrint">Short Print: </Styled.Label>
            <Styled.Checkbox
              id="shortPrint"
              type="checkbox"
              onChange={cardAttributeChange}
            />
          </Styled.Filter>
        </Styled.FilterSection>
      </Styled.FiltersContainer>

      <DataTableContainer>
        <DataTable
          columns={columns}
          data={filteredCards}
          dense
          progressPending={loadingCards}
          pagination
          paginationPerPage={25}
          paginationRowsPerPageOptions={[10, 25, 50]}
        />
      </DataTableContainer>
    </CollectionPageContainer>
  );
}
