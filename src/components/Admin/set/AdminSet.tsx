import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSet } from "../../../store/library/sets/thunks";
import { RootState } from "../../../store";
import EditLink from "../components/EditLink";
import EditSet from "./edit_set/EditSet";
import WrappedDataTable from "../components/WrappedDataTable";
import { createLoadingSelector } from "../../../store/loading/reducer";
import CreateSubsetModal from "./subset_modal/CreateSubsetModal";
import EditFormHeader from "../components/EditFormHeader";
import AdminPageContainer from "../components/AdminPageContainer";
import CreateButton from "../components/CreateButton";
import { LoadingDots } from "../../shared/Loading";
import { DataTableWrapper } from "../components/WrappedDataTable";
import DataTable from "react-data-table-component";
import dataTableColumns from "./dataTableColumns";
import aggregateSubsets, { AggregatedSubsets } from "./aggregateSubsets";

const isLoadingSelector = createLoadingSelector(["GET_SINGLE_SET"]);
const creatingSubsetSelector = createLoadingSelector(["CREATE_SUBSET"]);

export default function SetAdminPage() {
  const dispatch = useDispatch();
  let { setId } = useParams<"setId">();
  const isLoading = useSelector((state: RootState) => isLoadingSelector(state));
  const creatingSubset = useSelector((state: RootState) =>
    creatingSubsetSelector(state)
  );
  const set = useSelector((state: RootState) => state.library.sets.set);
  const [aggregatedSubsets, setAggregatedSubsets] = useState<
    AggregatedSubsets | undefined
  >(undefined);

  useEffect(() => {
    if (setId) dispatch(fetchSet(+setId));
  }, []);

  // hide create subset modal once the server has completed the post request
  useEffect(() => {
    if (!creatingSubset) {
      setShowCreateSubsetModal(false);
    }
  }, [creatingSubset]);

  useEffect(() => {
    if (set.subsets.length > 0) {
      setAggregatedSubsets(
        aggregateSubsets(set.subsets, set.baseSubsetId || 0)
      );
    }
  }, [set]);

  const [showCreateSubsetModal, setShowCreateSubsetModal] = useState(false);

  function toggleCreateSubsetModal() {
    setShowCreateSubsetModal(!showCreateSubsetModal);
  }

  if (isLoading || !setId || set.id !== +setId) {
    return (
      <AdminPageContainer>
        <LoadingDots />
      </AdminPageContainer>
    );
  }

  return (
    <AdminPageContainer>
      <EditFormHeader text={`${set.name}`} />
      <EditSet setId={+setId} />
      {aggregatedSubsets && (
        <>
          <DataTableWrapper>
            <DataTable
              dense
              highlightOnHover
              title={`Base Set`}
              columns={dataTableColumns}
              data={aggregatedSubsets.base ? [aggregatedSubsets?.base] : []}
              actions={
                <CreateButton onClick={toggleCreateSubsetModal}>
                  Create Subset
                </CreateButton>
              }
            />
          </DataTableWrapper>
          <WrappedDataTable
            dense
            title={`Short Print Sets`}
            columns={dataTableColumns}
            data={aggregatedSubsets.shortPrints}
            pagination
            paginationRowsPerPageOptions={[5, 10, 15, 20, 25, 30]}
            paginationPerPage={5}
            highlightOnHover
          />
          <WrappedDataTable
            dense
            title={`Insert Sets`}
            columns={dataTableColumns}
            data={aggregatedSubsets.inserts}
            pagination
            paginationRowsPerPageOptions={[5, 10, 15, 20, 25, 30]}
            paginationPerPage={10}
            highlightOnHover
          />
          <WrappedDataTable
            dense
            title={`Auto / Relic Sets`}
            columns={dataTableColumns}
            data={aggregatedSubsets.autoRelic}
            pagination
            paginationRowsPerPageOptions={[5, 10, 15, 20, 25, 30]}
            paginationPerPage={10}
            highlightOnHover
          />
        </>
      )}
      {showCreateSubsetModal && (
        <CreateSubsetModal
          handleCancel={toggleCreateSubsetModal}
          setId={+setId}
        />
      )}
    </AdminPageContainer>
  );
}
