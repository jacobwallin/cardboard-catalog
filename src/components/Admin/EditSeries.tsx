import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { RootState } from "../../store";
import { fetchAttributes } from "../../store/library/attributes/thunks";
import { fetchSeriesById } from "../../store/library/series/thunks";
import { createLoadingSelector } from "../../store/loading/reducer";
import EditSeriesForm from "./EditSeriesForm";
import EditFormHeader from "./components/EditFormHeader";
import EditPageContainer from "./components/EditPageContainer";

const isLoadingSelector = createLoadingSelector([
  "GET_ATTRIBUTES",
  "GET_SERIES_BY_ID",
]);

interface Params {
  seriesId: string;
}

export default function EditSeries(props: RouteComponentProps<Params>) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAttributes());
    dispatch(fetchSeriesById(+props.match.params.seriesId));
  }, []);

  const isLoading = useSelector((state: RootState) => isLoadingSelector(state));
  const series = useSelector((state: RootState) => state.library.series.series);

  if (isLoading) {
    return <div>LOADING</div>;
  }

  return (
    <EditPageContainer>
      <EditFormHeader text={`Edit ${series.name} Series`} />
      <EditSeriesForm />
    </EditPageContainer>
  );
}
