import styled from "styled-components";

export const FilterBrowse = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 10px;
`;

export const StyledLink = styled.div<{
  location: "LEFT" | "RIGHT";
  selected: boolean;
}>`
  width: 80px;
  height: 25px;
  font-size: 0.9rem;
  line-height: 25px;
  text-align: center;
  text-decoration: none;
  color: white;
  background-color: ${(props) => (props.selected ? "#4182e4" : "#5a9bfd")};
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
  border-left: ${(props) => props.location === "RIGHT" && "1px solid #5a9bfd"};
  border-top-left-radius: ${(props) => props.location === "LEFT" && "13px"};
  border-bottom-left-radius: ${(props) => props.location === "LEFT" && "13px"};
  border-top-right-radius: ${(props) => props.location === "RIGHT" && "13px"};
  border-bottom-right-radius: ${(props) =>
    props.location === "RIGHT" && "13px"};
`;
