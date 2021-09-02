import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import GlobalStyles from "./globalStyles";

import Navbar from "./components/Navbar";
import {
  HomePage,
  Collection,
  Transactions,
  PageNotFound,
  Admin,
} from "./components/Views";
import Login from "./components/Login";

const AppContainer = styled.div`
  min-height: 100vh;
`;

function App() {
  return (
    <AppContainer>
      <GlobalStyles />
      <Router>
        <Navbar />

        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/collection">
            <Collection />
          </Route>
          <Route path="/transactions">
            <Transactions />
          </Route>
          <Route path="/admin">
            <Admin />
          </Route>

          <Route path="/login">
            <Login />
          </Route>

          <Route path="/404">
            <PageNotFound />
          </Route>
          <Route>
            <PageNotFound />
          </Route>
        </Switch>
      </Router>
    </AppContainer>
  );
}

export default App;
