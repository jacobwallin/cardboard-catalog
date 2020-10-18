import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export default function AdminRoute({ component: Component, ...rest }: any) {
  const user = useSelector((state: RootState) => state.user);
  return (
    <Route
      {...rest}
      render={(props) => {
        return user.isAdmin ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        );
      }}
    />
  );
}
