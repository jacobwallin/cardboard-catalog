import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { register, checkUsername } from "../../store/user/thunks";
import { createLoadingSelector } from "../../store/loading/reducer";
import * as Styled from "./styled";
import validate from "validate.js";
import { constraints } from "./validation";

const isLoadingSelector = createLoadingSelector(["REGISTER"]);
const isCheckingUsernameSelector = createLoadingSelector(["CHECK_USERNAME"]);

interface FormStateInstance {
  value: string;
  focused: boolean;
  error: boolean;
  errorMessage: string;
}
interface FormState {
  username: FormStateInstance;
  email: FormStateInstance;
  password: FormStateInstance;
  confirmPassword: FormStateInstance;
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
    username: { value: "", focused: false, error: false, errorMessage: "" },
    email: { value: "", focused: false, error: false, errorMessage: "" },
    password: { value: "", focused: false, error: false, errorMessage: "" },
    confirmPassword: {
      value: "",
      focused: false,
      error: false,
      errorMessage: "",
    },
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
        formState.password.value,
        formState.email.value,
        ""
      )
    );
  }

  function setFocusedElement(event: React.FocusEvent<HTMLInputElement>) {
    setFormState({
      ...formState,
      [event.target.id]: { value: event.target.value, focused: true },
    });
  }

  // validate each field when the onBlur event occurs
  function handleBlur(event: React.FocusEvent<HTMLInputElement>) {
    let validationResponse: { [key: string]: string[] } | undefined = undefined;
    let validationMessage = "";

    if (event.target.value !== "") {
      switch (event.target.id) {
        case "username":
          validationResponse = validate(
            { username: formState.username.value },
            constraints
          );
          if (validationResponse) {
            validationMessage = validationResponse.username[0];
          } else {
            if (
              lastCheckedUsername !== formState.username.value &&
              formState.username.value !== ""
            ) {
              setLastCheckedUsername(formState.username.value);
              dispatch(checkUsername(formState.username.value));
            }
          }
          break;
        case "email":
          validationResponse = validate(
            { email: formState.email.value },
            constraints
          );
          if (validationResponse)
            validationMessage = validationResponse.email[0];
          break;
        case "password":
          validationResponse = validate(
            {
              password: formState.password.value,
              confirmPassword: formState.confirmPassword.value,
            },
            constraints
          );

          if (validationResponse) {
            if (validationResponse.password) {
              validationMessage = validationResponse.password[0];
            }
            if (formState.confirmPassword.value.length > 0) {
              console.log(validationResponse);
              // set error on confirm password if it has a value and doesn't match anymore
              setFormState({
                ...formState,
                confirmPassword: {
                  value: formState.confirmPassword.value,
                  focused: formState.confirmPassword.focused,
                  error: true,
                  errorMessage: validationResponse.confirmPassword[0],
                },
              });
            }
          }
          break;
        case "confirmPassword":
          validationResponse = validate(
            {
              password: formState.password.value,
              confirmPassword: formState.confirmPassword.value,
            },
            constraints
          );
          if (validationResponse && validationResponse.confirmPassword) {
            validationMessage = validationResponse.confirmPassword[0];
          }
          break;
      }
    }

    let target = event.target;

    setFormState((previousState) => ({
      ...previousState,
      [target.id]: {
        value: target.value,
        focused: false,
        error: validationMessage !== "",
        errorMessage: validationMessage,
      },
    }));
  }

  return (
    <Styled.LoginWrapper>
      <Styled.LoginContainer>
        <h2>Create Account</h2>
        <form>
          <Styled.LoginFormContainer>
            <Styled.InputContainer>
              <Styled.StyledInput
                type="text"
                id="username"
                value={formState.username.value}
                placeholder={formState.username.focused ? "" : "username"}
                onChange={handleFormChange}
                disabled={isPosting}
                onBlur={(e) => {
                  handleBlur(e);
                }}
                onFocus={setFocusedElement}
                autoComplete="off"
                error={formState.username.error}
                valid={
                  formState.username.value.length > 0 &&
                  !formState.username.error &&
                  !formState.username.focused
                }
              />
              <Styled.InputLabel
                displayLabel={
                  formState.username.focused ||
                  formState.username.value.length > 0
                }
              >
                username
              </Styled.InputLabel>
              <Styled.ValidationMessage
                error={!usernameAvailable || formState.username.error}
              >
                {formState.username.error
                  ? formState.username.errorMessage
                  : !formState.username.focused &&
                    !isCheckingUsername &&
                    formState.username.value !== ""
                  ? usernameAvailable
                    ? "Username available"
                    : "Username not available"
                  : ""}
              </Styled.ValidationMessage>
            </Styled.InputContainer>

            <Styled.InputContainer>
              <Styled.StyledInput
                type="email"
                id="email"
                value={formState.email.value}
                placeholder={formState.email.focused ? "" : "email"}
                onChange={handleFormChange}
                onBlur={handleBlur}
                onFocus={setFocusedElement}
                disabled={isPosting}
                autoComplete="off"
                error={formState.email.error}
                valid={
                  formState.email.value.length > 0 &&
                  !formState.email.error &&
                  !formState.email.focused
                }
              />
              <Styled.InputLabel
                displayLabel={
                  formState.email.focused || formState.email.value.length > 0
                }
              >
                email
              </Styled.InputLabel>
              <Styled.ValidationMessage error={formState.email.error}>
                {formState.email.error ? formState.email.errorMessage : ""}
              </Styled.ValidationMessage>
            </Styled.InputContainer>
            <Styled.InputContainer>
              <Styled.StyledInput
                type="password"
                id="password"
                value={formState.password.value}
                placeholder={formState.password.focused ? "" : "password"}
                onChange={handleFormChange}
                onBlur={handleBlur}
                onFocus={setFocusedElement}
                disabled={isPosting}
                autoComplete="off"
                error={formState.password.error}
                valid={
                  formState.password.value.length > 0 &&
                  !formState.password.error &&
                  !formState.password.focused
                }
              />
              <Styled.InputLabel
                displayLabel={
                  formState.password.focused ||
                  formState.password.value.length > 0
                }
              >
                password
              </Styled.InputLabel>
              <Styled.ValidationMessage error={formState.password.error}>
                {formState.password.error
                  ? formState.password.errorMessage
                  : ""}
              </Styled.ValidationMessage>
            </Styled.InputContainer>
            <Styled.InputContainer>
              <Styled.StyledInput
                type="password"
                id="confirmPassword"
                value={formState.confirmPassword.value}
                placeholder={
                  formState.confirmPassword.focused ? "" : "confirm password"
                }
                onChange={handleFormChange}
                onBlur={handleBlur}
                onFocus={setFocusedElement}
                disabled={isPosting}
                autoComplete="off"
                error={formState.confirmPassword.error}
                valid={
                  formState.confirmPassword.value.length > 0 &&
                  !formState.confirmPassword.error &&
                  !formState.confirmPassword.focused
                }
              />
              <Styled.InputLabel
                displayLabel={
                  formState.confirmPassword.focused ||
                  formState.confirmPassword.value.length > 0
                }
              >
                confirm password
              </Styled.InputLabel>
              <Styled.ValidationMessage error={formState.confirmPassword.error}>
                {formState.confirmPassword.error
                  ? formState.confirmPassword.errorMessage
                  : ""}
              </Styled.ValidationMessage>
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
        </form>
      </Styled.LoginContainer>
    </Styled.LoginWrapper>
  );
}
