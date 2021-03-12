import React from "react";
import { useRouteMatch } from "react-router-dom";
import PrivateRoute from "../Protected_Routes/PrivateRoute";

import CardsByYearPage from "../Collection/CardsByYearPage";
import AllSetsPage from "../Collection/AllSetsPage";
import SetPage from "../Collection/SetPage";
import SubsetPage from "../Collection/SubsetPage";

export default function Collection() {
  const { path } = useRouteMatch();
  return (
    <>
      <PrivateRoute exact path={path} component={CardsByYearPage} />
      <PrivateRoute exact path={`${path}/:year`} component={AllSetsPage} />
      <PrivateRoute exact path={`${path}/set/:setId`} component={SetPage} />
      <PrivateRoute
        exact
        path={`${path}/subset/:subsetId`}
        component={SubsetPage}
      />
    </>
  );
}
