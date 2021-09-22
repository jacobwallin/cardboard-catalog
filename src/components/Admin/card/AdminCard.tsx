import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { RootState } from "../../../store";
import EditCardForm from "./edit_card/EditCard";
import { createLoadingSelector } from "../../../store/loading/reducer";
import { fetchAllTeams } from "../../../store/library/teams/thunks";
import { fetchCard } from "../../../store/library/card/thunks";

import EditFormHeader from "../components/EditFormHeader";
import AdminPageContainer from "../components/AdminPageContainer";

const isLoadingSelector = createLoadingSelector(["GET_CARD", "GET_ALL_TEAMS"]);

interface Params {
  cardId: string;
}

export default function EditCard(props: RouteComponentProps<Params>) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllTeams());
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
      <EditCardForm cardDataId={+props.match.params.cardId} />
    </AdminPageContainer>
  );
}
