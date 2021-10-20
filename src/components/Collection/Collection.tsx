import React from "react";
import { useRouteMatch, Route, Switch, Redirect } from "react-router-dom";
import SelectYear from "./select_year/SelectYear";
import SelectSet from "./select_set/SelectSet";
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
          <Route exact path={path} component={SelectYear} />
          <Route exact path={`${path}/filter`} component={FilterPage} />
          <Route exact path={`${path}/:year`} component={SelectSet} />
          <Route>
            <Redirect to="/404" />
          </Route>
        </Switch>
      </CollectionContainer>
    </CollectionWrapper>
  );
}
