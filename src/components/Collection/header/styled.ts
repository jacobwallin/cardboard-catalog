import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding-bottom: 10px;
  margin-top: 10px;
  @media only screen and (max-width: 450px) {
    flex-direction: column;
    gap: 8px;
    align-items: flex-start;
  }
`;

export const StyledHeader = styled.div`
  font-size: 1.7em;
  font-weight: 600;
  margin-left: 10px;
  color: #5a9bfd;
`;

export const FilterBrowse = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 10px;
`;

export const StyledLink = styled.div<{ location: "LEFT" | "RIGHT" }>`
  width: 80px;
  height: 25px;
  font-size: 0.9rem;
  line-height: 25px;
  text-align: center;
  text-decoration: none;
  color: white;
  background-color: #5a9bfd;
  &:hover {
    background-color: #4182e4;
    cursor: pointer;
  }
  &:active {
    background-color: #0e4fb1;
  }
  &:visited {
    color: white;
  }
  border-left: ${(props) => props.location === "RIGHT" && "1px solid grey"};
  border-top-left-radius: ${(props) => props.location === "LEFT" && "13px"};
  border-bottom-left-radius: ${(props) => props.location === "LEFT" && "13px"};
  border-top-right-radius: ${(props) => props.location === "RIGHT" && "13px"};
  border-bottom-right-radius: ${(props) =>
    props.location === "RIGHT" && "13px"};
`;
