import styled from "styled-components";

const PageContainer = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media only screen and (max-width: 1024px) {
    width: 75%;
  }
  @media only screen and (max-width: 400px) {
    width: 95%;
  }
`;

export default PageContainer;
