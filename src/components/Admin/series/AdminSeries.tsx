import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { RootState } from "../../../store";
import { fetchSeriesById } from "../../../store/library/series/thunks";
import { createLoadingSelector } from "../../../store/loading/reducer";
import EditSeries from "./series_form/EditSeries";
import AdminPageContainer from "../components/AdminPageContainer";
import DataTable from "react-data-table-component";
import { LoadingDots } from "../../shared/Loading";
import columns from "./dataTableColumns";
import { Card } from "../../../store/library/series/types";
import { DataTableWrapper } from "../components/WrappedDataTable";
import { NoDataMessage } from "../../shared/NoDataMessage";
import sortCardNumbers from "../../../utils/sortCardNumbers";
import { Header, SubHeader } from "../components/PageHeader";

const isLoadingSelector = createLoadingSelector(["GET_SERIES"]);

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

  function toggleEditCardModal(card: Card) {}

  if (isLoading) {
    return (
      <AdminPageContainer>
        <LoadingDots />
      </AdminPageContainer>
    );
  }

  return (
    <AdminPageContainer>
      <Header>
        {series.name}
        {series.subset.baseSeriesId === series.id || " Parallel"}
      </Header>
      <SubHeader>{`${series.subset.set.name} - ${series.subset.name}`}</SubHeader>
      <EditSeries seriesId={+props.match.params.seriesId} />
      <DataTableWrapper>
        <DataTable
          title="Cards"
          dense
          highlightOnHover
          pagination
          paginationPerPage={20}
          noDataComponent={
            <NoDataMessage>No cards have been added to this set.</NoDataMessage>
          }
          columns={columns(toggleEditCardModal)}
          data={series.cards
            .sort((cardA, cardB) => {
              return sortCardNumbers(
                cardA.card_datum.number,
                cardB.card_datum.number
              );
            })
            .map((card) => {
              return {
                card,
                serialized: series.serialized,
                auto: series.auto,
                relic: series.relic,
                manufacturedRelic: series.manufacturedRelic,
                refractor: series.refractor,
                parallel: series.parallel,
                shortPrint: series.shortPrint,
              };
            })}
        />
      </DataTableWrapper>
    </AdminPageContainer>
  );
}
