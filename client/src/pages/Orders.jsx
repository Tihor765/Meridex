function Orders() {
  const orders = JSON.parse(localStorage.getItem("orders")) || [];

  return (
    <div style={{ padding: "20px" }}>
      <h1>📦 My Orders</h1>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ddd",
              padding: "15px",
              marginBottom: "15px",
              borderRadius: "10px",
            }}
          >
            <h3>{order.name}</h3>
            <p>Price: ₹{order.price}</p>
            <p>Status: 🟢 Processing</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Orders;