import React from "react";
import { useRouteMatch, Route } from "react-router-dom";
import CardsByYearPage from "./main_page/CardsByYearPage";
import AllSetsPage from "./all_sets_page/AllSetsPage";
import SetPage from "./set_page/SetPage";
import SubsetPage from "./subset_page/SubsetPage";
import CollectionWrapper from "./CollectionWrapper";
import CollectionContainer from "./CollectionContainer";
import CollectionHeader from "./CollectionHeader";

export default function Collection() {
  const { path } = useRouteMatch();
  return (
    <CollectionWrapper>
      <CollectionContainer>
        <CollectionHeader />
        <Route exact path={path} component={CardsByYearPage} />
        <Route exact path={`${path}/:year`} component={AllSetsPage} />
        <Route exact path={`${path}/set/:setId`} component={SetPage} />
        <Route exact path={`${path}/subset/:subsetId`} component={SubsetPage} />
      </CollectionContainer>
    </CollectionWrapper>
  );
}
