import React, { useEffect } from "react";
import { useRouteMatch, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllSetData } from "../../store/library/sets/thunks";
import { RootState } from "../../store";

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
    name: "Edit",
    sortable: false,
    cell: (row: any) => <Link to={`/admin/edit-set/${row.id}`}>Edit</Link>,
  },
];

export default function Sets(props: any) {
  const dispatch = useDispatch();
  const { path } = useRouteMatch();
  const allSets = useSelector((state: RootState) => state.library.sets.allSets);
  useEffect(() => {
    dispatch(fetchAllSetData());
  }, []);
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <DataTable
        title="Arnold Movies"
        columns={columns}
        data={allSets}
        highlightOnHover
      />
      ;
    </div>
  );
}
