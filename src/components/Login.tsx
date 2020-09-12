import React, { useState } from "react";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { login } from "../store/user/thunks";

import { User } from "../store/user/types";

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
      {user.id === 0 ? (
        <form id="login-form" onSubmit={handleSubmit}>
          <label htmlFor="username">username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="username">password:</label>
          <input
            type="text"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input type="submit" />
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
  user: state.user,
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
