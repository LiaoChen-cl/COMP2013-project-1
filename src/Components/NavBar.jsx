import { useState } from "react";

import React from "react";


export default function NavBar({ cartCount, username }) {
  return (
    <div className="NavBar">
      <div className="user-greet">Hello, {username}</div>
      <h1>Grocery Store🍎</h1>
      <div className="cart-icon">
        🛒
        {cartCount > 0 && <span className="red-dot"></span>}
      </div>
    </div>
  );
}
