import { Link } from "react-router-dom";
import "./Home.css";

const Footer = () => {
  return (
    <footer className="footer">
      <h2>MERIDEX</h2>

      <p className="footer-tagline">
        Premium Electronics • Smart Gadgets • Fast Delivery
      </p>

      <div className="footer-links">
        <Link to="/products">Products</Link>
        <Link to="/orders">Orders</Link>
        <Link to="/wishlist">Wishlist</Link>
        <Link to="/profile">Profile</Link>
      </div>

      <p className="footer-copy">
        © 2026 Meridex. All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;