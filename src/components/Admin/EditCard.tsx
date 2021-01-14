import React, { useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import EditCardForm from "./EditCardForm";
import { createLoadingSelector } from "../../store/loading/reducer";

const isLoadingSelector = createLoadingSelector([
  "GET_CARD_BY_ID",
  "GET_TEAMS",
]);

interface Params {
  cardId: string;
}

export default function EditCard(props: RouteComponentProps<Params>) {
  useEffect(() => {
    // fetch card and teams
  }, []);
  return (
    <div>
      <EditCardForm cardId={+props.match.params.cardId} />
    </div>
  );
}
