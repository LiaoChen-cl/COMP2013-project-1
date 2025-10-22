import { useState } from "react";

export default function NavBar({ username }) {
  const [cartCount, setCartCount] = useState(0); // 可选，可从父组件传入

  return (
    <div className="NavBar">
      <h1>Grocery Store</h1>
      <div className="user-greet">Hello, {username}</div>
      <div className="cart-icon">
        🛒
        {cartCount > 0 && <span className="red-dot">{cartCount}</span>}
      </div>
    </div>
  );
}
