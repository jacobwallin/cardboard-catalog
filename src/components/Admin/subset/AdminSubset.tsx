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
import CreateButton from "../components/CreateButton";

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

  if (isLoading) {
    return <h1>LOADING DATA</h1>;
  }
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
      <EditFormHeader text={`Edit ${subset.name} Subset`} />
      <EditSubset subsetId={+props.match.params.subsetId} />
      <WrappedDataTable
        title={`Series in ${subset.name}`}
        columns={seriesDataTableColumns}
        data={subset.series}
        highlightOnHover
        actions={
          <CreateButton onClick={toggleCreateSeriesModal}>
            Create Series
          </CreateButton>
        }
      />
      <WrappedDataTable
        title={`Cards in ${subset.name}`}
        columns={cardsDataTableColumns}
        data={subset.card_data}
        highlightOnHover
        pagination
        paginationPerPage={20}
        dense
        actions={
          <CreateButton onClick={toggleCreateCardModal}>
            Create Card
          </CreateButton>
        }
      />
    </AdminPageContainer>
  );
}
