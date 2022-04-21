import styled from "styled-components";

const LinkIconWrapper = styled.a`
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

export default LinkIconWrapper;
