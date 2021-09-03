import styled from "styled-components";
import React from "react";

const StyledHeader = styled.div`
  align-self: flex-start;
  font-size: 1.8em;
  margin: 10px 0 25px 10px;
`;

function CollectionHeader() {
  return <StyledHeader>Your Collection</StyledHeader>;
}

export default CollectionHeader;
