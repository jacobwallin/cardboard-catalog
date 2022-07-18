import styled from "styled-components";

export const Players = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const PlayerRow = styled.div<{ selected?: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 20px;
  font-size: 0.8rem;
  padding: 2px 0 2px 0;
  border-bottom: 1px solid #ddd;
  background-color: ${(props) => props.selected && "#e3f2fd"};

  &:hover {
    background-color: ${(props) => (props.selected ? "#e3f2fd" : "#ddd")};
    cursor: pointer;
  }
  &:nth-child(1) {
    border-top: 1px solid #ddd;
  }
`;

export const PlayerCheckbox = styled.input`
  &:hover {
    cursor: pointer;
  }
`;

export const Search = styled.form`
  display: flex;
  width: 100%;
  justify-content: space-between;
  gap: 5px;
`;

export const PlayerSearch = styled.input`
  width: 100%;
  height: 23px;
  border: 1px solid lightgray;
  border-radius: 3px;
`;
