import React from "react";
import { Route, Routes } from "react-router-dom";
import SelectYear from "./select_year/SelectYear";
import SelectSet from "./select_set/SelectSet";
import PageHeader from "../shared/PageHeader";
import CollectionToggle from "./header/CollectionToggle";
import FilterPage from "./filter/FilterPage";
import CollectionWrapper from "../shared/CollectionWrapper";
import CollectionContainer from "../shared/CollectionContainer";
import Breadcrumbs from "../breadcrumbs/Breadcrumbs";

export default function Collection() {
  return (
    <CollectionWrapper>
      <CollectionContainer>
        <Breadcrumbs />
        <PageHeader title="Your Collection">
          <CollectionToggle />
        </PageHeader>
        <Routes>
          <Route path="/" element={<SelectYear />} />
          <Route path="filter" element={<FilterPage />} />
          <Route path=":year" element={<SelectSet />} />
        </Routes>
      </CollectionContainer>
    </CollectionWrapper>
  );
}
