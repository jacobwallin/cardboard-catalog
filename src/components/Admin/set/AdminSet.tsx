import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSet } from "../../../store/library/sets/thunks";
import { RootState } from "../../../store";
import EditSet from "./edit_set/EditSet";
import { createLoadingSelector } from "../../../store/loading/reducer";
import CreateSubsetModal from "./subset_modal/CreateSubsetModal";
import EditFormHeader from "../components/EditFormHeader";
import AdminPageContainer from "../components/AdminPageContainer";
import CreateButton from "../components/CreateButton";
import { LoadingDots } from "../../shared/Loading";
import DataTable from "react-data-table-component";
import * as DataTableComponents from "../components/DataTableComponents";
import dataTableColumns from "./dataTableColumns";
import aggregateSubsets, { AggregatedSubsets } from "./aggregateSubsets";
import { NoDataMessage } from "../../shared/NoDataMessage";

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
      {/* <EditFormHeader text={`${set.name}`} /> */}
      <EditSet setId={+setId} />
      {aggregatedSubsets && (
        <>
          <DataTableComponents.DataTableWrapper>
            <DataTableComponents.DataTableHeader>
              <DataTableComponents.DataTableTitle>
                Base Set
              </DataTableComponents.DataTableTitle>
              <DataTableComponents.DataTableButtonsContainer>
                <CreateButton onClick={toggleCreateSubsetModal}>
                  Create Subset
                </CreateButton>
              </DataTableComponents.DataTableButtonsContainer>
            </DataTableComponents.DataTableHeader>
            <DataTable
              noHeader
              dense
              highlightOnHover
              columns={dataTableColumns}
              data={aggregatedSubsets.base ? [aggregatedSubsets?.base] : []}
            />
          </DataTableComponents.DataTableWrapper>
          <DataTableComponents.DataTableWrapper>
            <DataTableComponents.DataTableHeader>
              <DataTableComponents.DataTableTitle>
                Short Prints
              </DataTableComponents.DataTableTitle>
            </DataTableComponents.DataTableHeader>
            <DataTable
              noHeader
              dense
              columns={dataTableColumns}
              data={aggregatedSubsets.shortPrints}
              pagination
              paginationRowsPerPageOptions={[5, 10, 15, 20, 25, 30]}
              paginationPerPage={5}
              highlightOnHover
              noDataComponent={
                <NoDataMessage>
                  No short print sets have been created.
                </NoDataMessage>
              }
            />
          </DataTableComponents.DataTableWrapper>
          <DataTableComponents.DataTableWrapper>
            <DataTableComponents.DataTableHeader>
              <DataTableComponents.DataTableTitle>
                Inserts
              </DataTableComponents.DataTableTitle>
            </DataTableComponents.DataTableHeader>
            <DataTable
              noHeader
              dense
              columns={dataTableColumns}
              data={aggregatedSubsets.inserts}
              pagination
              paginationRowsPerPageOptions={[5, 10, 15, 20, 25, 30]}
              paginationPerPage={10}
              highlightOnHover
              noDataComponent={
                <NoDataMessage>No insert sets have been created.</NoDataMessage>
              }
            />
          </DataTableComponents.DataTableWrapper>
          <DataTableComponents.DataTableWrapper>
            <DataTableComponents.DataTableHeader>
              <DataTableComponents.DataTableTitle>
                Autos & Relics
              </DataTableComponents.DataTableTitle>
            </DataTableComponents.DataTableHeader>
            <DataTable
              noHeader
              dense
              columns={dataTableColumns}
              data={aggregatedSubsets.autoRelic}
              pagination
              paginationRowsPerPageOptions={[5, 10, 15, 20, 25, 30]}
              paginationPerPage={10}
              highlightOnHover
              noDataComponent={
                <NoDataMessage>
                  No auto / relic sets have been created.
                </NoDataMessage>
              }
            />
          </DataTableComponents.DataTableWrapper>
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
