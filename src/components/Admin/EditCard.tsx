import React from "react";
import { RouteComponentProps } from "react-router-dom";
import EditCardForm from "./EditCardForm";

interface Params {
  cardId: string;
}

export default function EditCard(props: RouteComponentProps<Params>) {
  return (
    <div>
      <EditCardForm cardId={+props.match.params.cardId} />
    </div>
  );
}
