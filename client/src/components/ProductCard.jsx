import { Link } from "react-router-dom";
import "../pages/Products.css";

const ProductCard = ({
  product,
  addToCart,
  addToWishlist,
  setMessage,
}) => {
  return (
    <div className="product-card">
      <Link
        to={`/product/${product._id}`}
        className="product-image-link"
      >
        <div className="discount-badge">
          20% OFF
        </div>

        <img
          src={product.image}
          alt={product.name}
          className="product-image"
        />
      </Link>

      <div className="product-content">
        <h3 className="product-name">
          {product.name}
        </h3>

        <p className="product-description">
          {product.description}
        </p>

        <div className="product-rating">
          ⭐⭐⭐⭐⭐
          <span>(4.8)</span>
        </div>

        <h2 className="product-price">
          ₹{product.price}
        </h2>

        <p className="product-stock">
          Stock: {product.stock}
        </p>

        <div className="product-buttons">
          <button
            className="wishlist-btn"
            onClick={() => {
              addToWishlist(product);

              setMessage(
                `❤️ ${product.name} added to wishlist`
              );

              setTimeout(() => {
                setMessage("");
              }, 2000);
            }}
          >
            ❤️ Wishlist
          </button>

          <button
            className="cart-btn"
            onClick={() => {
              addToCart(product);

              setMessage(
                `🛒 ${product.name} added to cart`
              );

              setTimeout(() => {
                setMessage("");
              }, 2000);
            }}
          >
            🛒 Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;