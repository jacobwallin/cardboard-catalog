import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import * as Styled from "./styled";
import { Filters } from "./types";
import { fetchSet } from "../../../store/library/sets/thunks";
import { fetchSubset } from "../../../store/library/subsets/thunks";
import { createLoadingSelector } from "../../../store/loading/reducer";

const setLoadingSelector = createLoadingSelector(["GET_SINGLE_SET"]);
const subsetLoadingSelector = createLoadingSelector(["GET_SUBSET"]);

interface Props {
  filters: Filters;
  handleFilterChange(e: React.ChangeEvent<HTMLSelectElement>): void;
  handlePlayerSearchChange(e: React.ChangeEvent<HTMLInputElement>): void;
}

export default function Filter(props: Props) {
  const dispatch = useDispatch();
  const { filters } = props;

  const players = useSelector((state: RootState) => state.library.players);
  const teams = useSelector((state: RootState) => state.library.teams);
  const set = useSelector((state: RootState) => state.library.sets.set);
  const subset = useSelector((state: RootState) => state.library.subsets);
  const cardsBySet = useSelector(
    (state: RootState) => state.collection.browse.cardsBySet
  );

  // LOADING STATE
  const loadingSet = useSelector((state: RootState) =>
    setLoadingSelector(state)
  );
  const loadingSubset = useSelector((state: RootState) =>
    subsetLoadingSelector(state)
  );

  useEffect(() => {
    if (filters.setId !== 0 && set.id !== filters.setId) {
      dispatch(fetchSet(filters.setId));
    }
  }, [filters.setId]);

  useEffect(() => {
    if (filters.subsetId !== 0 && subset.id !== filters.subsetId) {
      dispatch(fetchSubset(filters.subsetId));
    }
  }, [filters.subsetId]);

  return (
    <Styled.FiltersContainer>
      <Styled.FilterSection>
        <Styled.SectionHeader>Set</Styled.SectionHeader>
        <Styled.Filter>
          <Styled.Label htmlFor="year">Year: </Styled.Label>
          <Styled.Select
            id="year"
            value={filters.year}
            onChange={props.handleFilterChange}
          >
            <option value={0}>All</option>
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
          <Styled.Select
            id="set"
            value={filters.setId}
            onChange={props.handleFilterChange}
            disabled={filters.year === 0}
          >
            <option value={0}>All</option>]
            {cardsBySet
              .filter((set) => set.year === filters.year)
              .map((set) => {
                return (
                  <option key={set.setId} value={set.setId}>
                    {set.setName}
                  </option>
                );
              })}
          </Styled.Select>
        </Styled.Filter>
        <Styled.Filter>
          <Styled.Label htmlFor="subset">Subset: </Styled.Label>
          <Styled.Select
            id="subset"
            value={filters.subsetId}
            onChange={props.handleFilterChange}
            disabled={loadingSet || filters.setId === 0}
          >
            <option value={0}>All</option>
            {set.subsets.map((subset) => (
              <option key={subset.id} value={subset.id}>
                {subset.name}
              </option>
            ))}
          </Styled.Select>
        </Styled.Filter>
        <Styled.Filter>
          <Styled.Label htmlFor="series">Parallel: </Styled.Label>
          <Styled.Select
            id="series"
            value={filters.seriesId}
            onChange={props.handleFilterChange}
            disabled={loadingSubset || filters.subsetId === 0}
          >
            <option value={0}>All</option>
            {subset.series.map((ser) => (
              <option key={ser.id} value={ser.id}>
                {ser.name}
              </option>
            ))}
          </Styled.Select>
        </Styled.Filter>

        <Styled.SectionHeader>Team/Player</Styled.SectionHeader>
        <Styled.Filter>
          <Styled.Label htmlFor="team">Team: </Styled.Label>
          <Styled.Select
            id="team"
            value={filters.teamId}
            onChange={props.handleFilterChange}
          >
            <option value={0}>All</option>
            {teams
              .sort((teamA, teamB) => {
                if (teamA.name < teamB.name) return -1;
                if (teamA.name > teamB.name) return 1;
                return 0;
              })
              .map((team) => {
                return (
                  <option key={team.id} value={team.id}>
                    {team.name}
                  </option>
                );
              })}
          </Styled.Select>
        </Styled.Filter>
        <Styled.Filter>
          <Styled.Label htmlFor="playerSearch">Search: </Styled.Label>
          <Styled.TextInput
            id="playerSearch"
            type="text"
            value={filters.playerSearch}
            placeholder="player name"
            onChange={props.handlePlayerSearchChange}
          />
        </Styled.Filter>
        <Styled.Filter>
          <Styled.Label htmlFor="player">Player: </Styled.Label>
          <Styled.Select
            id="player"
            onChange={props.handleFilterChange}
            disabled={filters.playerSearch.length < 2}
            value={filters.playerId}
          >
            <option value={0}>All</option>
            {filters.playerSearch.length > 1 &&
              players
                .filter((player) => {
                  return player.name
                    .toLowerCase()
                    .includes(filters.playerSearch.toLowerCase());
                })
                .sort((playerA, playerB) => {
                  if (playerA.name < playerB.name) return -1;
                  if (playerA.name > playerB.name) return 1;
                  return 0;
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
        <Styled.Filter>
          <Styled.Label htmlFor="hallOfFame">Hall of Fame: </Styled.Label>
          <Styled.AttributeSelect
            id="hallOfFame"
            value={filters.hallOfFame}
            onChange={props.handleFilterChange}
          >
            <option value={0}>Include</option>
            <option value={1}>Show Only</option>
            <option value={-1}>Exclude</option>
          </Styled.AttributeSelect>
        </Styled.Filter>
      </Styled.FilterSection>
      <Styled.FilterSection>
        <Styled.SectionHeader>Attribute</Styled.SectionHeader>
        <Styled.Filter>
          <Styled.Label htmlFor="rookie">Rookie: </Styled.Label>
          <Styled.AttributeSelect
            id="rookie"
            value={filters.rookie}
            onChange={props.handleFilterChange}
          >
            <option value={0}>Include</option>
            <option value={1}>Show Only</option>
            <option value={-1}>Exclude</option>
          </Styled.AttributeSelect>
        </Styled.Filter>
        <Styled.Filter>
          <Styled.Label htmlFor="serialized">Serialized: </Styled.Label>
          <Styled.AttributeSelect
            id="serialized"
            value={filters.serialized}
            onChange={props.handleFilterChange}
          >
            <option value={0}>Include</option>
            <option value={1}>Show Only</option>
            <option value={-1}>Exclude</option>
          </Styled.AttributeSelect>
        </Styled.Filter>
        <Styled.Filter>
          <Styled.Label htmlFor="auto">Auto: </Styled.Label>
          <Styled.AttributeSelect
            id="auto"
            value={filters.auto}
            onChange={props.handleFilterChange}
          >
            <option value={0}>Include</option>
            <option value={1}>Show Only</option>
            <option value={-1}>Exclude</option>
          </Styled.AttributeSelect>
        </Styled.Filter>
        <Styled.Filter>
          <Styled.Label htmlFor="relic">Relic: </Styled.Label>
          <Styled.AttributeSelect
            id="relic"
            value={filters.relic}
            onChange={props.handleFilterChange}
          >
            <option value={0}>Include</option>
            <option value={1}>Show Only</option>
            <option value={-1}>Exclude</option>
          </Styled.AttributeSelect>
        </Styled.Filter>
        <Styled.Filter>
          <Styled.Label htmlFor="parallel">Parallel: </Styled.Label>
          <Styled.AttributeSelect
            id="parallel"
            value={filters.parallel}
            onChange={props.handleFilterChange}
          >
            <option value={0}>Include</option>
            <option value={1}>Show Only</option>
            <option value={-1}>Exclude</option>
          </Styled.AttributeSelect>
        </Styled.Filter>
        <Styled.Filter>
          <Styled.Label htmlFor="refractor">Refractor: </Styled.Label>
          <Styled.AttributeSelect
            id="refractor"
            value={filters.refractor}
            onChange={props.handleFilterChange}
          >
            <option value={0}>Include</option>
            <option value={1}>Show Only</option>
            <option value={-1}>Exclude</option>
          </Styled.AttributeSelect>
        </Styled.Filter>
        <Styled.Filter>
          <Styled.Label htmlFor="shortPrint">Short Print: </Styled.Label>
          <Styled.AttributeSelect
            id="shortPrint"
            value={filters.shortPrint}
            onChange={props.handleFilterChange}
          >
            <option value={0}>Include</option>
            <option value={1}>Show Only</option>
            <option value={-1}>Exclude</option>
          </Styled.AttributeSelect>
        </Styled.Filter>
        <Styled.Filter>
          <Styled.Label htmlFor="manufacturedRelic">
            Manufactured Relic:
          </Styled.Label>
          <Styled.AttributeSelect
            id="manufacturedRelic"
            value={filters.manufacturedRelic}
            onChange={props.handleFilterChange}
          >
            <option value={0}>Include</option>
            <option value={1}>Show Only</option>
            <option value={-1}>Exclude</option>
          </Styled.AttributeSelect>
        </Styled.Filter>
      </Styled.FilterSection>
    </Styled.FiltersContainer>
  );
}
