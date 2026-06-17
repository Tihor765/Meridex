import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Cart() {
  const { cartItems, removeFromCart } = useContext(CartContext);
  
  console.log("Cart Items:", cartItems);

return (
  <div style={{ padding: "20px" }}>
    <h1 style={{ textAlign: "center" }}>My Cart</h1>

    {cartItems.length === 0 ? (
      <p style={{ textAlign: "center" }}>No items in cart.</p>
    ) : (
      cartItems.map((item) => (
        <div
          key={item._id}
          style={{
            border: "1px solid gray",
            padding: "20px",
            margin: "10px 0",
            textAlign: "center",
          }}
        >
          <h3>{item.name}</h3>
          <p>₹{item.price}</p>

          <button
            onClick={() => removeFromCart(item._id)}
            style={{
              backgroundColor: "red",
              color: "white",
              border: "none",
              padding: "10px 15px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Remove 🗑️
          </button>
        </div>
      ))
    )}
  </div>
);
}

export default Cart;