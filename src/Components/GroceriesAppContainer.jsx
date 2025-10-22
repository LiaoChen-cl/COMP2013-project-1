import { useState } from "react";
import products from "../data/products";
import ProductsContainer from "./ProductsContainer";
import CartContainer from "./CartContainer";

export default function GroceriesAppContainer() {
  const [productQuantity, setProductQuantity] = useState(
    products.map(p => ({
      id: p.id,
      quantity: 0,
      currentPrice: parseFloat(p.price.replace("$", "")),
      priceOptions: [parseFloat(p.price.replace("$", ""))],
      productName: p.productName,
      img: p.image
    }))
  );

  const [cart, setCart] = useState([]);

  const handleAddToQuantity = id => {
    setProductQuantity(prev =>
      prev.map(p => p.id === id ? { ...p, quantity: p.quantity + 1 } : p)
    );
  };

  const handleRemoveQuantity = id => {
    setProductQuantity(prev =>
      prev.map(p => p.id === id ? { ...p, quantity: Math.max(p.quantity - 1, 0) } : p)
    );
  };

  const handleOnChangePrice = (id, newPrice) => {
    setProductQuantity(prev =>
      prev.map(p => p.id === id ? { ...p, currentPrice: parseFloat(newPrice) } : p)
    );
  };

  const handleAddToCart = productToAdd => {
    if (productToAdd.quantity === 0) {
      alert("Please add quantity before adding to cart!");
      return;
    }
    setCart(prevCart => {
      const existing = prevCart.find(item => item.id === productToAdd.id);
      if (existing) {
        return prevCart.map(item =>
          item.id === productToAdd.id
            ? { ...item, quantity: item.quantity + productToAdd.quantity }
            : item
        );
      } else {
        return [...prevCart, { ...productToAdd }];
      }
    });
  };

  const handleRemoveFromCart = id => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const handleEmptyCart = () => setCart([]);

  return (
    <div className="GroceriesAppContainer">
      <ProductsContainer
        data={products}
        productQuantity={productQuantity}
        handleOnChangePrice={handleOnChangePrice}
        handleAddToQuantity={handleAddToQuantity}
        handleRemoveQuantity={handleRemoveQuantity}
        handleAddToCart={handleAddToCart}
      />

      <h2>Shopping Cart</h2>
      <CartContainer
        cart={cart}
        handleRemoveFromCart={handleRemoveFromCart}
        handleAddToQuantity={handleAddToQuantity}
        handleRemoveQuantity={handleRemoveQuantity}
        handleEmptyCart={handleEmptyCart}
      />


      {cart.length > 0 && (
        <div className="cart-summary">
          <p>
            Total Price: $
            {cart.reduce((sum, item) => sum + item.quantity * item.currentPrice, 0).toFixed(2)}
          </p>
          <button onClick={handleEmptyCart}>Empty Cart</button>
          <button>Buy</button>
        </div>
      )}
    </div>
  );
}
