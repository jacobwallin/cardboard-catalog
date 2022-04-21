import styled from "styled-components";

export const AdminWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-grow: 1;

  @media only screen and (max-width: 1100px) {
    flex-direction: column;
  }
`;
export const AdminInnerWrapper = styled.div`
  width: 100%;
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-grow: 1;
`;
export const AdminContainer = styled.div`
  width: 100%;
  max-width: 1300px;

  @media only screen and (max-width: 1370px) {
    width: 98%;
  }
`;
