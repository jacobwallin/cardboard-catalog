import React from "react";

import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="navbar">
      <Link to="/Collection">My Collection</Link>
      <Link to="/Transactions">Transactions</Link>
    </div>
  );
}
