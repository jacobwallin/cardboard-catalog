import styled from "styled-components";

export const PageTitle = styled.div`
  font-size: 1.7rem;
  margin: 40px 0 40px 0;
  align-self: center;
`;

export const ShowAllCards = styled.div`
  display: flex;
  flex-direction: row;
  align-self: flex-start;
  align-items: center;
  margin-top: 3px;
`;

export const SelectParallel = styled.div`
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  align-items: right;

  margin-bottom: 0px;
  gap: 2px;
  align-self: flex-start;
`;

export const SeriesSelect = styled.select`
  min-width: 150px;
  height: 25px;
  border-radius: 3px;
`;

export const SelectLabel = styled.div`
  font-size: 12px;
  font-weight: 600;
  margin-right: 3px;
`;

export const AddCardsContainer = styled.div`
  width: 100%;
  margin-bottom: 15px;
  display: flex;
  flex-direction: row;
  justify-content: left;
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
  flex-direction: column;
`;

export const TableHeaderRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const CloseButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  margin: 25px 0 0 15px;
`;

export const BackButton = styled.div`
  font-size: 1rem;
  color: #777;
  &:hover {
    color: black;
    cursor: pointer;
  }
`;
