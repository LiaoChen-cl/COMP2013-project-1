// ...existing code...
import { useState, useEffect } from "react"; // ✅加上 useEffect
import products from "../data/products";
import ProductsContainer from "./ProductsContainer";
import CartContainer from "./CartContainer";
import NavBar from "./NavBar";
import AddProductForm from "./AddProductForm"; // ***新增部分**
import axios from "axios"; // 如果你用 axios 读取数据库

// GroceriesAppContainer: top-level component that wires products, cart state and handlers.
// - Manages product quantity/price state used by the product list controls.
// - Manages cart state and exposes handlers for adding/removing items and quantities.
export default function GroceriesAppContainer() {
    // productQuantity: local state that tracks per-product quantity and currentPrice
  // Initialized from products data. Each entry shape:
  // { id, quantity, currentPrice, priceOptions, productName, img }
  const [productQuantity, setProductQuantity] = useState([]);

  // cart: array of items added to the cart.
  // Each cart item expected shape: { id, productName, img, quantity, currentPrice }
  const [cart, setCart] = useState([]);

  const [dbProducts, setDbProducts] = useState([]); // ***新增部分***

  // ***新增部分：加载数据库产品***
  useEffect(() => {
  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/products");
      // 在每个产品里加上 quantity 和 currentPrice
      const productsWithQuantity = response.data.map(p => ({
        ...p,
        quantity: 0,
        currentPrice: p.price
      }));
      setDbProducts(productsWithQuantity);
    } catch (error) {
      console.error(error);
    }
  };
  fetchProducts();
}, []);



  

   // Increment product quantity in the product list controls.
  const handleAddToQuantity = id => {
    setProductQuantity(prev =>
      prev.map(p => p.id === id ? { ...p, quantity: p.quantity + 1 } : p)
    );
  };

   // Decrement product quantity in the product list controls (not below 0).
  const handleRemoveQuantity = id => {
    setProductQuantity(prev =>
      prev.map(p => p.id === id ? { ...p, quantity: Math.max(p.quantity - 1, 0) } : p)
    );
  };

   // Update the currentPrice for a product (e.g. when user chooses a different price option).
  const handleOnChangePrice = (id, newPrice) => {
    setProductQuantity(prev =>
      prev.map(p => p.id === id ? { ...p, currentPrice: parseFloat(newPrice) } : p)
    );
  };

  // Add a product (with its selected quantity) to the cart.
  // - If quantity is zero, alert user and do nothing.
  // - If item already exists in cart, increment its quantity.
  const handleAddToCart = productToAdd => {
    if (productToAdd.quantity === 0) {
      alert("Please add quantity before adding to cart!");
      return;
    }
    setCart(prevCart => {
      const existing = prevCart.find(item => item.id === productToAdd.id);
      if (existing) {
        return prevCart.map(item =>
          item.id === productToAdd.id
            ? { ...item, quantity: item.quantity + productToAdd.quantity }
            : item
        );
      } else {
        return [...prevCart, { ...productToAdd }];
      }
    });
  };

  // Remove a single item from the cart by id.
  const handleRemoveFromCart = id => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  // Clear all items from the cart.
  const handleEmptyCart = () => setCart([]);



  // ***新增部分：删除产品***
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/products/${id}`);
      setDbProducts(prev => prev.filter(p => p.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  // ***新增部分：编辑产品***
  const handleEdit = async (id) => {
    const product = dbProducts.find(p => p.id === id);
    const newName = prompt("Enter new product name:", product.productName);
    if (!newName) return;
    try {
      await axios.patch(`http://localhost:3000/products/${id}`, { ...product, productName: newName });
      setDbProducts(prev => prev.map(p => p.id === id ? { ...p, productName: newName } : p));
    } catch (error) {
      console.error(error);
    }
  };

  // ***新增部分：添加新产品回调***
 // handleProductAdded 回调也同步更新 productQuantity
const handleProductAdded = async () => {
  try {
    const response = await axios.get("http://localhost:3000/products");
    setDbProducts(response.data);

    // 初始化所有产品的 quantity 和 currentPrice
    const initialQuantity = response.data.map(p => ({
      id: p.id,
      quantity: 0,
      currentPrice: p.price
    }));
    setProductQuantity(initialQuantity);
  } catch (error) {
    console.error(error);
  }
};



  return (
    <>
    {/* NavBar placed at top-level: shows cartCount and username */}
      {/* Note: cartCount currently uses cart.length (number of distinct items) */}
      <NavBar cartCount={cart.length} username="Liao" />
    <div className="GroceriesAppContainer">
      <AddProductForm onProductAdded={handleProductAdded} /> {/* ***新增部分*** */}
      

      <div className="MainContent">  {/* MainContent as a flex container for layout */}
         {/* ProductsContainer: renders product list and controls.
              Pass current product state and handlers for quantity/price and adding to cart. */}
        <ProductsContainer
          data={dbProducts}
          productQuantity={productQuantity}
          handleOnChangePrice={handleOnChangePrice}
          handleAddToQuantity={handleAddToQuantity}
          handleRemoveQuantity={handleRemoveQuantity}
          handleAddToCart={handleAddToCart}


          // ***新增部分***
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
        {/* CartContainer: renders cart summary and CartCard items.
                  Pass cart state and handlers for modifying/removing items. */}
        <CartContainer
          cart={cart}
          handleRemoveFromCart={handleRemoveFromCart}
          // Inline handlers update quantities directly inside cart state
          handleAddToQuantity={(id) => 
            setCart(prev => 
              prev.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item)
            )
          }
          handleRemoveQuantity={(id) => 
            setCart(prev => 
              prev.map(item => item.id === id ? { ...item, quantity: Math.max(item.quantity - 1, 0) } : item)
            )
          }
          handleEmptyCart={handleEmptyCart}
        />
   </div>
  </div>
 </>

  );
}
