import { useEffect, useState } from "react";
import API from "../services/api";
import OrderCard from "../components/OrderCard";
import "./Orders.css";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await API.get("/orders");
        setOrders(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="orders-page">
        <h1 className="orders-title">📦 My Orders</h1>
        <h2 className="orders-loading">Loading Orders...</h2>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <h1 className="orders-title">📦 My Orders</h1>

      {orders.length === 0 ? (
        <div className="orders-empty">
          <h2>No Orders Yet 📭</h2>
          <p>Start shopping to see your orders here.</p>
        </div>
      ) : (
        <div className="orders-grid">
          {orders.map((order) => (
            <OrderCard
              key={order._id}
              order={order}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;