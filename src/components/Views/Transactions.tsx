import React from "react";
import { Route } from "react-router";
import { useRouteMatch } from "react-router-dom";
import AddCardsForm from "../add_cards_form/AddCardsForm";

import CollectionWrapper from "../shared/CollectionWrapper";
import CollectionContainer from "../shared/CollectionContainer";

export default function Transactions() {
  const { path } = useRouteMatch();
  return (
    <CollectionWrapper>
      <CollectionContainer>
        <Route exact path={path}>
          <AddCardsForm />
        </Route>
      </CollectionContainer>
    </CollectionWrapper>
  );
}
