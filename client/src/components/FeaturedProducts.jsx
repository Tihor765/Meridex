import { Link } from "react-router-dom";
import "./Home.css";

const FeaturedProducts = ({ products }) => {
  return (
    <section className="featured-section">
      <h2 className="section-title">
        🔥 Featured Products
      </h2>

      <div className="featured-grid">
        {products.slice(0, 8).map((product) => (
          <div
            key={product._id}
            className="product-card"
          >
            <div className="discount-badge">
              20% OFF
            </div>

            <img
              src={product.image}
              alt={product.name}
              className="product-image"
            />

            <div className="product-content">
              <h3>{product.name}</h3>

              <p className="product-rating">
                ⭐⭐⭐⭐⭐ (4.8)
              </p>

              <h2 className="product-price">
                ₹{product.price}
              </h2>

              <Link to={`/product/${product._id}`}>
                <button className="details-btn">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;