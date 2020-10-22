import React, { useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useRouteMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSet } from "../../store/library/sets/thunks";
import { RootState } from "../../store";
import SubsetCard from "../Collection/SubsetCard";

import DataTable from "react-data-table-component";

interface Params {
  setId: string;
}

export default function EditSet(props: RouteComponentProps<Params>) {
  const dispatch = useDispatch();
  const singleSet = useSelector(
    (state: RootState) => state.library.sets.singleSet
  );

  useEffect(() => {
    dispatch(fetchSet(+props.match.params.setId));
  }, []);
  return (
    <div>
      {singleSet.subsets.map((subset) => {
        return <p key={subset.id}>{subset.name}</p>;
      })}
    </div>
  );
}
