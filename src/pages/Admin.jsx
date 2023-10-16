import React from "react";
import { Link } from "react-router-dom";

function Admin() {
  return (
    <div className="admin-container">
      <h1>products</h1>
      <Link to="/admin/add-product">Add product</Link>
      <Link to="/admin/add-product">Get all products</Link>
      <Link to="/admin/add-product">Get one product</Link>
      <h1>users</h1>
      <Link to="/admin/add-product">Add user</Link>
      <Link to="/admin/add-product">Get all users</Link>
      <Link to="/admin/add-product">Get one user</Link>
      <h1>orders</h1>
      <Link to="/admin/add-product">Get all orders</Link>
      <Link to="/admin/add-product">Get one order</Link>
    </div>
  );
}

export default Admin;
