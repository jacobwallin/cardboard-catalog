import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { RootState } from "../../store";
import { fetchSubset } from "../../store/library/subsets/thunks";
import WrappedDataTable from "./components/WrappedDataTable";
import { createLoadingSelector } from "../../store/loading/reducer";
import EditSubsetForm from "./EditSubsetForm";
import EditLink from "./components/EditLink";
import EditFormHeader from "./components/EditFormHeader";
import EditPageContainer from "./components/EditPageContainer";

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
    cell: (row: any) => <EditLink to={`/admin/edit/series/${row.id}`} />,
    grow: 0,
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
    cell: (row: any) => <EditLink to={`/admin/edit/card/${row.cardDataId}`} />,
    grow: 0,
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

  if (isLoading) {
    return <h1>LOADING DATA</h1>;
  }
  return (
    <EditPageContainer>
      <EditFormHeader text={`Edit ${subset.name} Subset`} />
      <EditSubsetForm />
      <WrappedDataTable
        title={`Series in ${subset.name}`}
        columns={seriesColumns}
        data={subset.series}
        highlightOnHover
      />
      <WrappedDataTable
        title={`Cards in ${subset.name}`}
        columns={cardsColumns}
        // send an empty array if there are no series that belong to the subset
        data={subset.series.length !== 0 ? subset.series[0].cards : []}
        defaultSortField="card_datum.number"
        highlightOnHover
        pagination
        paginationPerPage={20}
        dense
      />
    </EditPageContainer>
  );
}
