import QuantityCounter from "./QuantityCounter";

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
      <img
        src={image}
        alt={productName}
        height="80px"
        onError={(e) => (e.target.style.display = "none")} // Hide broken images
      />
      <h3>{productName}</h3>

      <QuantityCounter
        quantity={quantity}
        onAdd={() => handleAddToQuantity(id)}
        onRemove={() => handleRemoveQuantity(id)}
        min={1}
      />

      <p>Price: ${currentPrice.toFixed(2)}</p>
      <p>Subtotal: ${(quantity * currentPrice).toFixed(2)}</p>

      <button onClick={() => handleRemoveFromCart(id)}>Remove Item</button>
    </div>
  );
}
