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
      {/* 左边 */}
      <div className="left-side">
        <img
          src={image}
          alt={productName}
          height="80px"
          onError={(e) => (e.target.style.display = "none")}
        />
        <h3>{productName}</h3>
        <QuantityCounter
          quantity={quantity}
          onAdd={() => handleAddToQuantity(id)}
          onRemove={() => handleRemoveQuantity(id)}
          min={1}
        />
        <p>${currentPrice.toFixed(2)}</p>  {/* 单价 */}
      </div>

      {/* 右边 */}
      <div className="right-side">
        <p>Total: ${(quantity * currentPrice).toFixed(2)}</p>
        <button onClick={() => handleRemoveFromCart(id)}>Remove Item</button>
      </div>
    </div>
  );
}
