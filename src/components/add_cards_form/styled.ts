import styled from "styled-components";

export const SubmitContainer = styled.form`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
`;

export const TotalCardsLabel = styled.div`
  margin: 0 25px 0 0;
  font-size: 1.1em;
  font-weight: 600;
`;

export const FormContainer = styled.div`
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  width: 100%;
  max-width: 800px;
  min-width: 250px;
  @media (max-width: 900px) {
    width: 90%;
  }
`;

export const CardDataContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;
