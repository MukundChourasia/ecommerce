import React from "react";
import "../Sidebar/Sidebar.css";
import { Link } from "react-router-dom";
import addproduct_icon from "../../Assets/Product_Cart.svg";
import list_product_icon from "../../Assets/Product_list_icon.svg";

function Sidebar() {
  return (
    <div className="sidebar">
      <Link to={"/addproduct"} style={{ textDecoration: "none" }}>
        <div className="sidebar-item">
          <img src={addproduct_icon} alt="" />
          <p>Add Product</p>
        </div>
      </Link>
      <Link to={"/listproduct"} style={{ textDecoration: "none" }}>
        <div className="sidebar-item">
          <img src={list_product_icon} alt="" />
          <p>Product List</p>
        </div>
      </Link>
    </div>
  );
}

export default Sidebar;
