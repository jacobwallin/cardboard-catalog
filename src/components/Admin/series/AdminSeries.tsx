import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { RootState } from "../../../store";
import { fetchSeriesById } from "../../../store/library/series/thunks";
import { createLoadingSelector } from "../../../store/loading/reducer";
import EditSeries from "./series_form/EditSeries";
import EditFormHeader from "../components/EditFormHeader";
import AdminPageContainer from "../components/AdminPageContainer";

const isLoadingSelector = createLoadingSelector([
  "GET_ATTRIBUTES",
  "GET_SERIES",
]);

interface Params {
  seriesId: string;
}

export default function AdminSeries(props: RouteComponentProps<Params>) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSeriesById(+props.match.params.seriesId));
  }, []);

  const isLoading = useSelector((state: RootState) => isLoadingSelector(state));
  const series = useSelector((state: RootState) => state.library.series.series);

  if (isLoading) {
    return <div>LOADING</div>;
  }

  return (
    <AdminPageContainer>
      <EditFormHeader text={`Edit ${series.name} Series`} />
      <EditSeries seriesId={+props.match.params.seriesId} />
    </AdminPageContainer>
  );
}
