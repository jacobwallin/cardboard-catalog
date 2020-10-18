import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export default function PrivateRoute({ component: Component, ...rest }: any) {
  const user = useSelector((state: RootState) => state.user);
  return (
    <Route
      {...rest}
      render={(props) =>
        user.id !== 0 ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}
