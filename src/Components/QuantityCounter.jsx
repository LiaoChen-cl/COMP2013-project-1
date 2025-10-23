// ...existing code...
export default function QuantityCounter({ quantity, onAdd, onRemove, min = 0 }) {
  // QuantityCounter: simple +/- control with current quantity display.
  // Props:
  // - quantity: number - current value to display
  // - onAdd: function - called when '+' clicked
  // - onRemove: function - called when '-' clicked
  // - min: number - minimum allowed value (defaults to 0) used to disa
    return (
    <div className="QuantityCounter">
        {/* Decrement button: disabled when quantity is at or below minimum */}
      <button onClick={onRemove} disabled={quantity <= min}>-</button>
       {/* Current quantity shown between buttons (aria-live for screen reader updates) */}
      <span>{quantity}</span>
      {/* Increment button */}
      <button onClick={onAdd}>+</button>
    </div>
  );
}
