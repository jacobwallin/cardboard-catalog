import React, { useState } from "react";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { login, demo } from "../../store/user/thunks";
import { createErrorSelector } from "../../store/loading/reducer";
import { User } from "../../store/user/types";
import * as Styled from "./styled";

const loginErrorSelector = createErrorSelector(["GET_USER"]);

interface FormStateInstance {
  value: string;
  focused: boolean;
}
interface FormState {
  username: FormStateInstance;
  password: FormStateInstance;
}

export const LoginForm: React.FC<Props> = (props) => {
  const [formState, setFormState] = useState({
    username: { value: "", focused: false },
    password: { value: "", focused: false },
  });

  const loginError = useSelector((state: RootState) =>
    loginErrorSelector(state)
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.login(formState.username.value, formState.password.value);
  };

  const handleDemo = () => {
    props.demo();
  };

  function handleFormChange(event: React.ChangeEvent<HTMLInputElement>) {
    setFormState({
      ...formState,
      [event.target.id]: { focused: true, value: event.target.value },
    });
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
        <form id="login-form" onSubmit={handleSubmit}>
          <Styled.LoginFormContainer>
            <h2>Sign In</h2>
            <Styled.InputContainer>
              <Styled.StyledInput
                type="text"
                placeholder={
                  formState.username.focused ? "" : "username / email"
                }
                id="username"
                value={formState.username.value}
                onChange={handleFormChange}
                onBlur={removeFocusedElement}
                onFocus={setFocusedElement}
                autoComplete="off"
                error={false}
                valid={false}
              />
              <Styled.InputLabel displayLabel={formState.username.focused}>
                username
              </Styled.InputLabel>
            </Styled.InputContainer>
            <Styled.InputContainer>
              <Styled.StyledInput
                type="password"
                placeholder={formState.password.focused ? "" : "password"}
                id="password"
                value={formState.password.value}
                onChange={handleFormChange}
                onBlur={removeFocusedElement}
                onFocus={setFocusedElement}
                autoComplete="off"
                error={false}
                valid={false}
              />
              <Styled.InputLabel displayLabel={formState.password.focused}>
                password
              </Styled.InputLabel>
            </Styled.InputContainer>
            {loginError && (
              <Styled.LoginErrorMessage>
                Invalid Username/Password
              </Styled.LoginErrorMessage>
            )}
            <Styled.LoginButton
              color="BLUE"
              type="submit"
              value="Log In"
              width="110px"
              height="40px"
            >
              Log In
            </Styled.LoginButton>
            <Styled.LoginButton
              color="BLUE"
              type="button"
              value="Log In"
              width="110px"
              height="40px"
              onClick={handleDemo}
            >
              Demo
            </Styled.LoginButton>
            <Styled.ToggleButton onClick={props.toggleForm}>
              Create Account
            </Styled.ToggleButton>
          </Styled.LoginFormContainer>
        </form>
      </Styled.LoginContainer>
    </Styled.LoginWrapper>
  );
};

interface PassedProps {
  toggleForm(): void;
}
interface StateProps {
  user: User;
}

const mapState = (state: RootState): StateProps => ({
  user: state.user.userData,
});

interface DispatchProps {
  login: (username: string, password: string) => void;
  demo: () => void;
}

const mapDispatch = (dispatch: ThunkDispatch<{}, {}, any>): DispatchProps => {
  return {
    login: (username, password) => dispatch(login(username, password)),
    demo: () => dispatch(demo()),
  };
};

type Props = StateProps & DispatchProps & PassedProps;

export default connect(mapState, mapDispatch)(LoginForm);
