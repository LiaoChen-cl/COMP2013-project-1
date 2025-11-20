// ...existing code...
import ProductCard from "./ProductCard";

// ProductsContainer: renders the grid/list of products using ProductCard.
// Props:
// - data: array of product objects from data/products
// - productQuantity: array tracking per-product selection state (id, quantity, currentPrice, ...)
// - handleOnChangePrice: fn(id, newPrice) -> update selected price for a product
// - handleAddToQuantity: fn(id) -> increment selection quantity for a product
// - handleRemoveQuantity: fn(id) -> decrement selection quantity for a product
// - handleAddToCart: fn(productQuantity) -> add selected product (with quantity) to cart
export default function ProductsContainer({
  data,
  productQuantity,
  handleOnChangePrice,
  handleAddToQuantity,
  handleRemoveQuantity,
  handleAddToCart,
  // ***新增部分***
  handleDelete,
  handleEdit
}) {
  return (
    <div className="ProductsContainer">
         {/* Map each product to a ProductCard, passing the corresponding productQuantity entry */}
      {data.map(product => (
        <ProductCard
          key={product.id}
          {...product}
            // Find the matching productQuantity state by id (may be undefined if not initialized)
          productQuantity={productQuantity.find(p => p.id === product.id)}
          handleOnChangePrice={handleOnChangePrice}
          handleAddToQuantity={handleAddToQuantity}
          handleRemoveQuantity={handleRemoveQuantity}
          handleAddToCart={handleAddToCart}

          // ***新增部分***
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      ))}
    </div>
  );
}
