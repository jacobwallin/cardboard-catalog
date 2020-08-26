import React from "react";

import "./App.css";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch,
  useParams,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import { Collection, Transactions, PageNotFound } from "./components/Views";

function App() {
  return (
    <Router>
      <Navbar />

      <Switch>
        <Route exact path="/">
          <Collection />
        </Route>
        <Route path="/collection">
          <Collection />
        </Route>
        <Route path="/transactions">
          <Transactions />
        </Route>
        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
