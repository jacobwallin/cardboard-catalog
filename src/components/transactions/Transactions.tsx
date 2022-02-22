import React from "react";
import { Switch, Route } from "react-router-dom";
import CollectionWrapper from "../shared/CollectionWrapper";
import CollectionContainer from "../shared/CollectionContainer";
import Main from "./main/Main";
import QuickAdd from "./quick-add/QuickAdd";

export default function Transactions() {
  return (
    <CollectionWrapper>
      <CollectionContainer>
        <Switch>
          <Route exact path={`/transactions`}>
            <Main />
          </Route>
          <Route path={`/transactions/add`}>
            <QuickAdd />
          </Route>
        </Switch>
      </CollectionContainer>
    </CollectionWrapper>
  );
}
