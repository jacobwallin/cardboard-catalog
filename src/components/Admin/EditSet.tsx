import React, { useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSet } from "../../store/library/sets/thunks";
import { fetchBrands } from "../../store/library/brands/thunks";
import { fetchLeagues } from "../../store/library/leagues/thunks";
import { RootState } from "../../store";
import EditLink from "./components/EditLink";
import EditSetForm from "./EditSetForm";
import WrappedDataTable from "./components/WrappedDataTable";
import { createLoadingSelector } from "../../store/loading/reducer";

import EditFormHeader from "./components/EditFormHeader";
import EditPageContainer from "./components/EditPageContainer";

const columns = [
  {
    name: "Name",
    selector: "name",
    sortable: true,
    grow: 1,
  },
  {
    name: "Card Qty",
    selector: "cardQuantity",
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

const isLoadingSelector = createLoadingSelector([
  "GET_SINGLE_SET",
  "GET_BRANDS",
  "GET_LEAGUES",
]);
interface Params {
  setId: string;
}

export default function SetAdminPage(props: RouteComponentProps<Params>) {
  const dispatch = useDispatch();
  const isLoading = useSelector((state: RootState) => isLoadingSelector(state));
  const singleSet = useSelector(
    (state: RootState) => state.library.sets.singleSet
  );

  useEffect(() => {
    dispatch(fetchSet(+props.match.params.setId));
    dispatch(fetchBrands());
    dispatch(fetchLeagues());
  }, []);
  return (
    <EditPageContainer>
      {!isLoading && (
        <>
          <EditFormHeader text={`Edit ${singleSet.name} Set`} />
          <EditSetForm />
          <WrappedDataTable
            title={`Subsets in ${singleSet.name}`}
            columns={columns}
            data={singleSet.subsets}
            highlightOnHover
          />
        </>
      )}
    </EditPageContainer>
  );
}
