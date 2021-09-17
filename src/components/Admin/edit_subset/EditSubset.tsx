import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { RootState } from "../../../store";
import { fetchSubset } from "../../../store/library/subsets/thunks";
import WrappedDataTable from "../components/WrappedDataTable";
import { createLoadingSelector } from "../../../store/loading/reducer";
import SubsetForm from "./subset_form/SubsetForm";
import EditLink from "../components/EditLink";
import EditFormHeader from "../components/EditFormHeader";
import AdminPageContainer from "../components/AdminPageContainer";
import CreateSeriesModal from "./series_modal/CreateSeriesModal";
import StyledButton from "../components/StyledButton";

const isLoadingSelector = createLoadingSelector(["GET_SUBSET"]);

interface Params {
  subsetId: string;
}

const seriesColumns = [
  {
    name: "Name",
    selector: "name",
    sortable: true,
  },
  {
    name: "",
    sortable: false,
    cell: (row: any) => <EditLink to={`/admin/edit/series/${row.id}`} />,
    grow: 0,
  },
];
const cardsColumns = [
  {
    name: "Card Number",
    selector: "number",
    sortFunction: (rowA: any, rowB: any) => {
      // trye to convert to number first and then sort
      if (+rowA && +rowB) return +rowA - +rowB;
      // if card number is not a number (contains characters), sort with string value
      if (rowA < rowB) return -1;
      return 1;
    },
    sortable: false,
  },
  {
    name: "Name",
    selector: "name",
    sortable: true,
  },
  {
    name: "Team",
    selector: "team.name",
    sortable: true,
  },
  {
    name: "Rookie",
    sortable: false,
    cell: (row: any) => (row.rookie ? "RC" : ""),
  },
  {
    name: "",
    sortable: false,
    cell: (row: any) => <EditLink to={`/admin/edit/card/${row.cardDataId}`} />,
    grow: 0,
  },
];

export default function EditSubset(props: RouteComponentProps<Params>) {
  const [showCreateSeriesModal, setShowCreateSeriesModal] = useState(true);

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
        columns={seriesColumns}
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
        columns={cardsColumns}
        data={subset.card_data}
        defaultSortField="number"
        highlightOnHover
        pagination
        paginationPerPage={20}
        dense
      />
    </AdminPageContainer>
  );
}
