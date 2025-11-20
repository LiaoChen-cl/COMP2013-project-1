// ...existing code...
import QuantityCounter from "./QuantityCounter";


// ProductCard: displays a single product with image, brand, quantity controls and add-to-cart button.
// Props:
// - productName: string - product title
// - image: string - image URL
// - brand: string - brand or subtitle
// - productQuantity: object { id, quantity, currentPrice, priceOptions? }
// - handleOnChangePrice: fn(id, newPrice) - (optional) update selected price for product
// - handleAddToQuantity: fn(id) - increment product selection quantity
// - handleRemoveQuantity: fn(id) - decrement product selection quantity
// - handleAddToCart: fn(productQuantity) - add selected product + quantity to cart
export default function ProductCard({
  productName,
  image,
  brand, 
  productQuantity,
  handleOnChangePrice,
  handleAddToQuantity,
  handleRemoveQuantity,
  handleAddToCart,
  // ***新增部分***
  onDelete,
  onEdit
}) {

  // 给 productQuantity 设置默认对象，避免 undefined
  const pq = productQuantity || { id: null, quantity: 0, currentPrice: 0 };

  return (
    <div className="ProductCard">
         {/* Product title */}
      <h3>{productName}</h3>
        {/* Product image (accessible alt text) */}
      <img src={image} alt={productName} height="100px" />
       {/* Brand or subtitle */}
      <p>{brand}</p>

 {/* Quantity controls: uses shared QuantityCounter component.
          Uses safe access (productQuantity?.quantity) in case productQuantity is undefined. */}
      <QuantityCounter
        quantity={productQuantity?.quantity || 0}
        onAdd={() => handleAddToQuantity(productQuantity.id)}
        onRemove={() => handleRemoveQuantity(productQuantity.id)}
        min={0}
      />

       {/* Display current unit price and computed total for selected quantity.
          Uses toFixed(2) for consistent currency formatting. */}
      <p>Price: ${productQuantity?.currentPrice.toFixed(2)}</p>
      <p>Total: ${(productQuantity?.quantity * productQuantity?.currentPrice || 0).toFixed(2)}</p>

         {/* Add to cart button: passes the productQuantity object (id, quantity, currentPrice).
          Caller should handle zero-quantity guard. */}
      <button onClick={() => handleAddToCart(productQuantity)}>Add to Cart</button>


      {/* ***新增部分：编辑/删除按钮*** */}
      {onEdit && <button onClick={() => onEdit(productQuantity.id)}>Edit</button>}
      {onDelete && <button onClick={() => onDelete(productQuantity.id)}>Delete</button>}
    </div>
  );
}
