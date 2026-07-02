import { useState } from "react";
import API from "../services/api";
import { showSuccess, showError } from "../utils/toast";

function AddProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/products", {
        name,
        price,
        description,
        image,
        category,
        stock,
      });

      showSuccess("Product Added Successfully");

      setName("");
      setPrice("");
      setDescription("");
      setImage("");
      setCategory("");
      setStock("");
    } catch (error) {
      console.log(error);
      showError(error.response?.data?.message || "Failed to add product");
    }
  };

  return (
    <div
      style={{
        padding: "30px",
        color: "white",
        maxWidth: "700px",
        margin: "0 auto",
      }}
    >
      <h1>➕ Add Product</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            margin: "10px 0",
            borderRadius: "8px",
            border: "none",
          }}
          required
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            margin: "10px 0",
            borderRadius: "8px",
            border: "none",
          }}
          required
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            margin: "10px 0",
            borderRadius: "8px",
            border: "none",
            minHeight: "100px",
          }}
          required
        />

        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            margin: "10px 0",
            borderRadius: "8px",
            border: "none",
          }}
          required
        />

        <input
          type="text"
          placeholder="Category (Electronics / Fashion / Books)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            margin: "10px 0",
            borderRadius: "8px",
            border: "none",
          }}
          required
        />

        <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            margin: "10px 0",
            borderRadius: "8px",
            border: "none",
          }}
          required
        />

        <button
          type="submit"
          style={{
            background: "#2563eb",
            color: "white",
            border: "none",
            padding: "12px 20px",
            borderRadius: "8px",
            cursor: "pointer",
            marginTop: "10px",
          }}
        >
          Add Product
        </button>
      </form>
    </div>
  );
}

export default AddProduct;