import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { RootState } from "../../store";
import { fetchSubset } from "../../store/library/subsets/thunks";
import DataTable from "react-data-table-component";
import { createLoadingSelector } from "../../store/loading/reducer";
import SubsetForm from "./SubsetForm";

const isUpdatingSelector = createLoadingSelector(["GET_SUBSET"]);

interface Params {
  subsetId: string;
}

export default function EditSubset(props: RouteComponentProps<Params>) {
  const dispatch = useDispatch();

  const isLoading = useSelector((state: RootState) =>
    isUpdatingSelector(state)
  );

  useEffect(() => {
    dispatch(fetchSubset(+props.match.params.subsetId));
  }, []);

  if (isLoading) {
    return <h1>LOADING DATA</h1>;
  }

  return <SubsetForm />;
}

// subset edit form
// list of series
// list of card data
