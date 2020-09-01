import React from "react";

import { Link } from "react-router-dom";

import "../styling/navbar.css";

export default function Navbar() {
  return (
    <div className="navbar">
      <div id="site-name">Cardboard Collector</div>
      <Link to="/collection" className="navbar-link">
        My Collection
      </Link>
      <Link to="/transactions" className="navbar-link">
        Transactions
      </Link>
    </div>
  );
}
