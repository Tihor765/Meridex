import { useEffect, useState } from "react";
import API from "../services/api";

function Admin() {
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

  return (
    <div style={{ padding: "30px", color: "white" }}>
      <h1>🛠️ Admin Dashboard</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        <div
          style={{
            background: "rgba(255,255,255,0.1)",
            padding: "20px",
            borderRadius: "15px",
          }}
        >
          <h2>📦 Products</h2>
          <h1>{products.length}</h1>
        </div>

        <div
          style={{
            background: "rgba(255,255,255,0.1)",
            padding: "20px",
            borderRadius: "15px",
          }}
        >
          <h2>📋 Orders</h2>
          <h1>0</h1>
        </div>

        <div
          style={{
            background: "rgba(255,255,255,0.1)",
            padding: "20px",
            borderRadius: "15px",
          }}
        >
          <h2>👥 Users</h2>
          <h1>0</h1>
        </div>

        <div
          style={{
            background: "rgba(255,255,255,0.1)",
            padding: "20px",
            borderRadius: "15px",
          }}
        >
          <h2>💰 Revenue</h2>
          <h1>₹0</h1>
        </div>
      </div>
    </div>
  );
}

export default Admin;