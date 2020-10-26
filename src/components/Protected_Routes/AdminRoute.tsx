import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

// only renders the component prop if user is an admin, otherwise redirects to login page
export default function AdminRoute({ component: Component, ...rest }: any) {
  const user = useSelector((state: RootState) => state.user);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (user.userFetched) {
          return user.userData.isAdmin ? (
            <Component {...props} />
          ) : (
            <Redirect to="/login" />
          );
        }
      }}
    />
  );
}
