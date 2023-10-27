import { useState } from "react";
import "./App.css";
import { Link, Outlet, useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  const path = location.pathname;

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark text-white navbar-dark">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <Link
                className={`nav-link ${path.includes("/users") && "active"}`}
                aria-current="page"
                to="users"
                name="users"
              >
                Users
              </Link>
              <Link
                className={`nav-link ${path.includes('/photos') && "active"}`}
                to="photos"
                name="photos"
              >
                Photos
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
}

export default App;
