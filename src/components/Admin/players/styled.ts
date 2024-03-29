import styled from "styled-components";

export const SearchContainer = styled.div`
  position: relative;
  display: flex;
  gap: 5px;
  margin: 10px 0 0 10px;
`;

export const Search = styled.input`
  width: 200px;
  height: 30px;
`;

export const ClearSearch = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  left: 177px;
  top: 5px;
  cursor: pointer;
  &:hover {
    .ex {
      fill: gray;
    }
  }
  &:active {
    .ex {
      fill: darkgray;
    }
  }
`;

export const AddButtonWrapper = styled.div`
  align-self: flex-end;
  margin: 15px 8px 0 0;
`;
