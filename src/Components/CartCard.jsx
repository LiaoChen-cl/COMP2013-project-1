// ...existing code...
import QuantityCounter from "./QuantityCounter";

// CartCard: displays a single item in the shopping cart.
// Props:
// - productName: string, name of the product
// - image: string, URL of the product image
// - quantity: number, current quantity in cart
// - currentPrice: number, unit price
// - id: unique identifier for the cart item
// - handleRemoveFromCart: function(id) -> removes the item from cart
// - handleAddToQuantity: function(id) -> increments quantity
// - handleRemoveQuantity: function(id) -> decrements quantity
export default function CartCard({
  productName,
  image,
  quantity,
  currentPrice,
  id,
  handleRemoveFromCart,
  handleAddToQuantity,
  handleRemoveQuantity,
}) {
  return (
    <div className="CartCard">
      {/* Left side: product image, name, unit price, and quantity controls */}
      <div className="left-side">
        <img
          src={image}
          alt={productName}
          height="80px"
           // If the image fails to load, hide the img element to avoid broken image icon
          onError={(e) => (e.target.style.display = "none")}
        />
        <h3>{productName}</h3>
        {/* Unit price formatted to two decimal places */}
        <p>${currentPrice.toFixed(2)}</p>  
        <QuantityCounter
          quantity={quantity}
        // Callbacks to update quantity for this item
          onAdd={() => handleAddToQuantity(id)}
          onRemove={() => handleRemoveQuantity(id)}
          min={1} // Minimum allowed quantity is 1
        />
        
      </div>

      {/* Right side: total price for this item and remove button */}
      <div className="right-side">
        {/* Total = quantity * unit price, formatted to two decimals */}
        <p>Total: ${(quantity * currentPrice).toFixed(2)}</p>
         {/* Remove button removes the entire item from the cart */}
        <button className="remove-btn" onClick={() => handleRemoveFromCart(id)}>Remove</button>
      </div>
    </div>
  );
}
