import React from "react";
import BrowseHeader from "../Collection/header/BrowseHeader";

import CollectionWrapper from "../shared/CollectionWrapper";
import CollectionContainer from "../shared/CollectionContainer";

export default function Browse() {
  return (
    <CollectionWrapper>
      <CollectionContainer>
        <BrowseHeader title="Browse Database" />
      </CollectionContainer>
    </CollectionWrapper>
  );
}
