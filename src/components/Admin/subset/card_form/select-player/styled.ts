import styled from "styled-components";

export const Container = styled.div`
  margin-top: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const SearchInput = styled.input`
  height: 27px;
  width: 175px;
  font-size: 0.8rem;
`;

export const SearchContainer = styled.form`
  display: flex;
  gap: 5px;
  align-self: flex-start;
  align-items: center;
  position: relative;
`;

export const Close = styled.div`
  position: absolute;
  left: 152px;
  top: 3px;
  width: 20px;
  .ex {
    fill: black;
  }
  &:hover {
    cursor: pointer;
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
