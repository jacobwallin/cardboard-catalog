import React, { useState } from "react";
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
  valid: boolean;
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
  const [submitError, setSubmitError] = useState(false);
  const [formState, setFormState] = useState<FormState>({
    username: {
      value: "",
      focused: false,
      error: false,
      valid: false,
      errorMessage: "",
    },
    email: {
      value: "",
      focused: false,
      error: false,
      valid: false,
      errorMessage: "",
    },
    password: {
      value: "",
      focused: false,
      error: false,
      valid: false,
      errorMessage: "",
    },
    confirmPassword: {
      value: "",
      focused: false,
      error: false,
      valid: false,
      errorMessage: "",
    },
  });
  const [lastCheckedUsername, setLastCheckedUsername] = useState("");

  function handleFormSubmit(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    event.preventDefault();
    let validation = validate(
      {
        username: formState.username.value,
        email: formState.email.value,
        password: formState.password.value,
        confirmPassword: formState.confirmPassword.value,
      },
      constraints
    );

    if (!validation) {
      setSubmitError(false);
      dispatch(
        register(
          formState.username.value,
          formState.password.value,
          formState.email.value,
          ""
        )
      );
    } else {
      setSubmitError(true);
    }
  }

  function handleFormChange(event: React.ChangeEvent<HTMLInputElement>) {
    setFormState({
      ...formState,
      [event.target.id]: {
        value: event.target.value,
        focused: true,
        error: false,
        valid: false,
        errorMessage: "",
      },
    });
  }

  function setFocusedElement(event: React.FocusEvent<HTMLInputElement>) {
    switch (event.target.id) {
      case "username":
        setFormState({
          ...formState,
          username: { ...formState.username, focused: true },
        });
        break;
      case "email":
        setFormState({
          ...formState,
          email: { ...formState.email, focused: true },
        });
        break;
      case "password":
        setFormState({
          ...formState,
          password: { ...formState.password, focused: true },
        });
        break;
      case "confirmPassword":
        setFormState({
          ...formState,
          confirmPassword: { ...formState.confirmPassword, focused: true },
        });
        break;
    }
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
            // only check username with server if there is no validation errors, and username is not blank
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
          // first validate password
          validationResponse = validate(
            {
              password: formState.password.value,
            },
            constraints
          );
          if (validationResponse) {
            validationMessage = validationResponse.password[0];
          }

          // then validate confirm password (as long as a value is present) since it's status will have changed if password was changed
          if (formState.confirmPassword.value.length > 0) {
            let confirmPasswordValidate = validate(
              {
                password: formState.password.value,
                confirmPassword: formState.confirmPassword.value,
              },
              constraints
            );

            if (
              confirmPasswordValidate &&
              confirmPasswordValidate.confirmPassword
            ) {
              setFormState({
                ...formState,
                confirmPassword: {
                  value: formState.confirmPassword.value,
                  focused: formState.confirmPassword.focused,
                  error: true,
                  valid: false,
                  errorMessage: confirmPasswordValidate.confirmPassword[0],
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
        valid: validationMessage === "" && target.value !== "",
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
                onBlur={handleBlur}
                onFocus={setFocusedElement}
                autoComplete="off"
                error={formState.username.error || !usernameAvailable}
                valid={formState.username.valid && usernameAvailable}
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
                valid={formState.email.valid}
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
                valid={formState.password.valid}
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
                valid={formState.confirmPassword.valid}
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
            <Styled.SubmitError>
              {submitError && "Form Not Completed"}
            </Styled.SubmitError>
            <Styled.ToggleButton onClick={props.toggleForm}>
              Log In
            </Styled.ToggleButton>
          </Styled.LoginFormContainer>
        </form>
      </Styled.LoginContainer>
    </Styled.LoginWrapper>
  );
}
