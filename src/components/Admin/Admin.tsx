import React, { useState } from "react";
import { Route, useRouteMatch } from "react-router-dom";
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
          <Route exact path={path}>
            <AdminSets
              yearFilter={yearFilter}
              brandFilter={brandFilter}
              handleSelectChange={handleSelectChange}
            />
          </Route>
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
          <Route exact path={`${path}/players`} component={AdminPlayers} />
          <Route exact path={`${path}/teams`} component={AdminTeams} />
          <Route exact path={`${path}/other`} component={AdminOther} />
        </Styled.AdminContainer>
      </Styled.AdminInnerWrapper>
    </Styled.AdminWrapper>
  );
}
