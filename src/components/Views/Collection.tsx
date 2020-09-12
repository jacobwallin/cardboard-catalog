import React from "react";
import { useRouteMatch } from "react-router-dom";
import PrivateRoute from "../PrivateRoute";

import CollectionYears from "../CollectionYears";
import CollectionSets from "../CollectionSets";
import Set from "../Set";

export default function Collection() {
  const { path } = useRouteMatch();
  return (
    <>
      <PrivateRoute exact path={path} component={CollectionYears} />
      <PrivateRoute exact path={`${path}/:year`} component={CollectionSets} />
      <PrivateRoute exact path={`${path}/:year/:setId`} component={Set} />
    </>
  );
}
