import styled from "styled-components";

export const SeriesSelect = styled.select`
  width: 150px;
  height: 20px;
`;

export const SelectLabel = styled.div`
  font-size: 0.8em;
  font-weight: 700;
`;

export const CardFilterContainer = styled.div`
  display: flex;
  width: 90%;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  justify-content: right;
  margin-bottom: 8px;
`;

export const AddCardsContainer = styled.div`
  width: 100%;
  margin-top: 15px;
  margin-bottom: 5px;
  display: flex;
  flex-direction: row;
  justify-content: right;
  align-items: center;
  gap: 20px;
`;

export const AddCardsTotal = styled.div`
  font-size: 0.8rem;
  font-weight: bold;
`;
