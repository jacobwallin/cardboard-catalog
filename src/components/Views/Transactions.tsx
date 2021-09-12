import React from "react";
import PrivateRoute from "../Protected_Routes/PrivateRoute";
import { useRouteMatch } from "react-router-dom";
import AddCardsForm from "../add_cards_form/AddCardsForm";

export default function Transactions() {
  const { path } = useRouteMatch();
  return <PrivateRoute exact path={path} component={AddCardsForm} />;
}
