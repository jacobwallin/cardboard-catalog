import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledLink = styled(Link)`
  background: #5d9bfc;
  padding: 5px 10px;
  border-radius: 3px;
  &:hover {
    text-decoration: underline;
  }
`;

export default StyledLink;
