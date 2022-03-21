import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { fetchAllSetData } from "../../store/library/sets/thunks";
import BrowseHeader from "../Collection/header/BrowseHeader";
import CollectionWrapper from "../shared/CollectionWrapper";
import CollectionContainer from "../shared/CollectionContainer";
import SelectYear from "./select_year/SelectYear";
import SelectSet from "./select_set/SelectSet";
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
        <BrowseHeader title="Browse Database" />
        <Routes>
          <Route path="/" element={<SelectYear />} />
          <Route path=":year" element={<SelectSet />} />
        </Routes>
      </CollectionContainer>
    </CollectionWrapper>
  );
}
