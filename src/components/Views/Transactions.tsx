import React from "react";
import { Route } from "react-router";
import { useRouteMatch } from "react-router-dom";
import AddCardsForm from "../add_cards_form/AddCardsForm";

import CollectionWrapper from "../shared/CollectionWrapper";
import CollectionContainer from "../shared/CollectionContainer";
import QuickAddHeader from "../Collection/header/QuickAddHeader";

export default function Transactions() {
  const { path } = useRouteMatch();
  return (
    <CollectionWrapper>
      <CollectionContainer>
        <QuickAddHeader title="Add to Your Collection" />

        <AddCardsForm />
      </CollectionContainer>
    </CollectionWrapper>
  );
}
