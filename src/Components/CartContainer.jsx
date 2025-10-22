import CartCard from "./CartCard";

export default function CartContainer({
  cart,
  handleRemoveFromCart,
  handleAddToQuantity,
  handleRemoveQuantity,
  handleEmptyCart
}) {
  if (cart.length === 0) {
    return <p className="empty-cart">No items in the cart.</p>;
  }

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.quantity * item.currentPrice,
    0
  );

  return (
    <div className="CartContainer">
      <h3>You have {totalItems} items in the cart</h3>

      {cart.map((item) => (
        <CartCard
          key={item.id}
          id={item.id}
          productName={item.productName}
          image={item.img || item.image}
          quantity={item.quantity}
          currentPrice={item.currentPrice}
          handleRemoveFromCart={handleRemoveFromCart}
          handleAddToQuantity={handleAddToQuantity}
          handleRemoveQuantity={handleRemoveQuantity}
        />
      ))}

      <div className="cart-buttons">
        <button className="RemoveButton" onClick={handleEmptyCart}>Empty Cart</button>
        <button id="BuyButton"> Check out: ${totalPrice.toFixed(2)}</button>
      </div>
    </div>
  );
}
