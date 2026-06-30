import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

function EditProduct() {
const { id } = useParams();
const navigate = useNavigate();

const [name, setName] = useState("");
const [price, setPrice] = useState("");
const [description, setDescription] = useState("");
const [image, setImage] = useState("");
const [stock, setStock] = useState("");

useEffect(() => {
const fetchProduct = async () => {
try {
const res = await API.get(`/products/${id}`);
    setName(res.data.name);
    setPrice(res.data.price);
    setDescription(res.data.description);
    setImage(res.data.image);
    setStock(res.data.stock);
  } catch (error) {
    console.log(error);
  }
};

fetchProduct();
}, [id]);

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    await API.put(`/products/${id}`, {
      name,
      price,
      description,
      image,
      stock,
    });

    alert("✅ Product Updated");

    navigate("/manage-products");
  } catch (error) {
    console.log(error);
    alert("❌ Update Failed");
  }
};

return (
<div style={{ padding: "30px", color: "white" }}> <h1>✏️ Edit Product</h1>

```
  <form onSubmit={handleSubmit}>
    <input
      type="text"
      value={name}
      onChange={(e) => setName(e.target.value)}
      placeholder="Product Name"
      style={{
        width: "100%",
        padding: "10px",
        marginBottom: "10px",
      }}
    />

    <input
      type="number"
      value={price}
      onChange={(e) => setPrice(e.target.value)}
      placeholder="Price"
      style={{
        width: "100%",
        padding: "10px",
        marginBottom: "10px",
      }}
    />

    <textarea
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      placeholder="Description"
      style={{
        width: "100%",
        padding: "10px",
        marginBottom: "10px",
      }}
    />

    <input
      type="text"
      value={image}
      onChange={(e) => setImage(e.target.value)}
      placeholder="Image URL"
      style={{
        width: "100%",
        padding: "10px",
        marginBottom: "10px",
      }}
    />

    <input
      type="number"
      value={stock}
      onChange={(e) => setStock(e.target.value)}
      placeholder="Stock"
      style={{
        width: "100%",
        padding: "10px",
        marginBottom: "10px",
      }}
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
      }}
    >
      Update Product
    </button>
  </form>
</div>
);
}

export default EditProduct;
