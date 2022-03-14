import styled from "styled-components";

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 650px;
  @media (max-width: 800px) {
    width: 95%;
  }
`;
