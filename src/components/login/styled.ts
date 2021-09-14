import styled from "styled-components";

export const LoginFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StyledInput = styled.input`
  width: 80%;
  height: 30px;
  padding: 5px;
  margin: 5px;

  @media only screen and (min-width: 400px) {
    width: 300px;
  }
`;

export const InputLabel = styled.label`
  align-self: flex-start;
  font-size: 0.9em;
  color: #555;
  margin-left: 15px;
`;

export const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const LoginContainer = styled.div`
  background: #fff;
  border: 1px solid lightgrey;
  border-radius: 10px;
  padding: 50px;
  margin: 50px;
  min-width: 300px;
  @media only screen and (max-width: 600px) {
    padding: 25px;
  }
  @media only screen and (max-width: 450px) {
    padding: 5px;
  }
`;

export const LoginErrorMessage = styled.div`
  color: red;
  font-size: 0.9em;
`;
