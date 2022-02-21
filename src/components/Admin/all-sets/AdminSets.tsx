import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllSetData } from "../../../store/library/sets/thunks";
import { RootState } from "../../../store";
import CreateSetModal from "./create-set-modal/CreateSetModal";
import DataTable from "react-data-table-component";
import dataTableColumns from "./dataTableColumns";
import AdminPageContainer from "../components/AdminPageContainer";
import CreateButton from "../components/CreateButton";
import EditFormHeader from "../components/EditFormHeader";
import { DataTableWrapper } from "../components/WrappedDataTable";
import SelectFilter from "../components/SelectFilter";
import aggregate, { Return } from "./aggregate";
import * as Styled from "./styled";

import { createStatusSelector } from "../../../store/loading/reducer";

const createSetSelector = createStatusSelector("CREATE_SET");

export default function AdminSets(props: any) {
  const dispatch = useDispatch();

  // toggle to show form for creating a new set
  const [createSet, setCreateSet] = useState(false);
  const [yearFilter, setYearFilter] = useState(0);
  const [brandFilter, setBrandFilter] = useState(0);
  const [filterData, setFilterData] = useState<Return>({
    years: [],
    brands: [],
  });

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
      setFilterData(aggregate(allSets));
    }
  }, [allSets]);

  function handleSelectChange(e: React.ChangeEvent<HTMLSelectElement>) {
    if (e.target.id === "year") {
      setYearFilter(+e.target.value);
    }
    if (e.target.id === "brand") {
      setBrandFilter(+e.target.value);
    }
  }

  function toggleModal() {
    setCreateSet(!createSet);
  }
  return (
    <AdminPageContainer>
      {createSet && <CreateSetModal handleCancel={toggleModal} />}
      <EditFormHeader text="Manage Sets" />
      <DataTableWrapper>
        <Styled.FilterContainer>
          <SelectFilter
            id="year"
            value={yearFilter}
            onChange={handleSelectChange}
          >
            <option value={0}>Select Year</option>
            {filterData.years.map((year) => {
              return <option value={year}>{year}</option>;
            })}
          </SelectFilter>
          <SelectFilter
            id="brand"
            value={brandFilter}
            onChange={handleSelectChange}
          >
            <option value={0}>Select Brand</option>
            {filterData.brands.map((brand) => {
              return <option value={brand.id}>{brand.name}</option>;
            })}
          </SelectFilter>
        </Styled.FilterContainer>
        <DataTable
          title={`Card Sets`}
          columns={dataTableColumns}
          data={allSets.filter((set) => {
            if (yearFilter !== 0 && set.year !== yearFilter) return false;
            if (brandFilter !== 0 && set.brandId !== brandFilter) return false;
            return true;
          })}
          highlightOnHover
          pagination
          paginationPerPage={20}
          dense
          actions={
            <CreateButton onClick={() => setCreateSet(true)}>
              Create Set
            </CreateButton>
          }
        />
      </DataTableWrapper>
    </AdminPageContainer>
  );
}
