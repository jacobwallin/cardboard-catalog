import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { RootState } from "../../../store";
import { fetchSeriesById } from "../../../store/library/series/thunks";
import {
  createLoadingSelector,
  createStatusSelector,
} from "../../../store/loading/reducer";
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
import EditCardModal from "./edit_card_modal/EditCardModal";

const isLoadingSelector = createLoadingSelector(["GET_SERIES"]);
const updateCardStatusSelector = createStatusSelector("UPDATE_CARD");

interface Params {
  seriesId: string;
}

export default function AdminSeries(props: RouteComponentProps<Params>) {
  const dispatch = useDispatch();

  const [editCard, setEditCard] = useState<Card | undefined>(undefined);

  const isLoading = useSelector((state: RootState) => isLoadingSelector(state));
  const updateCardStatus = useSelector((state: RootState) =>
    updateCardStatusSelector(state)
  );
  const series = useSelector((state: RootState) => state.library.series.series);

  useEffect(() => {
    dispatch(fetchSeriesById(+props.match.params.seriesId));
  }, []);

  useEffect(() => {
    if (updateCardStatus === "SUCCESS") {
      setEditCard(undefined);
    }
  }, [updateCardStatus]);

  function showEditCardModal(card: Card) {
    setEditCard(card);
  }
  function hideEditCardModal() {
    setEditCard(undefined);
  }

  if (isLoading || series.id !== +props.match.params.seriesId) {
    return (
      <AdminPageContainer>
        <LoadingDots />
      </AdminPageContainer>
    );
  }

  return (
    <AdminPageContainer>
      {editCard && (
        <EditCardModal
          card={editCard}
          dismiss={hideEditCardModal}
          seriesSerialized={series.serialized}
        />
      )}
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
          columns={columns(showEditCardModal)}
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
