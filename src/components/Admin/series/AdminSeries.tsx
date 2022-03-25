import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../../store";
import {
  fetchSeriesById,
  deleteCards,
  addCards,
} from "../../../store/library/series/thunks";
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
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";

const isLoadingSelector = createLoadingSelector(["GET_SERIES"]);
const updateCardStatusSelector = createStatusSelector("UPDATE_CARD");
const deleteCardsStatusSelector = createStatusSelector("DELETE_CARDS");
const modalLoadingSelector = createLoadingSelector([
  "DELETE_CARDS",
  "UPDATE_CARD",
]);

export default function AdminSeries() {
  const dispatch = useDispatch();
  let { seriesId } = useParams<"seriesId">();

  const [editCard, setEditCard] = useState<Card | undefined>(undefined);
  const [showDeleteCardModal, setShowDeleteCardModal] = useState(false);
  const [deletedCardId, setDeletedCardId] = useState(0);

  const isLoading = useSelector((state: RootState) => isLoadingSelector(state));
  const updateCardStatus = useSelector((state: RootState) =>
    updateCardStatusSelector(state)
  );
  const deleteCardsStatus = useSelector((state: RootState) =>
    deleteCardsStatusSelector(state)
  );
  const loadingChanges = useSelector((state: RootState) =>
    modalLoadingSelector(state)
  );

  const series = useSelector((state: RootState) => state.library.series.series);

  useEffect(() => {
    if (seriesId) dispatch(fetchSeriesById(+seriesId));
  }, []);

  // hide either modal once a card or series has been created
  useEffect(() => {
    if (!loadingChanges) {
      setShowDeleteCardModal(false);
      setEditCard(undefined);
    }
  }, [loadingChanges]);

  function showEditCardModal(card: Card) {
    setEditCard(card);
  }
  function hideEditCardModal() {
    setEditCard(undefined);
  }

  function toggleDeleteCardModal() {
    setShowDeleteCardModal(!showDeleteCardModal);
  }

  function deleteSelected(cardId: number) {
    setDeletedCardId(cardId);
    toggleDeleteCardModal();
  }

  function deleteCard() {
    dispatch(deleteCards([deletedCardId]));
  }

  if (isLoading || String(series.id) !== seriesId) {
    return (
      <AdminPageContainer>
        <LoadingDots />
      </AdminPageContainer>
    );
  }

  return (
    <AdminPageContainer>
      {showDeleteCardModal && (
        <ConfirmDeleteModal
          handleDismiss={toggleDeleteCardModal}
          handleDelete={deleteCard}
          deleteStatus={deleteCardsStatus}
          message="This will delete the card from any user collections it is part of."
        />
      )}
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
      <EditSeries seriesId={+seriesId} />
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
          columns={columns(showEditCardModal, deleteSelected)}
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
                auto: series.subset.auto,
                relic: series.subset.relic,
                manufacturedRelic: series.subset.manufacturedRelic,
                refractor: series.refractor,
                parallel: series.parallel,
                shortPrint: series.subset.shortPrint,
              };
            })}
        />
      </DataTableWrapper>
    </AdminPageContainer>
  );
}
