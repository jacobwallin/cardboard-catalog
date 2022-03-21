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
          <Routes>
            <Route
              path="/"
              element={
                <AdminSets
                  yearFilter={yearFilter}
                  brandFilter={brandFilter}
                  handleSelectChange={handleSelectChange}
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
