import React from "react";
import { Route, useRouteMatch } from "react-router-dom";
import Sidebar from "./Sidebar";
import AdminSets from "./all-sets/AdminSets";
import AdminSet from "./set/AdminSet";
import AdminSubset from "./subset/AdminSubset";
import AdminSeries from "./series/AdminSeries";
import AdminCard from "./card/AdminCard";
import * as Styled from "./styled";

export default function Admin() {
  const { path } = useRouteMatch();

  return (
    <Styled.AdminWrapper>
      <Sidebar />
      <Styled.AdminWrapper>
        <Styled.AdminContainer>
          <Route exact path={path} component={AdminSets} />
          <Route exact path={`${path}/edit/set/:setId`} component={AdminSet} />
          <Route
            exact
            path={`${path}/edit/subset/:subsetId`}
            component={AdminSubset}
          />
          <Route
            exact
            path={`${path}/edit/series/:seriesId`}
            component={AdminSeries}
          />
          <Route
            exact
            path={`${path}/edit/card/:cardId`}
            component={AdminCard}
          />
          <Route exact path={`${path}/teams`} component={() => <p>teams</p>} />
          <Route
            exact
            path={`${path}/attributes`}
            component={() => <p>attributes</p>}
          />
          <Route
            exact
            path={`${path}/brands`}
            component={() => <p>brands</p>}
          />
        </Styled.AdminContainer>
      </Styled.AdminWrapper>
    </Styled.AdminWrapper>
  );
}
