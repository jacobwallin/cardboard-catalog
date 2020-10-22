import React from "react";
import { useRouteMatch } from "react-router-dom";
import AdminRoute from "../Protected_Routes/AdminRoute";
import Sidebar from "../Admin/Sidebar";
import styled from "styled-components";
import Sets from "../Admin/Sets";
import EditSet from "../Admin/EditSet";

const AdminPage = styled.div`
  display: flex;
  height: auto;
`;

export default function Admin() {
  const { path } = useRouteMatch();

  return (
    <AdminPage>
      <Sidebar />
      <AdminRoute exact path={path} component={Sets} />
      <AdminRoute exact path={`${path}/edit-set/:setId`} component={EditSet} />
      <AdminRoute exact path={`${path}/teams`} component={() => <p>teams</p>} />
      <AdminRoute
        exact
        path={`${path}/attributes`}
        component={() => <p>attributes</p>}
      />
      <AdminRoute
        exact
        path={`${path}/brands`}
        component={() => <p>brands</p>}
      />
    </AdminPage>
  );
}
