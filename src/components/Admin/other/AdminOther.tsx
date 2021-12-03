import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { fetchAllPlayers } from "../../../store/library/players/thunks";
import AdminPageContainer from "../components/AdminPageContainer";
import EditFormHeader from "../components/EditFormHeader";
import { DataTableWrapper } from "../components/WrappedDataTable";
import DataTable from "react-data-table-component";
// import columns from "./columns";
import StyledButton from "../components/StyledButton";
import { Player } from "../../../store/library/players/types";
// import PlayerModal from "./PlayerModal";
import * as Styled from "./styled";

export default function AdminOther() {
  return (
    <AdminPageContainer>
      <EditFormHeader text="Manage Brands" />
      <EditFormHeader text="Manage Grading Companies" />
    </AdminPageContainer>
  );
}
