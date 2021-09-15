import styled from "styled-components";
import { Link } from "react-router-dom";

export const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  border: 1px solid lightgrey;
  border-radius: 10px;
  padding: 50px 50px 0 50px;
  margin: 50px;
  width: 500px;
  @media only screen and (max-width: 600px) {
    width: 400px;
    padding: 25px;
  }
  @media only screen and (max-width: 450px) {
    width: 300px;
    padding: 5px;
  }
`;

export const LoginFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 280px;
`;

export const InputContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 10px;
  position: relative;
`;

export const StyledInput = styled.input`
  width: 100%;
  height: 40px;
  padding: 8px;

  &:focus {
    outline: none;
  }
`;

interface InputLabelProps {
  displayLabel: boolean;
}
export const InputLabel = styled.label<InputLabelProps>`
  display: ${(props) => (props.displayLabel === false ? "none" : "block")};
  position: absolute;
  height: 15px;
  top: -7.5px;
  left: 7px;
  background: #fff;
  padding: 0 2px 0 2px;
  align-self: flex-start;
  font-size: 0.8em;
  color: #555;
  margin-left: 15px;
`;

export const LoginErrorMessage = styled.div`
  color: red;
  font-size: 0.9em;
`;

export const StyledLink = styled(Link)`
  color: blue;
  margin: 25px 0 10px 0;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

export const ToggleButton = styled.div`
  color: blue;
  margin: 25px 0 10px 0;
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

interface UsernameAvailabilityProps {
  available: boolean;
  invisible: boolean;
}

export const UsernameAvailability = styled.div<UsernameAvailabilityProps>`
  margin-left: 15px;
  font-size: 0.8em;
  align-self: flex-start;
  color: ${(props) => (props.available === true ? "green" : "red")};
  color: ${(props) => props.invisible && "#fff"};
`;
