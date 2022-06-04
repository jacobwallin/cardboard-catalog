import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
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
  const [yearFilter, setYearFilter] = useState(0);
  const [brandFilter, setBrandFilter] = useState(0);
  const [sportFilter, setSportFilter] = useState(0);

  function changeYearFilter(filter: number) {
    setYearFilter(filter);
  }

  function changeBrandFilter(filter: number) {
    setBrandFilter(filter);
  }

  function changeSportFilter(filter: number) {
    setSportFilter(filter);
  }

  return (
    <Styled.AdminWrapper>
      <Sidebar />
      <Styled.AdminInnerWrapper>
        <Styled.AdminContainer>
          <Breadcrumbs />
          <Routes>
            <Route
              path="/"
              element={
                <AdminSets
                  sportFilter={sportFilter}
                  yearFilter={yearFilter}
                  brandFilter={brandFilter}
                  setYearFilter={changeYearFilter}
                  setBrandFilter={changeBrandFilter}
                  setSportFilter={changeSportFilter}
                />
              }
            />
            <Route path="set/:setId" element={<AdminSet />} />
            <Route path="subset/:subsetId" element={<AdminSubset />} />
            <Route path="series/:seriesId" element={<AdminSeries />} />
            <Route path="players" element={<AdminPlayers />} />
            <Route path="teams" element={<AdminTeams />} />
            <Route path="other" element={<AdminOther />} />
          </Routes>
        </Styled.AdminContainer>
      </Styled.AdminInnerWrapper>
    </Styled.AdminWrapper>
  );
}
