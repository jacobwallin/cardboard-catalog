import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { RootState } from "../../../store";
import { fetchSubset } from "../../../store/library/subsets/thunks";
import WrappedDataTable from "../components/WrappedDataTable";
import { createLoadingSelector } from "../../../store/loading/reducer";
import SubsetForm from "./subset_form/SubsetForm";
import EditFormHeader from "../components/EditFormHeader";
import AdminPageContainer from "../components/AdminPageContainer";
import CreateSeriesModal from "./series_modal/CreateSeriesModal";
import StyledButton from "../components/StyledButton";

import {
  cardsDataTableColumns,
  seriesDataTableColumns,
} from "./dataTableColumns";

const isLoadingSelector = createLoadingSelector(["GET_SUBSET"]);

interface Params {
  subsetId: string;
}

export default function EditSubset(props: RouteComponentProps<Params>) {
  const [showCreateSeriesModal, setShowCreateSeriesModal] = useState(false);

  const dispatch = useDispatch();

  const subset = useSelector(
    (state: RootState) => state.library.subsets.subset
  );
  const isLoading = useSelector((state: RootState) => isLoadingSelector(state));

  useEffect(() => {
    dispatch(fetchSubset(+props.match.params.subsetId));
  }, []);

  function toggleCreateSeriesModal() {
    setShowCreateSeriesModal(!showCreateSeriesModal);
  }

  if (isLoading) {
    return <h1>LOADING DATA</h1>;
  }
  return (
    <AdminPageContainer>
      {showCreateSeriesModal && (
        <CreateSeriesModal handleCancel={toggleCreateSeriesModal} />
      )}
      <EditFormHeader text={`Edit ${subset.name} Subset`} />
      <SubsetForm />
      <WrappedDataTable
        title={`Series in ${subset.name}`}
        columns={seriesDataTableColumns}
        data={subset.series}
        highlightOnHover
        actions={
          <StyledButton color="YELLOW" onClick={toggleCreateSeriesModal}>
            Create Series
          </StyledButton>
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
      />
    </AdminPageContainer>
  );
}
