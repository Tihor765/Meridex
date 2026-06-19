import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Cart() {
  const { cartItems, removeFromCart } = useContext(CartContext);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price,
    0
  );

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>🛒 My Cart</h1>

      {cartItems.length === 0 ? (
        <p style={{ textAlign: "center" }}>No items in cart.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div
              key={item._id}
              style={{
                border: "1px solid gray",
                padding: "20px",
                margin: "10px 0",
                textAlign: "center",
                borderRadius: "10px",
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
          ))}

          {/* Order Summary */}
          <div
            style={{
              textAlign: "center",
              marginTop: "20px",
              padding: "20px",
              border: "1px solid gray",
              borderRadius: "10px",
            }}
          >
            <h2>Order Summary</h2>

            <p>Total Items: {cartItems.length}</p>

            <p>
              <strong>Total Price: ₹{totalPrice}</strong>
            </p>

            <button
              onClick={() => alert("Order Placed Successfully! 🎉")}
              style={{
                backgroundColor: "green",
                color: "white",
                border: "none",
                padding: "10px 20px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Checkout 🛒
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;