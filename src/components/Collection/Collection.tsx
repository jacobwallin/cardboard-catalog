import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { Route, Routes } from "react-router-dom";
import SelectSet from "./select-set/SelectSet";
import PageHeader from "../shared/PageHeader";
import CollectionToggle from "./header/CollectionToggle";
import FilterPage from "./filter/FilterPage";
import CollectionWrapper from "../shared/CollectionWrapper";
import CollectionContainer from "../shared/CollectionContainer";
import Breadcrumbs from "../breadcrumbs/Breadcrumbs";
import ReturnToMyCollection from "./shared/ReturnToMyCollection";
import { viewMyCollection } from "../../store/collection/browse/actions";

export default function Collection() {
  const dispatch = useDispatch();
  const collectionFriend = useSelector(
    (state: RootState) => state.collection.browse.friend
  );

  function returnToMyCollection() {
    dispatch(viewMyCollection());
  }

  return (
    <CollectionWrapper>
      <CollectionContainer>
        <Breadcrumbs />
        {collectionFriend.id !== 0 && (
          <ReturnToMyCollection onClick={returnToMyCollection}>
            Return to My Collection
          </ReturnToMyCollection>
        )}
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
