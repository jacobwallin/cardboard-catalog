import styled from "styled-components";

export const PlayerAdded = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 5px;
  border: 1px solid lightgray;
  border-radius: 3px;
  background-color: #eee;
  padding: 6px;
  width: 100%;
`;

export const PlayerName = styled.div`
  font-size: 0.95rem;
  margin-left: 10px;
  a {
    color: blue;
    text-decoration: underline;
  }
`;

export const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export const LinkIconWrapper = styled.a`
  display: flex;
  align-items: center;
  width: 18px;
  path {
    stroke: #777;
  }
  &:hover {
    path {
      stroke: #444;
    }
  }
`;

export const RemoveIconWrapper = styled.div`
  display: flex;
  align-items: center;
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
