import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "./store";
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
import Login from "./components/login/Login";

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
