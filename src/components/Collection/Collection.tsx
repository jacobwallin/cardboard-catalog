import React from "react";
import { useRouteMatch, Route, Switch, Redirect } from "react-router-dom";
import CardsByYearPage from "./main_page/CardsByYearPage";
import AllSetsPage from "./all_sets_page/AllSetsPage";
import CollectionHeader from "./header/CollectionHeader";
import FilterPage from "./filter/FilterPage";
import CollectionWrapper from "../shared/CollectionWrapper";
import CollectionContainer from "../shared/CollectionContainer";

export default function Collection() {
  const { path } = useRouteMatch();
  return (
    <CollectionWrapper>
      <CollectionContainer>
        <CollectionHeader title="Your Collection" />
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
