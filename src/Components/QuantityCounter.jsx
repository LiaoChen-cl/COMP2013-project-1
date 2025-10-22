export default function QuantityCounter({ quantity, onAdd, onRemove, min = 0 }) {
  return (
    <div className="QuantityCounter">
      <button onClick={onRemove} disabled={quantity <= min}>-</button>
      <span>{quantity}</span>
      <button onClick={onAdd}>+</button>
    </div>
  );
}
