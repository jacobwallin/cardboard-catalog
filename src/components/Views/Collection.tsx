import React from "react";
import { useRouteMatch } from "react-router-dom";
import PrivateRoute from "../Protected_Routes/PrivateRoute";

import CollectionYears from "../Collection/CollectionYears";
import CollectionAllSets from "../Collection/CollectionAllSets";
import CollectionSet from "../Collection/CollectionSet";
import CollectionSubset from "../Collection/CollectionSubset";

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
