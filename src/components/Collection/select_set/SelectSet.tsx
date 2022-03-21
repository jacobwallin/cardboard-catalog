import React, { useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchCardsBySet } from "../../../store/collection/browse/thunks";
import { RootState } from "../../../store";
import { createLoadingSelector } from "../../../store/loading/reducer";
import DataTable from "react-data-table-component";
import * as Shared from "../shared";
import PageContainer from "../../shared/PageContainer";
import columns from "./dataTableColumns";
import { LoadingDots } from "../../shared/Loading";

const isLoadingSelector = createLoadingSelector(["GET_CARDS_BY_SET"]);

const SelectSet = () => {
  const dispatch = useDispatch();
  let { year } = useParams<"year">();

  // TODO: memoize?
  const cardsBySetForYear = useSelector(
    (state: RootState) => state.collection.browse.cardsBySet
  ).filter((set) => {
    if (year) {
      return set.year === +year;
    }
    return false;
  });

  const isLoading = useSelector((state: RootState) => isLoadingSelector(state));
  const initialDataLoadComplete = useSelector(
    (state: RootState) => state.collection.browse.initialDataLoadComplete
  );

  useEffect(() => {
    if (!initialDataLoadComplete) {
      dispatch(fetchCardsBySet());
    }
  }, []);

  // render 404 if year param is not a year
  if (!year || !/^\d{4}$/.test(year)) {
    return <Navigate to="/404" />;
  }

  if (isLoading) return <LoadingDots />;

  return (
    <PageContainer>
      <Shared.DataTableContainer>
        <DataTable
          title={
            <Shared.DataTableTitle>{`Sets from ${year}`}</Shared.DataTableTitle>
          }
          actions={
            <Shared.TotalCards
              totalCards={cardsBySetForYear.reduce((totalCards, set) => {
                return (totalCards += +set.totalCards);
              }, 0)}
            />
          }
          progressPending={isLoading}
          columns={columns}
          data={cardsBySetForYear}
          highlightOnHover
          theme="grey"
          dense
          pagination={cardsBySetForYear.length > 10}
          paginationRowsPerPageOptions={[10, 20, 30, 40, 50]}
          paginationPerPage={20}
        />
      </Shared.DataTableContainer>
    </PageContainer>
  );
};

export default SelectSet;
