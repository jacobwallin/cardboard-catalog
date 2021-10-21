import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { RootState } from "../../../store";
import { fetchSubset } from "../../../store/library/subsets/thunks";
import WrappedDataTable from "../components/WrappedDataTable";
import { createLoadingSelector } from "../../../store/loading/reducer";
import EditSubset from "./subset_form/EditSubset";
import EditFormHeader from "../components/EditFormHeader";
import AdminPageContainer from "../components/AdminPageContainer";
import CreateSeriesModal from "./series_modal/CreateSeriesModal";
import CreateCardModal from "./card_modal/CreateCardModal";
import CardScrapeModal from "./scrape_cards/CardScrapeModal";
import CreateButton from "../components/CreateButton";
import sortCardNumbers from "../../../utils/sortCardNumbers";

import {
  cardsDataTableColumns,
  seriesDataTableColumns,
} from "./dataTableColumns";

const isLoadingSelector = createLoadingSelector(["GET_SUBSET"]);
const creatingCardSelector = createLoadingSelector(["CREATE_CARD"]);
const creatingSeriesSelector = createLoadingSelector(["CREATE_SERIES"]);

interface Params {
  subsetId: string;
}

export default function AdminSubset(props: RouteComponentProps<Params>) {
  const [showCreateSeriesModal, setShowCreateSeriesModal] = useState(false);
  const [showCreateCardModal, setShowCreateCardModal] = useState(false);
  const [showScrapeCardModal, setShowScrapeCardModal] = useState(false);

  const dispatch = useDispatch();

  const subset = useSelector(
    (state: RootState) => state.library.subsets.subset
  );
  const isLoading = useSelector((state: RootState) => isLoadingSelector(state));
  const creatingCard = useSelector((state: RootState) =>
    creatingCardSelector(state)
  );
  const creatingSeries = useSelector((state: RootState) =>
    creatingSeriesSelector(state)
  );

  useEffect(() => {
    dispatch(fetchSubset(+props.match.params.subsetId));
  }, []);

  // hide either modal once a card or series has been created
  useEffect(() => {
    if (!creatingCard) {
      setShowCreateCardModal(false);
    }
  }, [creatingCard]);
  useEffect(() => {
    if (!creatingSeries) {
      setShowCreateSeriesModal(false);
    }
  }, [creatingSeries]);

  function toggleCreateSeriesModal() {
    setShowCreateSeriesModal(!showCreateSeriesModal);
  }
  function toggleCreateCardModal() {
    setShowCreateCardModal(!showCreateCardModal);
  }
  function toggleScrapeCardModal() {
    setShowScrapeCardModal(!showScrapeCardModal);
  }

  const baseSeries = subset.series.find((series) => {
    return subset.baseSeriesId === series.id;
  });

  return (
    <AdminPageContainer>
      {showCreateSeriesModal && (
        <CreateSeriesModal
          subsetId={+props.match.params.subsetId}
          handleCancel={toggleCreateSeriesModal}
        />
      )}
      {showCreateCardModal && (
        <CreateCardModal
          handleCancel={toggleCreateCardModal}
          subsetId={+props.match.params.subsetId}
        />
      )}
      {showScrapeCardModal && (
        <CardScrapeModal
          handleCancel={toggleScrapeCardModal}
          subsetId={+props.match.params.subsetId}
        />
      )}
      <EditFormHeader text={`${subset.name} Subset`} />
      <EditSubset subsetId={+props.match.params.subsetId} />
      <WrappedDataTable
        title={`Base Set`}
        columns={seriesDataTableColumns}
        data={baseSeries ? [baseSeries] : []}
        dense
        highlightOnHover
      />
      <WrappedDataTable
        title={`Series`}
        columns={seriesDataTableColumns}
        data={subset.series
          .filter((series) => {
            return series.id !== subset.baseSeriesId;
          })
          .sort((a, b) => {
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
            return 0;
          })}
        dense
        pagination
        paginationPerPage={10}
        highlightOnHover
        actions={
          <CreateButton onClick={toggleCreateSeriesModal}>
            Create Series
          </CreateButton>
        }
      />
      <WrappedDataTable
        title={`Cards`}
        columns={cardsDataTableColumns}
        data={subset.card_data.sort((a, b) => {
          return sortCardNumbers(a.number, b.number);
        })}
        defaultSortFieldId={1}
        highlightOnHover
        pagination
        paginationPerPage={20}
        dense
        actions={
          <>
            <CreateButton onClick={toggleScrapeCardModal}>
              Bulk Add
            </CreateButton>
            <CreateButton onClick={toggleCreateCardModal}>
              Create Card
            </CreateButton>
          </>
        }
      />
    </AdminPageContainer>
  );
}
