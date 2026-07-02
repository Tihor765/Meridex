import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import API from "../services/api";
import { showSuccess, showError } from "../utils/toast";
import "./Checkout.css";

function Checkout() {
  const { cartItems } = useContext(CartContext);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * (item.quantity || 1),
    0
  );

  const totalItems = cartItems.reduce(
    (total, item) => total + (item.quantity || 1),
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
          showSuccess("Payment Successful!");
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
      showError(error.response?.data?.message || "Payment Failed");
    }
  };

  return (
    <div className="checkout-page">
      <h1 className="checkout-title">
        Secure Checkout
      </h1>

      <div className="checkout-layout">

        {/* Products */}

        <div className="checkout-products">
          <h2>Order Items</h2>

          {cartItems.map((item) => (
            <div
              key={item._id}
              className="checkout-item"
            >
              <img
                src={item.image}
                alt={item.name}
              />

              <div style={{ flex: 1 }}>
                <h3>{item.name}</h3>

                <p>
                  Quantity : {item.quantity || 1}
                </p>
              </div>

              <h3>
                ₹
                {item.price *
                  (item.quantity || 1)}
              </h3>
            </div>
          ))}
        </div>

        {/* Summary */}

        <div className="checkout-summary">
          <h2>Order Summary</h2>

          <p>
            Total Items :
            <strong> {totalItems}</strong>
          </p>

          <p>
            Subtotal :
            <strong> ₹{totalPrice}</strong>
          </p>

          <p>
            Delivery :
            <strong
              style={{ color: "#22c55e" }}
            >
              {" "}
              FREE
            </strong>
          </p>

          <hr />

          <h2 className="checkout-total">
            ₹{totalPrice}
          </h2>

          <button
            className="pay-btn"
            onClick={handlePayment}
          >
            Proceed to Payment
          </button>
        </div>

      </div>
    </div>
  );
}

export default Checkout;