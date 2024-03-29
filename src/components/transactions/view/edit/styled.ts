import styled from "styled-components";

export const DeleteIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  .ex {
    fill: white;
  }
  svg {
    height: 17px;
    width: 17px;
  }
`;

export const CardTableHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: 10px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const TableWrapper = styled.div`
  width: 100%;
  margin-top: 50px;
`;

export const ReturnWrapper = styled.div`
  display: flex;
  width: 650px;
  @media (max-width: 800px) {
    width: 95%;
  }
`;

export const CancelWrapper = styled.div`
  align-self: flex-end;
`;

export const DeleteButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  margin-top: 40px;
  flex-grow: 1;
`;
