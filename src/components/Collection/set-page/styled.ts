import styled from "styled-components";

export const SetInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  @media only screen and (max-width: 600px) {
    flex-direction: column;
  }
`;

export const Collection = styled.div`
  background: #eee;
  border: 1px solid #ccc;
  padding: 15px 15px 15px 15px;
  width: 250px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

export const DataLine = styled.div`
  font-size: 0.9em;
  span {
    font-weight: 500;
  }
`;

export const Title = styled.div`
  font-weight: 600;
  font-size: 1.1rem;
  color: #5a9bfd;
  text-align: center;
`;

export const ShowQtyContainer = styled.div`
  display: flex;
  justif-content: center;
  align-items: center;
`;
export const ShowQtyLabel = styled.label`
  font-size: 0.8rem;
  font-weight: 300;
`;
