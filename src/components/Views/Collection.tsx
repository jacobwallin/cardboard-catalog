import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";

import CollectionYears from "../CollectionYears";
import CollectionSets from "../CollectionSets";
import Set from "../Set";

export default function Collection() {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path}>
        <CollectionYears />
      </Route>
      <Route exact path={`${path}/:year`}>
        <CollectionSets />
      </Route>
      <Route exact path={`${path}/:year/:setId`}>
        <Set />
      </Route>
    </Switch>
  );
}
