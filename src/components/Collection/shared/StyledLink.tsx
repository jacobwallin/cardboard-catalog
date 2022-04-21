import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledLink = styled(Link)`
  background: #005eff;
  padding: 5px 10px;
  border-radius: 3px;
  text-decoration: none;
  color: white;
  white-space: nowrap;
  &:hover {
    /* text-decoration: underline; */
  }
`;

export default StyledLink;
