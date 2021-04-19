import React, { useState } from "react";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../store";
import { login } from "../store/user/thunks";
import { createErrorSelector } from "../store/loading/reducer";

import { User } from "../store/user/types";

const LoginFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledInput = styled.input`
  width: 80%;
  height: 30px;
  padding: 5px;
  margin: 5px;

  @media only screen and (min-width: 400px) {
    width: 300px;
  }
`;

const StyledButton = styled.input`
  box-sizing: border-box;
  width: 80px;
  margin: 15px;
  color: #fff;
  background: #3f6ad8;
  box-shadow: 0 0.125rem 0.625rem rgb(63 106 216 / 40%),
    0 0.0625rem 0.125rem rgb(63 106 216 / 50%);
  border: none;
  padding: 10px 15px;
  border-radius: 3px;
  cursor: pointer;
  &:hover {
    background: #2955c8;
  }
  &:active {
    background: #2651be;
  }
  &:focus {
    outline: none !important;
  }
  &:disabled {
    opacity: 50%;
  }
`;

const LoginErrorMessage = styled.div`
  color: red;
  font-size: 0.9em;
`;

const loginErrorSelector = createErrorSelector(["GET_USER"]);

export const Login: React.FC<Props> = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const user = useSelector((state: RootState) => state.user);
  const loginError = useSelector((state: RootState) =>
    loginErrorSelector(state)
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.login(username, password);
  };

  return (
    <div>
      {user.userData.id === 0 ? (
        <form id="login-form" onSubmit={handleSubmit}>
          <LoginFormContainer>
            <h2>Sign In</h2>
            <StyledInput
              type="text"
              placeholder="Email"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <StyledInput
              type="password"
              placeholder="Password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {loginError && (
              <LoginErrorMessage>Invalid Username/Password</LoginErrorMessage>
            )}
            <StyledButton
              type="submit"
              value="Log In"
              disabled={username === "" || password === ""}
            />
          </LoginFormContainer>
        </form>
      ) : (
        <Redirect to="/collection" />
      )}
    </div>
  );
};

interface StateProps {
  user: User;
}

const mapState = (state: RootState): StateProps => ({
  user: state.user.userData,
});

interface DispatchProps {
  login: (username: string, password: string) => void;
}

const mapDispatch = (dispatch: ThunkDispatch<{}, {}, any>): DispatchProps => {
  return {
    login: (username, password) => dispatch(login(username, password)),
  };
};

type Props = StateProps & DispatchProps;

export default connect(mapState, mapDispatch)(Login);
