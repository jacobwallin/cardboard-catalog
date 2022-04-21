import React from "react";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import SelectSet from "./select-set/SelectSet";
import PageHeader from "../shared/PageHeader";
import CollectionToggle from "./header/CollectionToggle";
import FilterPage from "./filter/FilterPage";
import CollectionWrapper from "../shared/CollectionWrapper";
import CollectionContainer from "../shared/CollectionContainer";
import Breadcrumbs from "../breadcrumbs/Breadcrumbs";
import ReturnToMyCollection from "./shared/ReturnToMyCollection";

export default function Collection() {
  const collectionFriend = useSelector(
    (state: RootState) => state.collection.browse.friend
  );
  return (
    <CollectionWrapper>
      <CollectionContainer>
        <Breadcrumbs />
        <ReturnToMyCollection />
        <PageHeader
          title={
            collectionFriend.id !== 0
              ? `${collectionFriend.username}'s Collection`
              : "My Collection"
          }
        >
          <CollectionToggle />
        </PageHeader>
        <Routes>
          <Route path="/" element={<SelectSet />} />
          <Route path="filter" element={<FilterPage />} />
          <Route path=":year" element={<SelectSet />} />
        </Routes>
      </CollectionContainer>
    </CollectionWrapper>
  );
}
