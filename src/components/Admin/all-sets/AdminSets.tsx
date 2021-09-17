import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllSetData } from "../../../store/library/sets/thunks";
import { RootState } from "../../../store";
import DataTable from "react-data-table-component";
import dataTableColumns from "./dataTableColumns";
import AdminPageContainer from "../components/AdminPageContainer";
import StyledButton from "../components/StyledButton";
import * as Styled from "./styled";

import CreateSetModal from "./create-set-modal/CreateSetModal";

export default function AdminSets(props: any) {
  const dispatch = useDispatch();
  const allSets = useSelector((state: RootState) => state.library.sets.allSets);
  useEffect(() => {
    dispatch(fetchAllSetData());
  }, []);
  // toggle to show form for creating a new set
  const [createSet, setCreateSet] = useState(false);
  function toggleModal() {
    setCreateSet(!createSet);
  }
  return (
    <AdminPageContainer>
      {createSet && <CreateSetModal handleCancel={toggleModal} />}
      <Styled.Header>Manage Set Library</Styled.Header>
      <Styled.TableHeader>
        <h3>Sets</h3>
        <StyledButton
          color="GREEN"
          width="125px"
          onClick={() => setCreateSet(true)}
        >
          CREATE SET
        </StyledButton>
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
