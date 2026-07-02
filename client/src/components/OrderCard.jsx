import "../pages/Orders.css";

const OrderCard = ({ order }) => {
  return (
    <div className="order-card">
      <div className="order-image-container">
        <img
          src={order.product?.image}
          alt={order.product?.name}
          className="order-image"
        />
      </div>

      <div className="order-details">
        <h2 className="order-product-name">
          {order.product?.name}
        </h2>

        <p className="order-price">
          ₹{order.product?.price}
        </p>

        <p className="order-date">
          📅 Ordered on{" "}
          {new Date(order.createdAt).toLocaleDateString()}
        </p>

        <span className="order-status">
          ✅ Delivered
        </span>
      </div>
    </div>
  );
};

export default OrderCard;