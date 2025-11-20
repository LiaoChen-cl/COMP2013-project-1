// ***新增文件***
import { useState } from "react";
import axios from "axios";

export default function AddProductForm({ onProductAdded }) {
  const [formData, setFormData] = useState({
    id: "",
    productName: "",
    brand: "",
    quantity: "",
    image: "",
    price: ""
  });

  const [responseMessage, setResponseMessage] = useState("");

  // ***新增部分***
  const handleOnChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/add-product", {
        id: parseInt(formData.id),
        productName: formData.productName,
        brand: formData.brand,
        quantity: parseInt(formData.quantity),
        image: formData.image,
        price: parseFloat(formData.price)
      });
      setResponseMessage(response.data.message);
      setFormData({ id: "", productName: "", brand: "", quantity: "", image: "", price: "" });
      if (onProductAdded) onProductAdded(); // Notify parent to refresh product list
    } catch (error) {
      console.error(error);
      setResponseMessage(error.response?.data?.message || "Error adding product");
    }
  };

  return (
    <div className="AddProductForm">
      <h3>Add New Product</h3>
      <form onSubmit={handleOnSubmit}>
        <input name="id" placeholder="ID" value={formData.id} onChange={handleOnChange} />
        <input name="productName" placeholder="Product Name" value={formData.productName} onChange={handleOnChange} />
        <input name="brand" placeholder="Brand" value={formData.brand} onChange={handleOnChange} />
        <input name="quantity" placeholder="Quantity" value={formData.quantity} onChange={handleOnChange} />
        <input name="image" placeholder="Image URL" value={formData.image} onChange={handleOnChange} />
        <input name="price" placeholder="Price" value={formData.price} onChange={handleOnChange} />
        <button type="submit">Add Product</button>
      </form>
      <p>{responseMessage}</p>
    </div>
  );
}
