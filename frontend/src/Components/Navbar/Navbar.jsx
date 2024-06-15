import React, { useContext, useState } from "react";
import "./Navbar.css";
import logo from "../Assets/logo.png";
import carticon from "../Assets/cart_icon.png";
import { Link } from "react-router-dom";
import { Shopcontext } from "../../Context/Shopcontext";

function Navbar() {
  const [menu, setmenu] = useState("shop");
  const { gettotalcartitem } = useContext(Shopcontext);
  return (
    <div className="navbar">
      <div className="nav-logo">
        <img className="logo" src={logo} alt="logo" />
        <p>Shopper</p>
      </div>
      <div>
        <ul className="nav-menu">
          <li
            onClick={() => {
              setmenu("shop");
            }}
          >
            <Link style={{ textDecoration: "none" }} to={"/"}>
              Shop
            </Link>
            {menu === "shop" ? <hr /> : <></>}
          </li>
          <li
            onClick={() => {
              setmenu("men");
            }}
          >
            <Link style={{ textDecoration: "none" }} to={"/Men"}>
              Men
            </Link>
            {menu === "men" ? <hr /> : <></>}
          </li>
          <li
            onClick={() => {
              setmenu("women");
            }}
          >
            <Link style={{ textDecoration: "none" }} to={"/women"}>
              Women
            </Link>
            {menu === "women" ? <hr /> : <></>}
          </li>
          <li
            onClick={() => {
              setmenu("kid");
            }}
          >
            <Link style={{ textDecoration: "none" }} to={"/Kid"}>
              Kid
            </Link>
            {menu === "Kid" ? <hr /> : <></>}
          </li>
        </ul>
      </div>
      <div className="nav-login-cart">
        {localStorage.getItem("auth-token") ? (
          <button
            onClick={() => {
              localStorage.removeItem("auth-token");
              window.location.replace("/");
            }}
          >
            Logout
          </button>
        ) : (
          <Link style={{ textDecoration: "none" }} to={"/login"}>
            <button>Login</button>
          </Link>
        )}

        <Link style={{ textDecoration: "none" }} to={"/cart"}>
          <img src={carticon} alt="" />
        </Link>

        <div className="nav-cart-count">{gettotalcartitem()}</div>
      </div>
    </div>
  );
}

export default Navbar;
