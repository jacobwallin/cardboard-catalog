import styled from "styled-components";

export const PageTitle = styled.div`
  font-size: 1.5rem;
  margin: 20px 0 30px 0;
  font-weight: 600;
  align-self: flex-start;
`;

export const SelectParallel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: right;
  justify-content: right;
  margin-bottom: 0px;
  gap: 2px;
  align-self: flex-start;
`;

export const SeriesSelect = styled.select`
  width: 150px;
  height: 20px;
`;

export const SelectLabel = styled.div`
  font-size: 12px;
  font-weight: 600;
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

export const ConfirmDeleteButtons = styled.div`
  display: flex;
  flex-direction: row;
  align-self: center;
  gap: 30px;
  margin: 15px;
`;
export const CloseButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  margin: 15px;
`;

export const ConfirmDeleteTitle = styled.div`
  text-align: center;
  padding: 20px;
  font-size: 1.3rem;
`;

export const DeleteConfirmMessage = styled.div`
  text-align: center;
  padding: 30px 0 30px 0;
`;

export const TableHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
