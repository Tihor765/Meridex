import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import CartItem from "../components/CartItem";
import "./Cart.css";

function Cart() {
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useContext(CartContext);

  const navigate = useNavigate();

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <div className="cart-page">
      <h1 className="cart-title">
        🛒 My Shopping Cart
      </h1>

      {cartItems.length === 0 ? (
  <div className="empty-cart">
    <div className="empty-cart-icon">🛒</div>

    <h2>Your Cart is Empty</h2>

    <p>
      Looks like you haven't added any products yet.
    </p>

    <button
      className="continue-shopping-btn"
      onClick={() => navigate("/products")}
    >
      Continue Shopping
    </button>
  </div>
) : (
        <div className="cart-layout">

          {/* Left Side - Cart Items */}
          <div className="cart-items">
            {cartItems.map((item) => (
              <CartItem
                key={item._id}
                item={item}
                removeFromCart={removeFromCart}
                increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity}
              />
            ))}
          </div>

          {/* Right Side - Order Summary */}
          <div className="order-summary">

            <h2>Order Summary</h2>

            <hr />

            <p>
              <strong>Total Items:</strong> {totalItems}
            </p>

            <p>
              <strong>Subtotal:</strong> ₹{totalPrice}
            </p>

            <p>
              <strong>Delivery:</strong> FREE 🚚
            </p>

            <hr />

            <h2 className="total-price">
              Total: ₹{totalPrice}
            </h2>

            <button
              className="checkout-btn"
              onClick={() => navigate("/checkout")}
            >
              Proceed to Payment 💳
            </button>

          </div>

        </div>
      )}
    </div>
  );
}

export default Cart;