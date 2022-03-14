import styled from "styled-components";

export const Flex = styled.div`
  display: flex;
  gap: 25px;
  @media only screen and (max-width: 400px) {
    flex-direction: column;
    gap: 15px;
  }
`;
