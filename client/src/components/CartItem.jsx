import "../pages/Cart.css";

const CartItem = ({
  item,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
}) => {
  return (
    <div className="cart-item">
      <div className="cart-left">
        <img
          src={item.image}
          alt={item.name}
          className="cart-image"
        />

        <div className="cart-info">
          <h2>{item.name}</h2>

          <h3 className="cart-price">
            ₹{item.price}
          </h3>

          <button
            className="remove-btn"
            onClick={() => removeFromCart(item._id)}
          >
            🗑 Remove
          </button>
        </div>
      </div>

      <div className="cart-right">
        <h3>Quantity</h3>

        <div className="quantity-box">
          <button
            onClick={() => decreaseQuantity(item._id)}
          >
            −
          </button>

          <span>{item.quantity}</span>

          <button
            onClick={() => increaseQuantity(item._id)}
          >
            +
          </button>
        </div>

        <h3 className="subtotal">
          ₹{item.price * item.quantity}
        </h3>
      </div>
    </div>
  );
};

export default CartItem;