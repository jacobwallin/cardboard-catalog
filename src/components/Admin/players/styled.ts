import styled from "styled-components";

export const SearchContainer = styled.div`
  position: relative;
  display: flex;
  gap: 5px;
`;

export const Search = styled.input`
  width: 200px;
  height: 30px;
`;

export const ClearSearch = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  right: 57px;
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
