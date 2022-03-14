import React from "react";
import { Switch, Route } from "react-router-dom";
import CollectionWrapper from "../shared/CollectionWrapper";
import CollectionContainer from "../shared/CollectionContainer";
import Main from "./main/Main";
import AddCards from "./add/AddCards";
import RemoveCards from "./remove/RemoveCards";
import Trade from "./trade/Trade";
import SalePurchase from "./sale-purchase/SalePurchase";
import ViewTransaction from "./view/ViewTransaction";
import Breadcrumbs from "../breadcrumbs/Breadcrumbs";

export default function Transactions() {
  return (
    <CollectionWrapper>
      <CollectionContainer>
        <Breadcrumbs />
        <Switch>
          <Route exact path={`/transactions`}>
            <Main />
          </Route>
          <Route path={`/transactions/add`}>
            <AddCards />
          </Route>
          <Route path={`/transactions/remove`}>
            <RemoveCards />
          </Route>
          <Route path={`/transactions/trade`}>
            <Trade />
          </Route>
          <Route path={`/transactions/sale`}>
            <SalePurchase transactionType="SALE" />
          </Route>
          <Route path={`/transactions/purchase`}>
            <SalePurchase transactionType="PURCHASE" />
          </Route>
          <Route path={`/transactions/:transactionId`}>
            <ViewTransaction />
          </Route>
        </Switch>
      </CollectionContainer>
    </CollectionWrapper>
  );
}
