import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { fetchAllSetData } from "../../store/library/sets/thunks";
import PageHeader from "../shared/PageHeader";
import CollectionWrapper from "../shared/CollectionWrapper";
import CollectionContainer from "../shared/CollectionContainer";
import SelectYear from "./select-year/SelectYear";
import SelectSet from "./select-set/SelectSet";
import Breadcrumbs from "../breadcrumbs/Breadcrumbs";

export default function Browse() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllSetData());
  }, []);

  return (
    <CollectionWrapper>
      <CollectionContainer>
        <Breadcrumbs />
        <PageHeader title="Browse Catalogue" />
        <Routes>
          <Route path="/" element={<SelectYear />} />
          <Route path=":year" element={<SelectSet />} />
        </Routes>
      </CollectionContainer>
    </CollectionWrapper>
  );
}
