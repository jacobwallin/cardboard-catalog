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
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 50px;
  margin-bottom: 20px;
  gap: 5px;
`;

export const DataLine = styled.div`
  font-size: 0.9em;
  span {
    font-weight: 500;
  }
`;

export const Title = styled.div`
  font-weight: 400;
  font-size: 1.4rem;
  /* color: #5a9bfd; */
  text-align: center;
`;

export const ShowQtyContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const ShowQtyLabel = styled.label`
  font-size: 0.8rem;
  font-weight: 300;
`;

export const NoCardsInSet = styled.div`
  font-size: 1.1rem;
  font-weight: 300;
`;
