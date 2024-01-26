import React from "react";
import { Link } from "react-router-dom";
import ShoppingCart from "../shoppingCart";
import "./style.css";
const Navbar = () => {
  return (
    <div className="navbar">
      <ul className="navbar-list">
        <li>
          <Link to="/" className="navbar-link">
            Home
          </Link>
        </li>
        <li>
          <Link to="/cart" className="navbar-link">
            <ShoppingCart />
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
