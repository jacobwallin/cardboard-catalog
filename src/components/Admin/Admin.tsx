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
      <Styled.AdminInnerWrapper>
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
          <Route
            exact
            path={`${path}/players`}
            component={() => (
              <h2 style={{ textAlign: "center" }}>COMING SOON</h2>
            )}
          />
        </Styled.AdminContainer>
      </Styled.AdminInnerWrapper>
    </Styled.AdminWrapper>
  );
}
