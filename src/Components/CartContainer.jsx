// ...existing code...
import CartCard from "./CartCard";


// CartContainer: displays cart summary and list of items in the shopping cart.
// Props:
// - cart: array of cart item objects { id, productName, img|image, quantity, currentPrice }
// - handleRemoveFromCart: function(id) -> removes the item from cart
// - handleAddToQuantity: function(id) -> increments quantity for an item
// - handleRemoveQuantity: function(id) -> decrements quantity for an item
// - handleEmptyCart: function() -> clears all items from the cart

export default function CartContainer({
  cart,
  handleRemoveFromCart,
  handleAddToQuantity,
  handleRemoveQuantity,
  handleEmptyCart
}) {
    // Compute total number of items in the cart (sum of quantities)
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  // Compute total price across all items (quantity * unit price)
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.quantity * item.currentPrice,
    0
  );

  return (
    <div className="CartContainer">
      {/* Always display total items */}
      <h3>Total items: {totalItems}</h3>

      {cart.length === 0 ? (
        // Show message when cart is empty
        <p className="empty-cart">No items in the cart.</p>
      ) : (
        <>
         {/* Render a CartCard for each item in the cart */}
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
        {/* Action buttons: empty the cart or proceed to checkout */}
          <div className="cart-buttons">
            <button className="RemoveButton" onClick={handleEmptyCart}>
              Empty Cart
            </button>
            <button id="BuyButton">
            {/* Show checkout button with formatted total price */}
              Check out: <br /> ${totalPrice.toFixed(2)}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
     