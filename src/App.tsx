import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import GlobalStyles from "./globalStyles";
import Navbar from "./components/navbar/Navbar";
import AdminRoute from "./components/Protected_Routes/AdminRoute";
import { Collection, PageNotFound, Admin } from "./components/Views";
import Transactions from "./components/transactions/Transactions";
import Browse from "./components/browse/Browse";
import Login from "./components/login/Login";
import SetPage from "./components/Collection/set_page/SetPage";
import SubsetPage from "./components/Collection/subset_page/SubsetPage";

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

function App() {
  const user = useSelector((state: RootState) => state.user.userData);
  const userFetched = useSelector((state: RootState) => state.user.userFetched);

  return (
    <AppContainer>
      <GlobalStyles />
      <Router>
        <Navbar />
        {userFetched &&
          (user.id === 0 ? (
            <Login />
          ) : (
            <Switch>
              <Route exact path="/">
                <Collection />
              </Route>
              <Route path="/collection">
                <Collection />
              </Route>
              {/* TODO: change to render components as child components and use hooks */}
              <Route exact path={`/set/:setId`} component={SetPage} />
              <Route exact path={`/subset/:subsetId`} component={SubsetPage} />
              <Route path="/browse">
                <Browse />
              </Route>
              <Route path="/transactions">
                <Transactions />
              </Route>
              <AdminRoute path="/admin">
                <Admin />
              </AdminRoute>
              <Route path="/404">
                <PageNotFound />
              </Route>
              <Route>
                <PageNotFound />
              </Route>
            </Switch>
          ))}
      </Router>
    </AppContainer>
  );
}

export default App;
