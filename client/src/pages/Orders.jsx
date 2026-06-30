import { useEffect, useState } from "react";
import API from "../services/api";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await API.get("/orders");
        setOrders(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div style={{ padding: "30px", color: "white" }}>
      <h1>📦 My Orders</h1>

      {orders.length === 0 ? (
        <h3>No Orders Found</h3>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            style={{
              background: "rgba(255,255,255,0.1)",
              padding: "20px",
              borderRadius: "15px",
              marginTop: "15px",
            }}
          >
            <h3>{order.productName}</h3>

            <p>Price: ₹{order.price}</p>

            <p>Customer: {order.customerName}</p>

            <p>Status: {order.status}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Orders;