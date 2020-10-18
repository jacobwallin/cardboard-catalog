import React from "react";
import { useRouteMatch } from "react-router-dom";
import AdminRoute from "../AdminRoute";

export default function Admin() {
  const { path } = useRouteMatch();
  return (
    <>
      <AdminRoute
        exact
        path={path}
        component={() => <p>YOU HAVE REACHED THE ADMIN PAGE</p>}
      />
    </>
  );
}
