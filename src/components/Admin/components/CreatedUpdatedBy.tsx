import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-self: flex-start;
  margin: 20px 0 0 0px;
`;

const Data = styled.div`
  font-size: 0.7rem;
`;
const Title = styled.span`
  font-weight: 600;
`;

interface Props {
  createdBy: {
    username: string;
    timestamp: string;
  };
  updatedBy: {
    username: string;
    timestamp: string;
  };
}

export default function CreatedUpdatedBy(props: Props) {
  let showUpdated = false;

  if (
    props.updatedBy.timestamp.slice(0, 10) ===
    props.createdBy.timestamp.slice(0, 10)
  ) {
    let updatedTime = props.updatedBy.timestamp
      .slice(11)
      .replace(/[A-Z.:]/g, "");
    let createdTime = props.createdBy.timestamp
      .slice(11)
      .replace(/[A-Z.:]/g, "");

    // check if timestamp difference is greater than one second
    if (Math.abs(+createdTime - +updatedTime) > 1000) {
      showUpdated = true;
    }
  } else {
    showUpdated = true;
  }

  return (
    <Container>
      <Data>
        <Title>Created By: </Title>
        {`${props.createdBy.username} ${props.createdBy.timestamp.slice(
          0,
          10
        )}`}
      </Data>
      {showUpdated && (
        <Data>
          <Title>Last Updated By: </Title>
          {`${props.updatedBy.username} ${props.updatedBy.timestamp.slice(
            0,
            10
          )}`}
        </Data>
      )}
    </Container>
  );
}
