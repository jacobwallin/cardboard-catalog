import React from "react";
import { useRouteMatch } from "react-router-dom";
import AdminRoute from "../Protected_Routes/AdminRoute";
import Sidebar from "../Admin/Sidebar";
import styled from "styled-components";
import AdminSets from "../Admin/AdminSets";
import EditSet from "../Admin/EditSet";
import EditSubset from "../Admin/EditSubset";
import EditSeries from "../Admin/EditSeries";
import EditCard from "../Admin/EditCard";

const AdminPage = styled.div`
  display: flex;
  height: auto;
`;

export default function Admin() {
  const { path } = useRouteMatch();

  return (
    <AdminPage>
      <Sidebar />
      <AdminRoute exact path={path} component={AdminSets} />
      <AdminRoute exact path={`${path}/edit-set/:setId`} component={EditSet} />
      <AdminRoute
        exact
        path={`${path}/edit-subset/:subsetId`}
        component={EditSubset}
      />
      <AdminRoute
        exact
        path={`${path}/edit-series/:seriesId`}
        component={EditSeries}
      />
      <AdminRoute
        exact
        path={`${path}/edit-card/:cardId`}
        component={EditCard}
      />
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
