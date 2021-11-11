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
import { createLoadingSelector } from "../../../store/loading/reducer";
import { createPdf } from "../../../utils/createPdf";
import createPdfData from "./createPdfData";
import {
  Filters,
  initialFilters,
  TableColumns,
  initialTableColumns,
} from "./types";
import {
  CollectionPageContainer,
  DataTableContainer,
  TotalCards,
} from "../shared";
import { LoadingDots } from "../../shared/Loading";
import generateQuery from "./generateQuery";
import Filter from "./Filter";
import * as Styled from "./styled";

const loadingCardsSelector = createLoadingSelector(["GET_CARDS"]);

export default function FilterPage() {
  const dispatch = useDispatch();

  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [shownColumns, setShownColumns] =
    useState<TableColumns>(initialTableColumns);
  const [showColumnsMenu, setShowColumnsMenu] = useState(false);
  const [showFilters, setShowFilters] = useState(true);

  const paginatedCards = useSelector(
    (state: RootState) => state.collection.filter
  );

  const loadingCards = useSelector((state: RootState) =>
    loadingCardsSelector(state)
  );
  const cardsFetched = useSelector(
    (state: RootState) => state.collection.filter.dataFetched
  );
  const initialDataLoadComplete = useSelector(
    (state: RootState) => state.collection.browse.initialDataLoadComplete
  );

  function handleFilterChange(e: React.ChangeEvent<HTMLSelectElement>) {
    switch (e.target.id) {
      case "rookie":
        setFilters({ ...filters, rookie: +e.target.value });
        break;
      case "serialized":
        setFilters({ ...filters, serialized: +e.target.value });
        break;
      case "auto":
        setFilters({ ...filters, auto: +e.target.value });
        break;
      case "relic":
        setFilters({ ...filters, relic: +e.target.value });
        break;
      case "manufacturedRelic":
        setFilters({ ...filters, manufacturedRelic: +e.target.value });
        break;
      case "parallel":
        setFilters({ ...filters, parallel: +e.target.value });
        break;
      case "refractor":
        setFilters({ ...filters, refractor: +e.target.value });
        break;
      case "shortPrint":
        setFilters({ ...filters, shortPrint: +e.target.value });
        break;
      case "player":
        setFilters({ ...filters, playerId: +e.target.value });
        break;
      case "hallfOfFame":
        setFilters({ ...filters, hallOfFame: +e.target.value });
        break;
      case "year":
        setFilters({
          ...filters,
          year: +e.target.value,
          setId: 0,
          subsetId: 0,
          seriesId: 0,
        });
        break;
      case "set":
        setFilters({
          ...filters,
          setId: +e.target.value,
          subsetId: 0,
          seriesId: 0,
        });
        break;
      case "subset":
        setFilters({ ...filters, subsetId: +e.target.value, seriesId: 0 });
        break;
      case "series":
        setFilters({ ...filters, seriesId: +e.target.value });
        break;
    }
  }

  useEffect(() => {
    dispatch(fetchAllPlayers());
    dispatch(fetchAllTeams());
    if (!initialDataLoadComplete) {
      dispatch(fetchCardsBySet());
    }
  }, []);

  useEffect(() => {
    dispatch(
      fetchCards(
        `?offset=${(page - 1) * rowsPerPage}&limit=${rowsPerPage}${query}`
      )
    );
  }, [page, rowsPerPage, query, dispatch]);

  function applyFilters() {
    setQuery(generateQuery(filters));
  }

  function resetFilters() {
    setFilters(initialFilters);
    setQuery(generateQuery(initialFilters));
  }

  function shownColumnsChange(event: React.ChangeEvent<HTMLInputElement>) {
    setShownColumns({
      ...shownColumns,
      [event.target.id]: event.target.checked,
    });
  }

  function handleRowsPerPageChange(rowsPerPage: number) {
    setRowsPerPage(rowsPerPage);
  }

  function handlePageChange(page: number) {
    setPage(page);
  }

  function toggleShowFilters() {
    setShowFilters(!showFilters);
  }

  return (
    <CollectionPageContainer>
      <Styled.PageHeader>{"Filter & Search All Cards"}</Styled.PageHeader>
      <Styled.ShowFiltersToggle onClick={toggleShowFilters}>
        {showFilters ? "Hide Filters" : "Show Filters"}
      </Styled.ShowFiltersToggle>
      {showFilters && (
        <Filter filters={filters} handleChange={handleFilterChange} />
      )}
      <Styled.Buttons>
        <Styled.Pdf>Download PDF</Styled.Pdf>
        <Styled.ResetApply>
          <Styled.Apply onClick={applyFilters}>Apply Filters</Styled.Apply>
          <Styled.Reset onClick={resetFilters}>Reset Filters</Styled.Reset>
        </Styled.ResetApply>
      </Styled.Buttons>
      <Styled.TableHeader>
        <TotalCards totalCards={paginatedCards.count} />
        <Styled.TableColumns
          onClick={(e) => setShowColumnsMenu(!showColumnsMenu)}
        >
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
          data={paginatedCards.rows}
          dense
          noHeader
          progressPending={loadingCards}
          progressComponent={
            <Styled.LoadingContainer>
              <LoadingDots />
            </Styled.LoadingContainer>
          }
          pagination
          paginationServer
          paginationTotalRows={paginatedCards.count}
          onChangeRowsPerPage={handleRowsPerPageChange}
          onChangePage={handlePageChange}
          paginationPerPage={rowsPerPage}
          paginationRowsPerPageOptions={[10, 20, 30, 40, 50]}
        />
      </DataTableContainer>
    </CollectionPageContainer>
  );
}
