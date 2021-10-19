import styled from "styled-components";
import { Link } from "react-router-dom";

const SubtleLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  padding: 3px;
  border-radius: 2px;
  &:hover {
    background-color: lightgray;
  }
`;

export default SubtleLink;
