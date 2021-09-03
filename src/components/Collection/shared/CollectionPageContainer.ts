import styled from "styled-components";

const PageContainer = styled.div`
  border-radius: 10px;
  height: 100%;
  width: 100%;
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
