import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllSetData } from "../../store/library/sets/thunks";
import { RootState } from "../../store";
import EditLink from "./components/EditLink";

import WrappedDataTable from "./components/WrappedDataTable";

import EditPageContainer from "./components/EditPageContainer";

const columns = [
  {
    name: "Name",
    selector: "name",
    sortable: true,
  },
  {
    name: "Year",
    selector: "year",
    sortable: true,
  },
  {
    name: "League",
    selector: "league.name",
    sortable: true,
  },
  {
    name: "Brand",
    selector: "brand.name",
    sortable: true,
  },
  {
    name: "",
    sortable: false,
    cell: (row: any) => <EditLink to={`/admin/edit/set/${row.id}`} />,
    grow: 0,
  },
];

export default function AdminSets(props: any) {
  const dispatch = useDispatch();
  const allSets = useSelector((state: RootState) => state.library.sets.allSets);
  useEffect(() => {
    dispatch(fetchAllSetData());
  }, []);
  // toggle to show form for creating a new set
  const [createSet, setCreateSet] = useState(false);
  return (
    <EditPageContainer>
      <button>CREATE SET</button>
      <WrappedDataTable
        title="All Sets"
        columns={columns}
        data={allSets}
        highlightOnHover
        pagination
        paginationPerPage={20}
        dense
      />
    </EditPageContainer>
  );
}
