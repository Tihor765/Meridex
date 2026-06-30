import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import API from "../services/api";
import "./Checkout.css";

function Checkout() {
  const { cartItems } = useContext(CartContext);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price,
    0
  );

  const handlePayment = async () => {
    try {
      const { data: order } = await API.post("/payments/create-order", {
        amount: totalPrice,
      });

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Meridex",
        description: "Meridex Shopping Payment",
        order_id: order.id,

        handler: function (response) {
          alert("✅ Payment Successful!");
          console.log(response);
        },

        theme: {
          color: "#2563eb",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.log(error);
      console.log(error.response?.data);
      alert(error.response?.data?.message || "❌ Payment Failed");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
        flexDirection: "column",
      }}
    >
      <h1>💳 Checkout</h1>

      <h2>Total: ₹{totalPrice}</h2>

      <button
        onClick={handlePayment}
        style={{
          padding: "15px 30px",
          background: "#22c55e",
          color: "white",
          border: "none",
          borderRadius: "10px",
          fontSize: "18px",
          cursor: "pointer",
          marginTop: "20px",
        }}
      >
        Pay ₹{totalPrice}
      </button>
    </div>
  );
}

export default Checkout;