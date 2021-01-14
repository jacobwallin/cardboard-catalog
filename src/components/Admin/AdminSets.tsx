import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllSetData } from "../../store/library/sets/thunks";
import { RootState } from "../../store";
import EditLink from "./components/EditLink";

import DataTable from "react-data-table-component";

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
  },
];

export default function AdminSets(props: any) {
  const dispatch = useDispatch();
  const allSets = useSelector((state: RootState) => state.library.sets.allSets);
  useEffect(() => {
    dispatch(fetchAllSetData());
  }, []);
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <DataTable
        title="All Sets"
        columns={columns}
        data={allSets}
        highlightOnHover
      />
      ;
    </div>
  );
}
