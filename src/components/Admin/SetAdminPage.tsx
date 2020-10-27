import React, { useEffect } from "react";
import { RouteComponentProps, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSet } from "../../store/library/sets/thunks";
import { RootState } from "../../store";
import EditButton from "./components/EditButton";
import EditSet from "./EditSet";
import styled from "styled-components";

import DataTable from "react-data-table-component";

const columns = [
  {
    name: "Name",
    selector: "name",
    sortable: true,
  },
  {
    name: "Card Qty",
    selector: "cardQuantity",
    sortable: true,
  },
  {
    name: "",
    sortable: false,
    cell: (row: any) => <EditButton to={`/admin/edit-subset/${row.id}`} />,
  },
];

const EditSetHeader = styled.div`
  font-size: 2rem;
`;
interface Params {
  setId: string;
}

export default function SetAdminPage(props: RouteComponentProps<Params>) {
  const dispatch = useDispatch();
  const singleSet = useSelector(
    (state: RootState) => state.library.sets.singleSet
  );

  useEffect(() => {
    dispatch(fetchSet(+props.match.params.setId));
  }, []);
  return (
    <div>
      <EditSetHeader>EDIT SET</EditSetHeader>
      <EditSet />
      <DataTable
        title={`Subsets in ${singleSet.name}`}
        columns={columns}
        data={singleSet.subsets}
        highlightOnHover
      />
    </div>
  );
}
