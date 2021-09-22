import React from "react";
import { Route, useRouteMatch } from "react-router-dom";
import Sidebar from "./Sidebar";
import AdminSets from "./all-sets/AdminSets";
import EditSet from "./set/AdminSet";
import EditSubset from "./subset/EditSubset";
import EditSeries from "./series/EditSeries";
import EditCard from "./card/AdminCard";
import * as Styled from "./styled";

export default function Admin() {
  const { path } = useRouteMatch();

  return (
    <Styled.AdminWrapper>
      <Sidebar />
      <Styled.AdminWrapper>
        <Styled.AdminContainer>
          <Route exact path={path} component={AdminSets} />
          <Route exact path={`${path}/edit/set/:setId`} component={EditSet} />
          <Route
            exact
            path={`${path}/edit/subset/:subsetId`}
            component={EditSubset}
          />
          <Route
            exact
            path={`${path}/edit/series/:seriesId`}
            component={EditSeries}
          />
          <Route
            exact
            path={`${path}/edit/card/:cardId`}
            component={EditCard}
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
