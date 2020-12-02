import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { RootState } from "../../store";
import { fetchSubset } from "../../store/library/subsets/thunks";
import DataTable from "react-data-table-component";
import { createLoadingSelector } from "../../store/loading/reducer";
import SubsetForm from "./SubsetForm";
import { isConstructorDeclaration } from "typescript";

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
];
const cardsColumns = [
  {
    name: "Name",
    selector: "card_datum.name",
    sortable: true,
  },
];

export default function EditSubset(props: RouteComponentProps<Params>) {
  const dispatch = useDispatch();

  const subset = useSelector(
    (state: RootState) => state.library.subsets.singleSubset
  );
  const isLoading = useSelector((state: RootState) =>
    isLoadingSelector(state)
  );

  useEffect(() => {

    dispatch(fetchSubset(+props.match.params.subsetId));
  }, []);
  

  if (isLoading || subset.series.length === 0) {
    return <h1>LOADING DATA</h1>;
  }
  return (
    <div style={{display: "block"}}>
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
        highlightOnHover
        pagination
      />
    </div>
  )
}

// subset edit form
// list of series
// list of card data
