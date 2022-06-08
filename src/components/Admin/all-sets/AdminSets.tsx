import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllSetData,
  fetchSetYears,
} from "../../../store/library/sets/thunks";
import { fetchAllBrands } from "../../../store/library/brands/thunks";
import { fetchLeagues } from "../../../store/library/leagues/thunks";
import { RootState } from "../../../store";
import CreateSetModal from "./create-set-modal/CreateSetModal";
import DataTable from "react-data-table-component";
import dataTableColumns from "./dataTableColumns";
import AdminPageContainer from "../components/AdminPageContainer";
import CreateButton from "../components/CreateButton";
import { Header } from "../components/PageHeader";
import * as DataTableComponents from "../components/DataTableComponents";
import SelectFilter from "../components/SelectFilter";
import * as Styled from "./styled";

import { createStatusSelector } from "../../../store/loading/reducer";

const createSetSelector = createStatusSelector("CREATE_SET");

interface Props {
  sportFilter: number;
  yearFilter: number;
  brandFilter: number;
  setSportFilter(filter: number): void;
  setYearFilter(filter: number): void;
  setBrandFilter(filter: number): void;
}

export default function AdminSets(props: Props) {
  const dispatch = useDispatch();
  const {
    yearFilter,
    brandFilter,
    sportFilter,
    setSportFilter,
    setYearFilter,
    setBrandFilter,
  } = props;

  // toggle to show form for creating a new set
  const [createSet, setCreateSet] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("date");
  const [sortDirection, setSortDirection] = useState("desc");

  const allSets = useSelector((state: RootState) => state.library.sets.allSets);
  const setYears = useSelector(
    (state: RootState) => state.library.sets.setYears
  );
  const brands = useSelector(
    (state: RootState) => state.library.brands.allBrands
  );
  const sports = useSelector(
    (state: RootState) => state.library.leagues.allLeagues
  );
  const createSetStatus = useSelector((state: RootState) =>
    createSetSelector(state)
  );

  useEffect(() => {
    dispatch(fetchAllBrands());
    dispatch(fetchSetYears());
    dispatch(fetchLeagues());
  }, [dispatch]);

  useEffect(() => {
    let query = `limit=${rowsPerPage}&offset=${
      (page - 1) * rowsPerPage
    }&sort=${sortBy}&sort_direction=${sortDirection}`;

    if (sportFilter) query += `&sportId=${sportFilter}`;
    if (yearFilter) query += `&year=${yearFilter}`;
    if (brandFilter) query += `&brandId=${brandFilter}`;

    dispatch(fetchAllSetData(query));
  }, [
    sportFilter,
    yearFilter,
    brandFilter,
    rowsPerPage,
    page,
    sortBy,
    sortDirection,
    dispatch,
  ]);

  // if loading status of updating set changes to success, hide the form
  useEffect(() => {
    if (createSetStatus === "SUCCESS") {
      setCreateSet(false);
    }
  }, [createSetStatus]);

  function toggleModal() {
    setCreateSet(!createSet);
  }

  function handleSelectChange(e: React.ChangeEvent<HTMLSelectElement>) {
    if (e.target.id === "sport") {
      setSportFilter(+e.target.value);
    }
    if (e.target.id === "year") {
      setYearFilter(+e.target.value);
    }
    if (e.target.id === "brand") {
      setBrandFilter(+e.target.value);
    }
  }

  function handleRowsPerPageChange(rowsPerPage: number) {
    setRowsPerPage(rowsPerPage);
  }

  function handlePageChange(page: number) {
    setPage(page);
  }

  function handleSort(column: any, sortDirection: any) {
    console.log("SORTING: ", column, sortDirection);
    const sortBy =
      (column.name === "League" && "sport") ||
      (column.name === "Name" && "name") ||
      (column.name === "Year" && "year") ||
      (column.name === "Brand" && "brand") ||
      (column.name === "Date Added" && "date") ||
      (column.name === "Completed" && "complete") ||
      "";

    setSortBy(sortBy);
    setSortDirection(sortDirection);
  }

  return (
    <AdminPageContainer>
      {createSet && <CreateSetModal handleCancel={toggleModal} />}
      <Header>MANAGE SETS</Header>
      <DataTableComponents.DataTableWrapper>
        <Styled.FilterContainer>
          <SelectFilter
            id="sport"
            value={sportFilter}
            onChange={handleSelectChange}
          >
            <option value={0}>All Sports</option>
            {sports
              .sort((a, b) => {
                if (a.name > b.name) return 1;
                return -1;
              })
              .map((sport) => {
                return (
                  <option key={sport.id} value={sport.id}>
                    {sport.name}
                  </option>
                );
              })}
          </SelectFilter>
          <SelectFilter
            id="year"
            value={yearFilter}
            onChange={handleSelectChange}
          >
            <option value={0}>All Years</option>
            {setYears
              .sort((a, b) => {
                if (a.year > b.year) return -1;
                return 1;
              })
              .map((year) => {
                return (
                  <option key={year.year} value={year.year}>
                    {year.year}
                  </option>
                );
              })}
          </SelectFilter>
          <SelectFilter
            id="brand"
            value={brandFilter}
            onChange={handleSelectChange}
          >
            <option value={0}>All Brands</option>
            {brands
              .sort((a, b) => {
                if (a.name > b.name) return 1;
                return -1;
              })
              .map((brand) => {
                return (
                  <option key={brand.id} value={brand.id}>
                    {brand.name}
                  </option>
                );
              })}
          </SelectFilter>
        </Styled.FilterContainer>
        <DataTableComponents.DataTableHeader>
          <DataTableComponents.DataTableTitle>
            Sets
          </DataTableComponents.DataTableTitle>
          <DataTableComponents.DataTableButtonsContainer>
            <CreateButton onClick={() => setCreateSet(true)}>
              Create Set
            </CreateButton>
          </DataTableComponents.DataTableButtonsContainer>
        </DataTableComponents.DataTableHeader>
        <DataTable
          noHeader
          columns={dataTableColumns}
          data={allSets.rows}
          highlightOnHover
          pagination
          paginationServer
          paginationTotalRows={allSets.count}
          onChangeRowsPerPage={handleRowsPerPageChange}
          onChangePage={handlePageChange}
          paginationPerPage={rowsPerPage}
          paginationRowsPerPageOptions={[10, 20, 30, 40, 50]}
          onSort={handleSort}
          dense
        />
      </DataTableComponents.DataTableWrapper>
    </AdminPageContainer>
  );
}
