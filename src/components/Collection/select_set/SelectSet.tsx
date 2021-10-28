import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { fetchCardsBySet } from "../../../store/collection/browse/thunks";
import { RootState } from "../../../store";
import { createLoadingSelector } from "../../../store/loading/reducer";
import DataTable from "react-data-table-component";
import * as Shared from "../shared";
import columns from "./dataTableColumns";
import { LoadingDots } from "../../shared/Loading";

const isLoadingSelector = createLoadingSelector(["GET_CARDS_BY_SET"]);

type TParams = { year: string };

const SelectSet: React.FC<RouteComponentProps<TParams>> = (props) => {
  const dispatch = useDispatch();

  const cardsBySetForYear = useSelector(
    (state: RootState) => state.collection.browse.cardsBySet
  ).filter((set) => set.release_date.slice(0, 4) === props.match.params.year);

  const isLoading = useSelector((state: RootState) => isLoadingSelector(state));
  const initialDataLoadComplete = useSelector(
    (state: RootState) => state.collection.browse.initialDataLoadComplete
  );

  useEffect(() => {
    if (!initialDataLoadComplete) {
      dispatch(fetchCardsBySet());
    }
  }, []);

  if (isLoading) return <LoadingDots />;

  return (
    <Shared.CollectionPageContainer>
      <Shared.DataTableContainer>
        <DataTable
          title={
            <Shared.DataTableTitle>{`Sets from ${props.match.params.year}`}</Shared.DataTableTitle>
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
        />
      </Shared.DataTableContainer>
    </Shared.CollectionPageContainer>
  );
};

export default SelectSet;
