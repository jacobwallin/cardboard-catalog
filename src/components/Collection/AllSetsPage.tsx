import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { RouteComponentProps, Link } from "react-router-dom";
import { fetchCardsBySet } from "../../store/collection/thunks";
import { RootState } from "../../store";
import { createLoadingSelector } from "../../store/loading/reducer";
import DataTable from "react-data-table-component";

const isLoadingSelector = createLoadingSelector(["GET_CARDS_BY_SET"]);

const columns = [
  {
    name: "Set Name",
    selector: "setName",
    sortable: true,
    cell: (row: any) => (
      <Link to={`/collection/set/${row.setId}`}>{row.setName}</Link>
    ),
  },
  {
    name: "Total Cards",
    selector: "totalCards",
    sortable: true,
  },
  {
    name: "Unique Cards",
    selector: "distinctCards",
    sortable: true,
  },
];

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TableContainer = styled.div`
  width: 90%;
`;

type TParams = { year: string };

const AllSetsPage: React.FC<RouteComponentProps<TParams>> = (props) => {
  const dispatch = useDispatch();

  const cardsBySet = useSelector(
    (state: RootState) => state.collection.cardsBySet
  );

  const isLoading = useSelector((state: RootState) => isLoadingSelector(state));
  const initialDataLoadComplete = useSelector(
    (state: RootState) => state.collection.initialDataLoadComplete
  );

  useEffect(() => {
    if (!initialDataLoadComplete) {
      dispatch(fetchCardsBySet());
    }
  }, []);

  return (
    <PageContainer>
      <h2>{`All Sets in ${props.match.params.year}`}</h2>
      <TableContainer>
        <DataTable
          noHeader
          progressPending={isLoading}
          columns={columns}
          data={cardsBySet.filter(
            (set) => set.year === +props.match.params.year
          )}
          highlightOnHover
          dense
        />
      </TableContainer>
    </PageContainer>
  );
};

export default AllSetsPage;
