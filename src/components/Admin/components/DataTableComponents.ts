import styled from "styled-components";

export const DataTableHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
`;

export const DataTableTitle = styled.div`
  font-size: 1.4rem;
  font-weight: 500;
  margin-left: 5px;
`;

export const DataTableButtonsContainer = styled.div`
  display: flex;
  gap: 5px;
`;

export const TitleSubText = styled.div`
  color: gray;
  font-size: 0.75rem;
  margin-left: 7px;
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const DataTableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 5px;
  background: white;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
`;
