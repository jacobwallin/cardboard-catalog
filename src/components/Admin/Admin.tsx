import React, { useState } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import Sidebar from "./Sidebar";
import AdminSets from "./all-sets/AdminSets";
import AdminSet from "./set/AdminSet";
import AdminSubset from "./subset/AdminSubset";
import AdminSeries from "./series/AdminSeries";
import AdminPlayers from "./players/AdminPlayer";
import AdminTeams from "./teams/AdminTeams";
import AdminOther from "./other/AdminOther";
import * as Styled from "./styled";
import Breadcrumbs from "../breadcrumbs/Breadcrumbs";

export default function Admin() {
  const { path } = useRouteMatch();

  const [yearFilter, setYearFilter] = useState(0);
  const [brandFilter, setBrandFilter] = useState(0);

  function handleSelectChange(e: React.ChangeEvent<HTMLSelectElement>) {
    if (e.target.id === "year") {
      setYearFilter(+e.target.value);
    }
    if (e.target.id === "brand") {
      setBrandFilter(+e.target.value);
    }
  }

  return (
    <Styled.AdminWrapper>
      <Sidebar />
      <Styled.AdminInnerWrapper>
        <Styled.AdminContainer>
          <Breadcrumbs />
          <Switch>
            <Route exact path={path}>
              <AdminSets
                yearFilter={yearFilter}
                brandFilter={brandFilter}
                handleSelectChange={handleSelectChange}
              />
            </Route>
            <Route exact path={`${path}/set/:setId`}>
              <AdminSet />
            </Route>
            <Route exact path={`${path}/subset/:subsetId`}>
              <AdminSubset />
            </Route>
            <Route exact path={`${path}/series/:seriesId`}>
              <AdminSeries />
            </Route>
            <Route exact path={`${path}/players`}>
              <AdminPlayers />
            </Route>
            <Route exact path={`${path}/teams`}>
              <AdminTeams />
            </Route>
            <Route exact path={`${path}/other`}>
              <AdminOther />
            </Route>
          </Switch>
        </Styled.AdminContainer>
      </Styled.AdminInnerWrapper>
    </Styled.AdminWrapper>
  );
}
