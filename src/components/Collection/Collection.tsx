import React from "react";
import { useRouteMatch } from "react-router-dom";
import PrivateRoute from "../Protected_Routes/PrivateRoute";

import CardsByYearPage from "./main_page/CardsByYearPage";
import AllSetsPage from "./all_sets_page/AllSetsPage";
import SetPage from "./set_page/SetPage";
import SubsetPage from "./subset_page/SubsetPage";
import CollectionContainer from "./CollectionContainer";

export default function Collection() {
  const { path } = useRouteMatch();
  return (
    <CollectionContainer>
      <PrivateRoute exact path={path} component={CardsByYearPage} />
      <PrivateRoute exact path={`${path}/:year`} component={AllSetsPage} />
      <PrivateRoute exact path={`${path}/set/:setId`} component={SetPage} />
      <PrivateRoute
        exact
        path={`${path}/subset/:subsetId`}
        component={SubsetPage}
      />
    </CollectionContainer>
  );
}
