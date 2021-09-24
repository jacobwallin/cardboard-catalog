import styled from "styled-components";

export const AdminWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-grow: 1;
`;
export const AdminContainer = styled.div`
  width: 65%;

  @media only screen and (max-width: 1250px) {
    width: 80%;
  }
  @media only screen and (max-width: 800px) {
    width: 95%;
  }
`;
