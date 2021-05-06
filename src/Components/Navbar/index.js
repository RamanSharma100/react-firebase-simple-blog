import React from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar shadow navbar-expand-lg py-3 navbar-dark bg-dark">
      <Link to="/" className="navbar-brand ml-5">
        React + Redux + Firebase Simple Blog
      </Link>
      <ul className="navbar-nav ml-auto mr-5">
        <li className="nav-item">
          <NavLink exact to="/" className="nav-link">
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink exact to="/posts" className="nav-link">
            Posts
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
