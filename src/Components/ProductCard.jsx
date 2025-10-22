import QuantityCounter from "./QuantityCounter";

export default function ProductCard({
  productName,
  image,
  productQuantity,
  handleOnChangePrice,
  handleAddToQuantity,
  handleRemoveQuantity,
  handleAddToCart
}) {
  return (
    <div className="ProductCard">
      <img src={image} alt={productName} height="100px" />
      <h3>{productName}</h3>

      <QuantityCounter
        quantity={productQuantity?.quantity || 0}
        onAdd={() => handleAddToQuantity(productQuantity.id)}
        onRemove={() => handleRemoveQuantity(productQuantity.id)}
        min={0}
      />

      <p>Price: ${productQuantity?.currentPrice.toFixed(2)}</p>
      <p>Total: ${(productQuantity?.quantity * productQuantity?.currentPrice || 0).toFixed(2)}</p>

      <button onClick={() => handleAddToCart(productQuantity)}>Add to Cart</button>
    </div>
  );
}
