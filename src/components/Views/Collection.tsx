import React from "react";
import { useRouteMatch } from "react-router-dom";
import PrivateRoute from "../PrivateRoute";

import CollectionYears from "../CollectionYears";
import CollectionAllSets from "../CollectionAllSets";
import CollectionSet from "../CollectionSet";
import CollectionSubset from "../CollectionSubset";

export default function Collection() {
  const { path } = useRouteMatch();
  return (
    <>
      <PrivateRoute exact path={path} component={CollectionYears} />
      <PrivateRoute
        exact
        path={`${path}/:year`}
        component={CollectionAllSets}
      />
      <PrivateRoute
        exact
        path={`${path}/:year/:setId`}
        component={CollectionSet}
      />
      <PrivateRoute
        exact
        path={`${path}/:year/:setId/:subsetId`}
        component={CollectionSubset}
      />
    </>
  );
}
