import React, { useEffect } from "react";

import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { fetchMe } from "../store/user/thunks";

import "../styling/navbar.css";

export default function Navbar() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.userData);

  useEffect(() => {
    if (user.id === 0) {
      dispatch(fetchMe());
    }
  }, []);

  return (
    <div className="navbar">
      <div id="site-name">Cardboard Collector</div>
      {user.id !== 0 ? (
        <>
          {user.isAdmin && (
            <Link to="/admin" className="navbar-link">
              Admin
            </Link>
          )}
          <Link to="/collection" className="navbar-link">
            My Collection
          </Link>
          <Link to="/transactions" className="navbar-link">
            Transactions
          </Link>
        </>
      ) : (
        <Link to="/login" className="navbar-link">
          Login
        </Link>
      )}
    </div>
  );
}
