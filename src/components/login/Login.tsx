import React, { useState } from "react";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { Redirect, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { login } from "../../store/user/thunks";
import { createErrorSelector } from "../../store/loading/reducer";
import StyledButton from "../Admin/components/StyledButton";
import { User } from "../../store/user/types";
import * as Styled from "./styled";

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
    <>
      {user.userData.id !== 0 ? (
        <Redirect to="/collection" />
      ) : (
        <Styled.LoginWrapper>
          <Styled.LoginContainer>
            <form id="login-form" onSubmit={handleSubmit}>
              <Styled.LoginFormContainer>
                <h2>Sign In</h2>
                <Styled.StyledInput
                  type="text"
                  placeholder="Email"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />

                <Styled.StyledInput
                  type="password"
                  placeholder="Password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {loginError && (
                  <Styled.LoginErrorMessage>
                    Invalid Username/Password
                  </Styled.LoginErrorMessage>
                )}
                <StyledButton
                  color="BLUE"
                  type="submit"
                  value="Log In"
                  width="110px"
                  height="40px"
                >
                  Log In
                </StyledButton>
                <Styled.StyledLink to="/lol">Create Account</Styled.StyledLink>
              </Styled.LoginFormContainer>
            </form>
          </Styled.LoginContainer>
        </Styled.LoginWrapper>
      )}
    </>
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
