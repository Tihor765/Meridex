import { Link } from "react-router-dom";
import "./Home.css";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <span className="hero-tag">
          New Collection 2026
        </span>

        <h1>
          Discover Your <br />
          Perfect Style
        </h1>

        <p>
          Explore premium fashion, electronics,
          accessories and lifestyle products at
          unbeatable prices.
        </p>

        <div className="hero-buttons">
          <Link to="/products" className="shop-btn">
            Shop Now
          </Link>

          <Link to="/products" className="explore-btn">
            Explore
          </Link>
        </div>
      </div>

      <div className="hero-image">
        <img
          src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=900"
          alt="Shopping"
        />
      </div>
    </section>
  );
};

export default Hero;