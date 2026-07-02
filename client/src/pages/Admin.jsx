import { useEffect, useState } from "react";
import API from "../services/api";
import StatCard from "../components/StatCard";
import "./Admin.css";

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
    <div className="admin-page">

      <h1 className="admin-title">
        🛠️ Admin Dashboard
      </h1>

      <p className="admin-subtitle">
        Welcome to the Meridex Admin Panel
      </p>

      <div className="stats-grid">

        <StatCard
          icon="📦"
          title="Products"
          value={products.length}
        />

        <StatCard
          icon="📋"
          title="Orders"
          value="0"
        />

        <StatCard
          icon="👥"
          title="Users"
          value="0"
        />

        <StatCard
          icon="💰"
          title="Revenue"
          value="₹0"
        />

      </div>

    </div>
  );
}

export default Admin;