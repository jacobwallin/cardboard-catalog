import styled from "styled-components";

export const DataContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  position: relative;
  margin-bottom: 40px;
  margin-top: 25px;
`;

export const DataTitle = styled.div`
  font-weight: 300;
  font-size: 0.95rem;
  color: #555;
  margin-bottom: 5px;
`;

export const DataValue = styled.div`
  font-weight: normal;
  font-size: 1.1rem;
  margin-top: 3px;
  white-space: pre-wrap;
  font-weight: 400;
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

export const Pending = styled.div`
  color: white;
  background-color: #ffe561;
  padding: 3px 7px 3px 7px;
  border-radius: 5px;
`;

export const CardTableHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: 10px;
`;

export const PendingContainer = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
`;
