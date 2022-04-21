import styled from "styled-components";

export const SetInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const Collection = styled.div`
  background: #eee;
  border: 1px solid #ccc;
  padding: 0 15px 10px 15px;
  width: 220px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const DataLine = styled.div`
  font-size: 0.9em;
  margin-top: 10px;
  span {
    font-weight: 500;
  }
`;

export const Title = styled.div`
  font-weight: 600;
  font-size: 1.1rem;
  color: #5a9bfd;
  text-align: center;
  margin-top: 10px;
`;
