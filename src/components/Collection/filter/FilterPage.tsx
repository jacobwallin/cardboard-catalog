import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import {
  fetchCards,
  fetchPdfData,
} from "../../../store/collection/filter/thunks";
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
import PdfModal from "./PdfModal";
import * as Styled from "./styled";

const loadingCardsSelector = createLoadingSelector(["GET_CARDS"]);
const loadingPdfDataSelector = createLoadingSelector(["GET_PDF_CARDS"]);

export default function FilterPage() {
  const dispatch = useDispatch();

  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [filterBubbles, setFilterBubbles] = useState<
    { name: string; filter: string }[]
  >([]);

  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [sortBy, setSortBy] = useState("date");
  const [sortDirection, setSortDirection] = useState("desc");
  const [pdfSortBy, setPdfSortBy] = useState("date");
  const [pdfSortDirection, setPdfSortDirection] = useState("desc");
  const [shownColumns, setShownColumns] =
    useState<TableColumns>(initialTableColumns);
  const [showColumnsMenu, setShowColumnsMenu] = useState(false);
  const [showFilters, setShowFilters] = useState(true);
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [showPdfError, setShowPdfError] = useState(false);
  const [pdfCreated, setPdfCreated] = useState(false);
  const [pdfTitle, setPdfTitle] = useState("");

  const set = useSelector((state: RootState) => state.library.sets.set);
  const subset = useSelector((state: RootState) => state.library.subsets);
  const paginatedCards = useSelector(
    (state: RootState) => state.collection.filter
  );

  const loadingCards = useSelector((state: RootState) =>
    loadingCardsSelector(state)
  );
  const loadingPdfData = useSelector((state: RootState) =>
    loadingPdfDataSelector(state)
  );
  const initialDataLoadComplete = useSelector(
    (state: RootState) => state.collection.browse.initialDataLoadComplete
  );

  function handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
    setFilters({ ...filters, playerSearch: event.target.value });
  }

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
        setFilters({ ...filters, player: e.target.value });
        break;
      case "hallOfFame":
        setFilters({ ...filters, hallOfFame: +e.target.value });
        break;
      case "graded":
        setFilters({ ...filters, graded: +e.target.value });
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

  function handlePdfModalChanges(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.id === "title") {
      setPdfTitle(e.target.value);
    } else if (e.target.name === "sortBy") {
      setPdfSortBy(e.target.id);
    } else if (e.target.name === "sortDirection") {
      setPdfSortDirection(e.target.id);
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
        `?offset=${
          (page - 1) * rowsPerPage
        }&limit=${rowsPerPage}${query}&sort=${sortBy}&sort_direction=${sortDirection}`
      )
    );
  }, [page, rowsPerPage, sortBy, sortDirection, query, dispatch]);

  useEffect(() => {
    if (pdfCreated && !loadingPdfData) {
      setPdfCreated(false);
      setShowPdfModal(false);
      createPdf(
        createPdfData(
          paginatedCards.pdfData,
          pdfSortBy,
          pdfSortDirection,
          shownColumns,
          pdfTitle === "" ? "Checklist" : pdfTitle
        ),
        pdfTitle === "" ? "Checklist" : pdfTitle
      );
    }
  }, [
    loadingPdfData,
    pdfCreated,
    paginatedCards.pdfData,
    shownColumns,
    pdfTitle,
    pdfSortBy,
    pdfSortDirection,
  ]);

  function applyFilters() {
    const { query, bubbles } = generateQuery(filters, set, subset);
    setQuery(query);
    setFilterBubbles(bubbles);
  }

  function resetFilters() {
    setFilters(initialFilters);
    setQuery("");
    setFilterBubbles([]);
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

  function handleSort(column: any, sortDirection: any) {
    const sortBy =
      (column.name === "#" && "number") ||
      (column.name === "Name" && "name") ||
      (column.name === "Set" && "set") ||
      (column.name === "Date Added" && "date") ||
      "";

    setSortBy(sortBy);
    setSortDirection(sortDirection);
  }

  function toggleShowFilters() {
    setShowFilters(!showFilters);
  }

  function togglePdfModal() {
    if (paginatedCards.count <= 2000) {
      setShowPdfError(false);
      setPdfSortBy(sortBy);
      setPdfSortDirection(sortDirection);
      setShowPdfModal(!showPdfModal);
    } else {
      setShowPdfError(true);
    }
  }

  function downloadPdf() {
    // fetch complete list of filtered cards
    if (paginatedCards.count <= 2000) {
      setPdfCreated(true);
      dispatch(
        fetchPdfData(
          `?offset=0&limit=${paginatedCards.count}${query}&sort=${sortBy}&sort_direction=${sortDirection}`
        )
      );
    }
  }

  return (
    <CollectionPageContainer>
      {showPdfModal && (
        <PdfModal
          dismiss={togglePdfModal}
          createdPdf={downloadPdf}
          handleChanges={handlePdfModalChanges}
          loading={loadingPdfData}
          loadingMessage="Downloading PDF Data"
          sortBy={pdfSortBy}
          sortDirection={pdfSortDirection}
        />
      )}
      <Styled.PageHeader>{"Filter & Search All Cards"}</Styled.PageHeader>
      <Styled.ShowFiltersToggle onClick={toggleShowFilters}>
        {showFilters ? "Hide Filters" : "Show Filters"}
      </Styled.ShowFiltersToggle>
      {showFilters && (
        <Filter
          filters={filters}
          handleFilterChange={handleFilterChange}
          handlePlayerSearchChange={handleSearchChange}
        />
      )}
      <Styled.ActiveFilters>Active Filters</Styled.ActiveFilters>
      <Styled.FilterBubbleContainer>
        {filterBubbles.length > 0 ? (
          filterBubbles.map((filter) => (
            <Styled.FilterBubble key={filter.name}>
              {`${filter.name} | ${filter.filter}`}
            </Styled.FilterBubble>
          ))
        ) : (
          <Styled.FilterBubble>none</Styled.FilterBubble>
        )}
      </Styled.FilterBubbleContainer>
      <Styled.Buttons>
        <Styled.ResetApply>
          {showPdfError && <Styled.PdfError>2000 Card Limit</Styled.PdfError>}
          <Styled.Pdf onClick={togglePdfModal}>Download PDF</Styled.Pdf>
        </Styled.ResetApply>
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
          sortServer
          onSort={handleSort}
          pagination
          paginationServer
          paginationTotalRows={paginatedCards.count}
          onChangeRowsPerPage={handleRowsPerPageChange}
          onChangePage={handlePageChange}
          paginationPerPage={rowsPerPage}
          paginationRowsPerPageOptions={[10, 20, 30, 40, 50]}
          // paginationResetDefaultPage
        />
      </DataTableContainer>
    </CollectionPageContainer>
  );
}
