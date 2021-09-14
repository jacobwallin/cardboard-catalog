import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { register, checkUsername } from "../../store/user/thunks";
import { createLoadingSelector } from "../../store/loading/reducer";
import * as Styled from "./styled";
import StyledButton from "../Admin/components/StyledButton";

const isLoadingSelector = createLoadingSelector(["REGISTER"]);

interface FormState {
  username: string;
  email: string;
  passwordOne: string;
  passwordTwo: string;
}

export default function Register() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state: RootState) => isLoadingSelector(state));
  const usernameAvailable = useSelector(
    (state: RootState) => state.user.availableUsername
  );
  const [formState, setFormState] = useState<FormState>({
    username: "",
    email: "",
    passwordOne: "",
    passwordTwo: "",
  });

  function handleFormChange(event: React.ChangeEvent<HTMLInputElement>) {
    setFormState({ ...formState, [event.target.id]: event.target.value });
  }

  function handleFormSubmit(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    dispatch(
      register(
        formState.username,
        formState.passwordOne,
        formState.email,
        "",
        ""
      )
    );
  }

  function checkAvailability(event: React.FocusEvent<HTMLInputElement>) {
    if (event.target.id === "username") {
      dispatch(checkUsername(formState.username));
    }
  }

  return (
    <Styled.LoginWrapper>
      <Styled.LoginContainer>
        <h4>Create Account</h4>
        <Styled.LoginFormContainer>
          <Styled.StyledInput
            type="text"
            id="username"
            value={formState.username}
            placeholder="username"
            onChange={handleFormChange}
            disabled={isLoading}
            onBlur={checkAvailability}
          />
          {!usernameAvailable && <div>not available</div>}
          <Styled.StyledInput
            type="email"
            id="email"
            value={formState.email}
            placeholder="email"
            onChange={handleFormChange}
            disabled={isLoading}
          />
          <Styled.StyledInput
            type="password"
            id="passwordOne"
            value={formState.passwordOne}
            placeholder="password"
            onChange={handleFormChange}
            disabled={isLoading}
          />
          <Styled.StyledInput
            type="password"
            id="passwordTwo"
            value={formState.passwordTwo}
            placeholder="confirm password"
            onChange={handleFormChange}
            disabled={isLoading}
          />
          <StyledButton
            color="GREEN"
            type="submit"
            width="150px"
            height="40px"
            onClick={handleFormSubmit}
            disabled={isLoading}
          >
            Create Account
          </StyledButton>
        </Styled.LoginFormContainer>
      </Styled.LoginContainer>
    </Styled.LoginWrapper>
  );
}
