import styled from "styled-components";
import React from "react";

const DataContainer = styled.div`
  align-self: flex-start;
  display: flex;
  flex-direction: column;
  margin: 10px 10px 25px 0px;
`;

const DataLine = styled.div`
  font-size: 0.9em;
  margin-top: 5px;
`;

const Title = styled.div`
  font-weight: 600;
  font-size: 1.1rem;
  color: #5a9bfd;
`;

interface Props {
  totalCards: number;
}

function CollectionData(props: Props) {
  return (
    <DataContainer>
      <Title>Your Collection</Title>
      <DataLine>{`Total Cards: ${props.totalCards}`}</DataLine>
    </DataContainer>
  );
}

export default CollectionData;
