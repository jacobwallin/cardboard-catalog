import styled from "styled-components";

export const SeriesSelect = styled.select`
  width: 150px;
  height: 20px;
`;

export const SelectLabel = styled.div`
  font-size: 0.8em;
  font-weight: 500;
`;

export const SelectParallel = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  justify-content: left;
  margin-bottom: 0px;
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

export const ModalWindow = styled.div`
  position: fixed;
  left: 50%;
  top: 15%;
  width: 100%;
  max-width: 600px;
  min-width: 250px;
  transform: translate(-50%, 0);
  background: white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

export const CloseButtonWrapper = styled.div`
  align-self: center;
  margin: 15px;
`;
