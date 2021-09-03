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

interface Props {
  totalCards: number;
  distinctCards: number;
}

function CollectionData(props: Props) {
  return (
    <DataContainer>
      <DataLine>{`Total Cards: ${props.totalCards}`}</DataLine>
      <DataLine>{`Unique Cards: ${props.distinctCards}`}</DataLine>
    </DataContainer>
  );
}

export default CollectionData;
