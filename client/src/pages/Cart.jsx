import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Cart() {
  const { cartItems } = useContext(CartContext);
alert("Cart Items: " + cartItems.length);
  console.log("Cart Items:", cartItems);

  return (
    <div style={{ padding: "20px" }}>
      <h1>My Cart</h1>

      {cartItems.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        cartItems.map((item) => (
          <div
            key={item._id}
            style={{
              border: "1px solid gray",
              padding: "10px",
              margin: "10px 0",
            }}
          >
            <h3>{item.name}</h3>
            <p>₹{item.price}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Cart;