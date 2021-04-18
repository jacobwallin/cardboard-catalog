import React, { useState } from "react";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../store";
import { login } from "../store/user/thunks";

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

export const Login: React.FC<Props> = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const user = useSelector((state: RootState) => state.user);

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
              type="text"
              placeholder="Password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input type="submit" />
          </LoginFormContainer>
        </form>
      ) : (
        <Redirect to="/" />
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
