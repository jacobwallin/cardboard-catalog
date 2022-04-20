import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllSetData } from "../../../store/library/sets/thunks";
import { RootState } from "../../../store";
import CreateSetModal from "./create-set-modal/CreateSetModal";
import DataTable from "react-data-table-component";
import dataTableColumns from "./dataTableColumns";
import AdminPageContainer from "../components/AdminPageContainer";
import CreateButton from "../components/CreateButton";
import { Header } from "../components/PageHeader";
import * as DataTableComponents from "../components/DataTableComponents";
import SelectFilter from "../components/SelectFilter";
import { aggregateFilterValues, filterSets, FilterValues } from "./aggregate";
import * as Styled from "./styled";
import { SetSummary } from "../../../store/library/sets/types";

import { createStatusSelector } from "../../../store/loading/reducer";

const createSetSelector = createStatusSelector("CREATE_SET");

interface Props {
  yearFilter: number;
  brandFilter: number;
  setYearFilter(filter: number): void;
  setBrandFilter(filter: number): void;
}

export default function AdminSets(props: Props) {
  const dispatch = useDispatch();

  // toggle to show form for creating a new set
  const [createSet, setCreateSet] = useState(false);
  const [filterData, setFilterData] = useState<FilterValues>({
    years: [],
    brands: [],
  });
  const [filteredSets, setFilteredSets] = useState<SetSummary[]>([]);

  const allSets = useSelector((state: RootState) => state.library.sets.allSets);
  const createSetStatus = useSelector((state: RootState) =>
    createSetSelector(state)
  );

  useEffect(() => {
    dispatch(fetchAllSetData());
  }, []);

  // if loading status of updating set changes to success, hide the form
  useEffect(() => {
    if (createSetStatus === "SUCCESS") {
      setCreateSet(false);
    }
  }, [createSetStatus]);

  useEffect(() => {
    if (allSets.length > 0) {
      let filters = aggregateFilterValues(allSets, props.yearFilter);
      if (!filters.brands.some((b) => b.id === props.brandFilter)) {
        props.setBrandFilter(0);
      }
      setFilterData(filters);
      setFilteredSets(filterSets(allSets, props.yearFilter, props.brandFilter));
    }
  }, [allSets, props]);

  function toggleModal() {
    setCreateSet(!createSet);
  }

  function handleSelectChange(e: React.ChangeEvent<HTMLSelectElement>) {
    if (e.target.id === "year") {
      props.setYearFilter(+e.target.value);
    }
    if (e.target.id === "brand") {
      props.setBrandFilter(+e.target.value);
    }
  }

  return (
    <AdminPageContainer>
      {createSet && <CreateSetModal handleCancel={toggleModal} />}
      <Header>MANAGE SETS</Header>
      <DataTableComponents.DataTableWrapper>
        <Styled.FilterContainer>
          <SelectFilter
            id="year"
            value={props.yearFilter}
            onChange={handleSelectChange}
          >
            <option value={0}>Select Year</option>
            {filterData.years.map((year) => {
              return (
                <option key={year} value={year}>
                  {year}
                </option>
              );
            })}
          </SelectFilter>
          <SelectFilter
            id="brand"
            value={props.brandFilter}
            onChange={handleSelectChange}
          >
            <option value={0}>Select Brand</option>
            {filterData.brands.map((brand) => {
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
          data={filteredSets}
          highlightOnHover
          pagination
          paginationPerPage={20}
          dense
        />
      </DataTableComponents.DataTableWrapper>
    </AdminPageContainer>
  );
}
