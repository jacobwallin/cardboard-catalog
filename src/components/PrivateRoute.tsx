import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { RootState } from "../store";

function PrivateRoute({ component: Component, user, ...rest }: any) {
  return (
    <Route
      {...rest}
      render={(props) =>
        user.id !== 0 ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}

const mapState = (state: RootState) => {
  return {
    user: state.user,
  };
};

export default connect(mapState)(PrivateRoute);
