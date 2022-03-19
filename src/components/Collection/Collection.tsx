import React from "react";
import { useRouteMatch, Route, Switch, Redirect } from "react-router-dom";
import SelectYear from "./select_year/SelectYear";
import SelectSet from "./select_set/SelectSet";
import CollectionHeader from "./header/CollectionHeader";
import FilterPage from "./filter/FilterPage";
import CollectionWrapper from "../shared/CollectionWrapper";
import CollectionContainer from "../shared/CollectionContainer";
import Breadcrumbs from "../breadcrumbs/Breadcrumbs";

export default function Collection() {
  const { path } = useRouteMatch();
  return (
    <CollectionWrapper>
      <CollectionContainer>
        <Breadcrumbs />
        <CollectionHeader title="Your Collection" />
        <Switch>
          <Route exact path={path}>
            <SelectYear />
          </Route>
          <Route exact path={`${path}/filter`}>
            <FilterPage />
          </Route>
          <Route exact path={`${path}/:year`}>
            <SelectSet />
          </Route>
          <Route>
            <Redirect to="/404" />
          </Route>
        </Switch>
      </CollectionContainer>
    </CollectionWrapper>
  );
}
