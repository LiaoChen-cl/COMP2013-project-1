import ProductCard from "./ProductCard";

export default function ProductsContainer({
  data,
  productQuantity,
  handleOnChangePrice,
  handleAddToQuantity,
  handleRemoveQuantity,
  handleAddToCart
}) {
  return (
    <div className="ProductsContainer">
      {data.map(product => (
        <ProductCard
          key={product.id}
          {...product}
          productQuantity={productQuantity.find(p => p.id === product.id)}
          handleOnChangePrice={handleOnChangePrice}
          handleAddToQuantity={handleAddToQuantity}
          handleRemoveQuantity={handleRemoveQuantity}
          handleAddToCart={handleAddToCart}
        />
      ))}
    </div>
  );
}
