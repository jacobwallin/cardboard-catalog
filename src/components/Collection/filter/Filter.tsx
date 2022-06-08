import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import * as Styled from "./styled";
import { Filters } from "./types";
import { fetchSet } from "../../../store/library/sets/thunks";
import { fetchSubset } from "../../../store/library/subsets/thunks";
import { createLoadingSelector } from "../../../store/loading/reducer";
import sortSeries from "../subset-page/sortSeries";
import { SetCards } from "../../../store/collection/browse/types";
import { League } from "../../../store/library/leagues/types";

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
  const sports = useSelector(
    (state: RootState) => state.library.leagues.allLeagues
  );
  const subset = useSelector((state: RootState) => state.library.subsets);
  const cardsBySet = useSelector(
    (state: RootState) => state.collection.browse.cardsBySet
  );
  const [collectionSports, setCollectionSports] = useState<League[]>([]);
  const [collectionYears, setCollectionYears] = useState<string[]>([]);
  const [collectionSets, setCollectionSets] = useState<SetCards[]>([]);

  // LOADING STATE
  const loadingSet = useSelector((state: RootState) =>
    setLoadingSelector(state)
  );
  const loadingSubset = useSelector((state: RootState) =>
    subsetLoadingSelector(state)
  );

  // set sports based on year selected
  useEffect(() => {
    // create object with all sports in collection
    const sportsObj = cardsBySet.reduce((collSports: any, set) => {
      if (collSports[set.leagueId]) return collSports;
      if (filters.year === 0 || filters.year === set.year) {
        const s = sports.find((s) => s.id === set.leagueId);
        if (s) {
          collSports[set.leagueId] = s;
        }
      }
      return collSports;
    }, {});

    // convert object to an array
    let sportsArr = [];
    for (let key in sportsObj) {
      sportsArr.push(sportsObj[key]);
    }

    // sort and set sport options
    setCollectionSports(
      sportsArr.sort((a, b) => {
        if (a < b) return 1;
        return -1;
      })
    );
  }, [filters.sportId, filters.year, sports, cardsBySet]);

  // set years based on sport selected
  useEffect(() => {
    setCollectionYears(
      Object.keys(
        cardsBySet.reduce((years: any, set) => {
          if (years[set.year]) return years;
          if (filters.sportId === 0 || filters.sportId === set.leagueId) {
            years[set.year] = true;
          }
          return years;
        }, {})
      ).sort((a, b) => {
        if (a < b) return 1;
        return -1;
      })
    );
  }, [filters.year, filters.sportId, cardsBySet]);

  // set sets based on sport and/or year selected
  useEffect(() => {
    setCollectionSets(
      cardsBySet.filter((collectionSet) => {
        if (filters.year !== 0 && collectionSet.year !== filters.year)
          return false;
        if (filters.sportId !== 0 && collectionSet.leagueId !== filters.sportId)
          return false;
        return true;
      })
    );
  }, [filters.year, filters.sportId, cardsBySet]);

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
        <Styled.SectionHeader>Sport / Year / Set</Styled.SectionHeader>
        <Styled.Filter>
          <Styled.Label htmlFor="sport">Sport: </Styled.Label>
          <Styled.Select
            id="sport"
            value={filters.sportId}
            onChange={props.handleFilterChange}
          >
            <option value={0}>All</option>
            {collectionSports.map((sport) => {
              return (
                <option key={sport.id} value={+sport.id}>
                  {sport.name}
                </option>
              );
            })}
          </Styled.Select>
        </Styled.Filter>
        <Styled.Filter>
          <Styled.Label htmlFor="year">Year: </Styled.Label>
          <Styled.Select
            id="year"
            value={filters.year}
            onChange={props.handleFilterChange}
          >
            <option value={0}>All</option>
            {collectionYears.map((year) => {
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
            {collectionSets.map((set) => {
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
            {set.subsets
              .sort((subsetA, subsetB) => {
                if (subsetA.base) return -1;
                if (subsetB.base) return 1;

                if (subsetA.name < subsetB.name) return -1;
                if (subsetA.name > subsetB.name) return 1;
                return 0;
              })
              .map((subset) => (
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
            {subset.series
              .sort((seriesA, seriesB) => {
                return sortSeries(seriesA, seriesB, subset.baseSeriesId || 0);
              })
              .map((ser) => (
                <option key={ser.id} value={ser.id}>
                  {ser.name}
                  {ser.serialized && ` /${ser.serialized}`}
                </option>
              ))}
          </Styled.Select>
        </Styled.Filter>
        <Styled.SectionHeader>Team</Styled.SectionHeader>
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
                  <option key={team.id} value={`${team.id}-${team.name}`}>
                    {team.name}
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
          <Styled.AttributeSelect
            id="rookie"
            value={filters.rookie}
            onChange={props.handleFilterChange}
          >
            <option value={0}>Include</option>
            <option value={1}>True</option>
            <option value={-1}>False</option>
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
            <option value={1}>True</option>
            <option value={-1}>False</option>
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
            <option value={1}>True</option>
            <option value={-1}>False</option>
          </Styled.AttributeSelect>
        </Styled.Filter>
        <Styled.Filter>
          <Styled.Label htmlFor="graded">Graded:</Styled.Label>
          <Styled.AttributeSelect
            id="graded"
            value={filters.graded}
            onChange={props.handleFilterChange}
          >
            <option value={0}>Include</option>
            <option value={1}>True</option>
            <option value={-1}>False</option>
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
            <option value={1}>True</option>
            <option value={-1}>False</option>
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
            <option value={1}>True</option>
            <option value={-1}>False</option>
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
            <option value={1}>True</option>
            <option value={-1}>False</option>
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
            <option value={1}>True</option>
            <option value={-1}>False</option>
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
            <option value={1}>True</option>
            <option value={-1}>False</option>
          </Styled.AttributeSelect>
        </Styled.Filter>
      </Styled.FilterSection>
      <Styled.FilterSection>
        <Styled.SectionHeader>Player</Styled.SectionHeader>
        <Styled.Filter>
          <Styled.Label htmlFor="hallOfFame">Hall of Fame: </Styled.Label>
          <Styled.AttributeSelect
            id="hallOfFame"
            value={filters.hallOfFame}
            onChange={props.handleFilterChange}
          >
            <option value={0}>Include</option>
            <option value={1}>True</option>
            <option value={-1}>False</option>
          </Styled.AttributeSelect>
        </Styled.Filter>
        <Styled.Filter>
          <Styled.Label htmlFor="playerSearch">Search: </Styled.Label>
          <Styled.TextInput
            id="playerSearch"
            type="text"
            value={filters.playerSearch}
            placeholder="player name"
            onChange={props.handlePlayerSearchChange}
            autoComplete="off"
          />
        </Styled.Filter>
        <Styled.Filter>
          <Styled.Label htmlFor="player">Player: </Styled.Label>
          <Styled.Select
            id="player"
            onChange={props.handleFilterChange}
            disabled={filters.playerSearch.length < 2}
            value={filters.player}
          >
            <option value={""}>All</option>
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
                    <option
                      key={player.id}
                      value={`${player.id}-${player.name}`}
                    >
                      {player.name}
                    </option>
                  );
                })}
          </Styled.Select>
        </Styled.Filter>
      </Styled.FilterSection>
    </Styled.FiltersContainer>
  );
}
