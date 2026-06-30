import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";

function ManageProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get("/products");
        setProducts(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);

  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/products/${id}`);

      alert("✅ Product Deleted");

      const res = await API.get("/products");
      setProducts(res.data);
    } catch (error) {
      console.log(error);
      alert("❌ Delete Failed");
    }
  };

  return (
    <div style={{ padding: "30px", color: "white" }}>
      <h1>📦 Manage Products</h1>

      <p>Total Products: {products.length}</p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {products.map((product) => (
          <div
            key={product._id}
            style={{
              background: "rgba(255,255,255,0.1)",
              backdropFilter: "blur(10px)",
              padding: "15px",
              borderRadius: "15px",
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />

            <h3 style={{ marginTop: "10px" }}>
              {product.name}
            </h3>

            <p>₹{product.price}</p>

            <p>Stock: {product.stock}</p>

            <Link to={`/edit-product/${product._id}`}>
              <button
                style={{
                  background: "#22c55e",
                  color: "white",
                  border: "none",
                  padding: "10px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  width: "100%",
                  marginBottom: "10px",
                }}
              >
                Edit ✏️
              </button>
            </Link>

            <button
              onClick={() => deleteProduct(product._id)}
              style={{
                background: "red",
                color: "white",
                border: "none",
                padding: "10px",
                borderRadius: "8px",
                cursor: "pointer",
                width: "100%",
              }}
            >
              Delete 🗑️
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManageProducts;