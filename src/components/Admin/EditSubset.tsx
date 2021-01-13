import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { RootState } from "../../store";
import { fetchSubset } from "../../store/library/subsets/thunks";
import DataTable from "react-data-table-component";
import { createLoadingSelector } from "../../store/loading/reducer";
import SubsetForm from "./SubsetForm";
import EditLink from "./components/EditLink";

const isLoadingSelector = createLoadingSelector(["GET_SUBSET"]);

interface Params {
  subsetId: string;
}

const seriesColumns = [
  {
    name: "Name",
    selector: "name",
    sortable: true,
  },
  {
    name: "",
    sortable: false,
    cell: (row: any) => <EditLink to={`/admin/edit-series/${row.id}`} />,
  },
];
const cardsColumns = [
  {
    name: "Card Number",
    selector: "card_datum.number",
    sortFunction: (rowA: any, rowB: any) => {
      // trye to convert to number first and then sort
      if (+rowA && +rowB) return +rowA - +rowB;
      // if card number is not a number (contains characters), sort with string value
      if (rowA < rowB) return -1;
      return 1;
    },
    sortable: false,
  },
  {
    name: "Name",
    selector: "card_datum.name",
    sortable: true,
  },
  {
    name: "Team",
    selector: "card_datum.team.name",
    sortable: true,
  },
  {
    name: "Rookie",
    sortable: false,
    cell: (row: any) => (row.card_datum.rookie ? "RC" : ""),
  },
  {
    name: "",
    sortable: false,
    cell: (row: any) => <EditLink to={`/admin/edit-series/${row.id}`} />,
  },
];

export default function EditSubset(props: RouteComponentProps<Params>) {
  const dispatch = useDispatch();

  const subset = useSelector(
    (state: RootState) => state.library.subsets.singleSubset
  );
  const isLoading = useSelector((state: RootState) => isLoadingSelector(state));

  useEffect(() => {
    dispatch(fetchSubset(+props.match.params.subsetId));
  }, []);

  if (isLoading || subset.series.length === 0) {
    return <h1>LOADING DATA</h1>;
  }
  return (
    <div style={{ display: "block" }}>
      <SubsetForm />
      <DataTable
        title={`Series in ${subset.name}`}
        columns={seriesColumns}
        data={subset.series}
        highlightOnHover
      />
      <DataTable
        title={`Cards in ${subset.name}`}
        columns={cardsColumns}
        data={subset.series[0].cards}
        defaultSortField="card_datum.number"
        highlightOnHover
        pagination
      />
    </div>
  );
}
