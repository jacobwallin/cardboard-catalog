import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { RootState } from "../../../store";
import EditCard from "./edit_card/EditCard";
import { createLoadingSelector } from "../../../store/loading/reducer";
import { fetchCard } from "../../../store/library/card/thunks";

import EditFormHeader from "../components/EditFormHeader";
import AdminPageContainer from "../components/AdminPageContainer";

const isLoadingSelector = createLoadingSelector(["GET_CARD"]);

interface Params {
  cardId: string;
}

export default function AdminCard(props: RouteComponentProps<Params>) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCard(+props.match.params.cardId));
  }, []);

  const isLoading = useSelector((state: RootState) => isLoadingSelector(state));
  const card = useSelector((state: RootState) => state.library.card);

  if (isLoading) {
    return <div>LOADING</div>;
  }

  return (
    <AdminPageContainer>
      <EditFormHeader text={`Edit ${card.name} Card`} />
      <EditCard cardDataId={+props.match.params.cardId} />
    </AdminPageContainer>
  );
}