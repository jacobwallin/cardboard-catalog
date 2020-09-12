import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import {
  HomePage,
  Collection,
  Transactions,
  PageNotFound,
} from "./components/Views";
import Login from "./components/Login";

function App() {
  return (
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

        <Route path="/login">
          <Login />
        </Route>

        <Route path="/pagenotfound">
          <PageNotFound />
        </Route>
        <Route>
          <PageNotFound />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
