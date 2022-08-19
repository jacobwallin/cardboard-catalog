import styled from "styled-components";

const PageContainer = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  flex-grow: 1;
  @media only screen and (max-width: 1024px) {
    width: 95%;
  }
  @media only screen and (max-width: 400px) {
    width: 95%;
  }
`;

export default PageContainer;
