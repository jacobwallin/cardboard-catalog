import React, { useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { RootState } from "../../store";
import { fetchCardsBySubset } from "../../store/collection/thunks";
import { fetchSet } from "../../store/library/sets/thunks";
import { createLoadingSelector } from "../../store/loading/reducer";
import DataTable from "react-data-table-component";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContentContainer = styled.div`
  background: white;
  border-radius: 5px;
  padding: 10px;
  margin: 0 0 20px 0;
  width: 90%;
`;

const TableContainer = styled.div`
  width: 90%;
  border-radius: 5px;
`;

const dataTableColumns = [
  {
    name: "Subset",
    selector: "name",
    sortable: true,
    cell: (row: any) => (
      <Link to={`/collection/subset/${row.id}`}>{row.name}</Link>
    ),
  },
  {
    name: "Total Cards",
    selector: "totalCards",
    sortable: true,
  },
  {
    name: "Distinct Cards",
    selector: "distinctCards",
    sortable: true,
  },
];

const loadingSelector = createLoadingSelector([
  "GET_SINGLE_SET",
  "GET_CARDS_BY_SUBSET",
]);

type TParams = {
  setId: string;
};

const SetPage = (props: RouteComponentProps<TParams>) => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state: RootState) => loadingSelector(state));
  const cardsBySubset = useSelector(
    (state: RootState) => state.collection.cardsBySubset
  );
  const singleSet = useSelector(
    (state: RootState) => state.library.sets.singleSet
  );
  const setId = +props.match.params.setId;

  useEffect(() => {
    dispatch(fetchCardsBySubset(setId));
    dispatch(fetchSet(setId));
  }, []);

  if (isLoading) {
    return <h1>LOADING</h1>;
  }

  return (
    <PageContainer>
      <h2>{singleSet.name}</h2>
      <ContentContainer>
        <h4>About:</h4>
        {singleSet.description}
      </ContentContainer>
      <TableContainer>
        <DataTable
          noHeader
          progressPending={isLoading}
          columns={dataTableColumns}
          data={singleSet.subsets.map((subset) => {
            const collectionSubsetData = cardsBySubset.subsets.find(
              (collectionSubset) => subset.id === collectionSubset.subsetId
            );
            return {
              name: subset.name,
              id: subset.id,
              totalCards: collectionSubsetData
                ? collectionSubsetData.totalCards
                : 0,
              distinctCards: collectionSubsetData
                ? collectionSubsetData.distinctCards
                : 0,
            };
          })}
          highlightOnHover
        />
      </TableContainer>
    </PageContainer>
  );
};

export default SetPage;
