import React from "react";
import { useRouteMatch, Route, Switch, Redirect } from "react-router-dom";
import CardsByYearPage from "./main_page/CardsByYearPage";
import AllSetsPage from "./all_sets_page/AllSetsPage";
import CollectionWrapper from "./CollectionWrapper";
import CollectionContainer from "./CollectionContainer";
import CollectionHeader from "./CollectionHeader";
import FilterPage from "./filter/FilterPage";

export default function Collection() {
  const { path } = useRouteMatch();
  return (
    <CollectionWrapper>
      <CollectionContainer>
        <CollectionHeader />
        <Switch>
          <Route exact path={path} component={CardsByYearPage} />
          <Route exact path={`${path}/filter`} component={FilterPage} />
          <Route exact path={`${path}/:year`} component={AllSetsPage} />
          <Route>
            <Redirect to="/404" />
          </Route>
        </Switch>
      </CollectionContainer>
    </CollectionWrapper>
  );
}
