import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { register, checkUsername } from "../../store/user/thunks";
import { createLoadingSelector } from "../../store/loading/reducer";
import * as Styled from "./styled";
import StyledButton from "../Admin/components/StyledButton";

const isLoadingSelector = createLoadingSelector(["REGISTER"]);
const isCheckingUsernameSelector = createLoadingSelector(["CHECK_USERNAME"]);

interface FormStateInstance {
  value: string;
  focused: boolean;
}
interface FormState {
  username: FormStateInstance;
  email: FormStateInstance;
  passwordOne: FormStateInstance;
  passwordTwo: FormStateInstance;
}

interface Props {
  toggleForm(): void;
}

export default function RegisterForm(props: Props) {
  const dispatch = useDispatch();
  const isPosting = useSelector((state: RootState) => isLoadingSelector(state));
  const isCheckingUsername = useSelector((state: RootState) =>
    isCheckingUsernameSelector(state)
  );
  const usernameAvailable = useSelector(
    (state: RootState) => state.user.availableUsername
  );
  const [formState, setFormState] = useState<FormState>({
    username: { value: "", focused: false },
    email: { value: "", focused: false },
    passwordOne: { value: "", focused: false },
    passwordTwo: { value: "", focused: false },
  });
  const [lastCheckedUsername, setLastCheckedUsername] = useState("");

  function handleFormChange(event: React.ChangeEvent<HTMLInputElement>) {
    setFormState({
      ...formState,
      [event.target.id]: { focused: true, value: event.target.value },
    });
  }

  function handleFormSubmit(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    dispatch(
      register(
        formState.username.value,
        formState.passwordOne.value,
        formState.email.value,
        "",
        ""
      )
    );
  }

  function checkAvailability(event: React.FocusEvent<HTMLInputElement>) {
    if (
      lastCheckedUsername !== formState.username.value &&
      formState.username.value !== ""
    ) {
      setLastCheckedUsername(formState.username.value);
      dispatch(checkUsername(formState.username.value));
    }
  }

  function setFocusedElement(event: React.FocusEvent<HTMLInputElement>) {
    setFormState({
      ...formState,
      [event.target.id]: { value: event.target.value, focused: true },
    });
  }

  function removeFocusedElement(event: React.FocusEvent<HTMLInputElement>) {
    setFormState({
      ...formState,
      [event.target.id]: { value: event.target.value, focused: false },
    });
  }

  return (
    <Styled.LoginWrapper>
      <Styled.LoginContainer>
        <h2>Create Account</h2>
        <Styled.LoginFormContainer>
          <Styled.UsernameAvailability
            invisible={
              formState.username.value === "" ||
              formState.username.focused ||
              isCheckingUsername
            }
            available={usernameAvailable}
          >
            {usernameAvailable ? "username available" : "username taken"}
          </Styled.UsernameAvailability>
          <Styled.InputContainer>
            <Styled.StyledInput
              type="text"
              id="username"
              value={formState.username.value}
              placeholder={formState.username.focused ? "" : "username"}
              onChange={handleFormChange}
              disabled={isPosting}
              onBlur={(e) => {
                checkAvailability(e);
                removeFocusedElement(e);
              }}
              onFocus={setFocusedElement}
              autoComplete="off"
            />
            <Styled.InputLabel displayLabel={formState.username.focused}>
              username
            </Styled.InputLabel>
          </Styled.InputContainer>

          <Styled.InputContainer>
            <Styled.StyledInput
              type="email"
              id="email"
              value={formState.email.value}
              placeholder={formState.email.focused ? "" : "email"}
              onChange={handleFormChange}
              onBlur={removeFocusedElement}
              onFocus={setFocusedElement}
              disabled={isPosting}
              autoComplete="off"
            />
            <Styled.InputLabel displayLabel={formState.email.focused}>
              email
            </Styled.InputLabel>
          </Styled.InputContainer>
          <Styled.InputContainer>
            <Styled.StyledInput
              type="password"
              id="passwordOne"
              value={formState.passwordOne.value}
              placeholder={formState.passwordOne.focused ? "" : "password"}
              onChange={handleFormChange}
              onBlur={removeFocusedElement}
              onFocus={setFocusedElement}
              disabled={isPosting}
              autoComplete="off"
            />
            <Styled.InputLabel displayLabel={formState.passwordOne.focused}>
              password
            </Styled.InputLabel>
          </Styled.InputContainer>
          <Styled.InputContainer>
            <Styled.StyledInput
              type="password"
              id="passwordTwo"
              value={formState.passwordTwo.value}
              placeholder={
                formState.passwordTwo.focused ? "" : "confirm password"
              }
              onChange={handleFormChange}
              onBlur={removeFocusedElement}
              onFocus={setFocusedElement}
              disabled={isPosting}
              autoComplete="off"
            />
            <Styled.InputLabel displayLabel={formState.passwordTwo.focused}>
              confirm password
            </Styled.InputLabel>
          </Styled.InputContainer>
          <Styled.LoginButton
            color="BLUE"
            type="submit"
            width="150px"
            height="40px"
            onClick={handleFormSubmit}
            disabled={isPosting || isCheckingUsername}
          >
            Create Account
          </Styled.LoginButton>
          <Styled.ToggleButton onClick={props.toggleForm}>
            Log In
          </Styled.ToggleButton>
        </Styled.LoginFormContainer>
      </Styled.LoginContainer>
    </Styled.LoginWrapper>
  );
}
