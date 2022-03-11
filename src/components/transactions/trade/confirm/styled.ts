import styled from "styled-components";

export const ConfirmContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 650px;
  @media (max-width: 800px) {
    width: 95%;
  }
`;

export const SelectedCardsHeader = styled.div`
  font-weight: 500;
  width: 100%;
  margin: 30px 0 0 15px;
`;

export const PageTitle = styled.div`
  width: 100%;
  text-align: left;
  font-size: 1.1rem;
  margin: 40px 0 0px 0px;
  font-weight: 500;
`;

export const CardsInTrade = styled(PageTitle)`
  text-align: center;
`;
