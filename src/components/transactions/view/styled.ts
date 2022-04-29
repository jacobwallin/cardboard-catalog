import styled from "styled-components";

export const DataContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  position: relative;
  margin-bottom: 50px;
`;

export const DataTitle = styled.div`
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 5px;
`;

export const DataValue = styled.div`
  font-size: 1rem;
  padding-left: 10px;
  white-space: pre-wrap;
`;

export const DataFieldContainer = styled.div`
  align-self: flex-start;
`;

export const Flex = styled.div`
  display: flex;
  gap: 15px;

  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

export const EditButton = styled.div`
  position: absolute;
  right: 0;
  top: 0;
`;
