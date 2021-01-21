import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { RootState } from "../../store";
import EditCardForm from "./EditCardForm";
import { createLoadingSelector } from "../../store/loading/reducer";
import { fetchAllTeams } from "../../store/library/teams/thunks";
import { fetchCardById } from "../../store/library/card/thunks";

import EditFormHeader from "./components/EditFormHeader";
import EditPageContainer from "./components/EditPageContainer";

const isLoadingSelector = createLoadingSelector([
  "GET_CARD_BY_ID",
  "GET_ALL_TEAMS",
]);

interface Params {
  cardId: string;
}

export default function EditCard(props: RouteComponentProps<Params>) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllTeams());
    dispatch(fetchCardById(+props.match.params.cardId));
  }, []);

  const isLoading = useSelector((state: RootState) => isLoadingSelector(state));
  const card = useSelector((state: RootState) => state.library.card);

  if (isLoading) {
    return <div>LOADING</div>;
  }

  return (
    <EditPageContainer>
      <EditFormHeader text={`Edit ${card.name} Card`} />
      <EditCardForm cardId={+props.match.params.cardId} />
    </EditPageContainer>
  );
}
