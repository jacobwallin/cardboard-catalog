import styled from "styled-components";
import React from "react";

const StyledHeader = styled.div`
  align-self: flex-start;
  font-size: 1.7em;
  font-weight: 600;
  margin: 10px 0 25px 10px;
  color: #5a9bfd;
`;

function CollectionHeader() {
  return <StyledHeader>Your Collection</StyledHeader>;
}

export default CollectionHeader;
