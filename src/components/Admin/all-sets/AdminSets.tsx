import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllSetData } from "../../../store/library/sets/thunks";
import { RootState } from "../../../store";
import CreateSetModal from "./create-set-modal/CreateSetModal";
import DataTable from "react-data-table-component";
import dataTableColumns from "./dataTableColumns";
import AdminPageContainer from "../components/AdminPageContainer";
import StyledButton from "../components/StyledButton";
import CreateButton from "../components/CreateButton";
import * as Styled from "./styled";
import { createStatusSelector } from "../../../store/loading/reducer";

const createSetSelector = createStatusSelector("CREATE_SET");

export default function AdminSets(props: any) {
  const dispatch = useDispatch();

  // toggle to show form for creating a new set
  const [createSet, setCreateSet] = useState(false);

  const allSets = useSelector((state: RootState) => state.library.sets.allSets);
  const createSetStatus = useSelector((state: RootState) =>
    createSetSelector(state)
  );

  useEffect(() => {
    dispatch(fetchAllSetData());
  }, []);

  // if loading status of updating set changes to success, hide the form
  useEffect(() => {
    if (createSetStatus === "SUCCESS") {
      setCreateSet(false);
    }
  }, [createSetStatus]);

  function toggleModal() {
    setCreateSet(!createSet);
  }
  return (
    <AdminPageContainer>
      {createSet && <CreateSetModal handleCancel={toggleModal} />}
      <Styled.Header>Manage Set Library</Styled.Header>
      <Styled.TableHeader>
        <h3>Sets</h3>
        <CreateButton onClick={() => setCreateSet(true)}>
          Create Set
        </CreateButton>
      </Styled.TableHeader>
      <Styled.TableWrapper>
        <DataTable
          noHeader
          columns={dataTableColumns}
          data={allSets}
          highlightOnHover
          pagination
          paginationPerPage={20}
          dense
        />
      </Styled.TableWrapper>
    </AdminPageContainer>
  );
}
