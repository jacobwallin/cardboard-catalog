import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
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

const columns = [
  {
    name: "Name",
    selector: "name",
    sortable: true,
    grow: 1,
  },
  {
    name: "",
    sortable: false,
    cell: (row: any) => <EditLink to={`/admin/edit/subset/${row.id}`} />,
    grow: 0,
  },
];

const isLoadingSelector = createLoadingSelector(["GET_SINGLE_SET"]);
const creatingSubsetSelector = createLoadingSelector(["CREATE_SUBSET"]);
interface Params {
  setId: string;
}

export default function SetAdminPage(props: RouteComponentProps<Params>) {
  const dispatch = useDispatch();
  const isLoading = useSelector((state: RootState) => isLoadingSelector(state));
  const creatingSubset = useSelector((state: RootState) =>
    creatingSubsetSelector(state)
  );
  const set = useSelector((state: RootState) => state.library.sets.set);

  useEffect(() => {
    dispatch(fetchSet(+props.match.params.setId));
  }, []);

  // hide create subset modal once the server has completed the post request
  useEffect(() => {
    if (!creatingSubset) {
      setShowCreateSubsetModal(false);
    }
  }, [creatingSubset]);

  const [showCreateSubsetModal, setShowCreateSubsetModal] = useState(false);

  function toggleCreateSubsetModal() {
    setShowCreateSubsetModal(!showCreateSubsetModal);
  }

  const baseSubset = set.subsets.find((subset) => {
    return subset.id === set.baseSubsetId;
  });

  if (isLoading || set.id !== +props.match.params.setId) {
    return (
      <AdminPageContainer>
        <LoadingDots />
      </AdminPageContainer>
    );
  }

  return (
    <AdminPageContainer>
      <EditFormHeader text={`${set.name}`} />
      <EditSet setId={+props.match.params.setId} />
      <DataTableWrapper>
        <DataTable
          dense
          highlightOnHover
          title={`Base Set`}
          columns={columns}
          data={baseSubset ? [baseSubset] : []}
        />
      </DataTableWrapper>
      <WrappedDataTable
        dense
        title={`Inserts and Other Sets`}
        columns={columns}
        data={set.subsets
          .filter((subset) => {
            return subset.id !== set.baseSubsetId;
          })
          .sort((a, b) => {
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
            return 0;
          })}
        highlightOnHover
        actions={
          <CreateButton onClick={toggleCreateSubsetModal}>
            Create Subset
          </CreateButton>
        }
      />
      {showCreateSubsetModal && (
        <CreateSubsetModal
          handleCancel={toggleCreateSubsetModal}
          setId={+props.match.params.setId}
        />
      )}
    </AdminPageContainer>
  );
}
