import React from "react";
import { Routes, Route } from "react-router-dom";
import CollectionWrapper from "../shared/CollectionWrapper";
import CollectionContainer from "../shared/CollectionContainer";
import Breadcrumbs from "../breadcrumbs/Breadcrumbs";
import PageHeader from "../shared/PageHeader";

export default function Transactions() {
  return (
    <CollectionWrapper>
      <CollectionContainer>
        <Breadcrumbs />
        <PageHeader title="Trade" />
        <Routes></Routes>
      </CollectionContainer>
    </CollectionWrapper>
  );
}
