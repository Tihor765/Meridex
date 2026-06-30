import { Link } from "react-router-dom";
import { useContext } from "react";
import {
  FaShoppingCart,
  FaHeart,
  FaUser,
  FaHome,
  FaBoxOpen,
  FaClipboardList,
  FaSearch,
  FaStore,
} from "react-icons/fa";

import { CartContext } from "../context/CartContext";
import { SearchContext } from "../context/SearchContext";
import "./Navbar.css";

function Navbar() {
  const { cartItems } = useContext(CartContext);
  const { search, setSearch } = useContext(SearchContext);

  const token = localStorage.getItem("token");
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  return (
    <nav className="navbar">
      {/* Logo */}
      <Link to="/" className="logo">
        <FaStore /> Meridex
      </Link>

      {/* Search */}
      <div style={{ position: "relative" }}>
        <FaSearch
          style={{
            position: "absolute",
            left: "15px",
            top: "14px",
            color: "#64748b",
          }}
        />

        <input
          className="search-box"
          style={{ paddingLeft: "40px" }}
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Navigation */}
      <div className="nav-links">
        <Link className="nav-item" to="/">
          <FaHome /> Home
        </Link>

        <Link className="nav-item" to="/products">
          <FaBoxOpen /> Products
        </Link>

        <Link className="nav-item" to="/wishlist">
          <FaHeart /> Wishlist
        </Link>

        <Link className="nav-item" to="/orders">
          <FaClipboardList /> Orders
        </Link>

        <Link className="nav-item" to="/profile">
          <FaUser /> Profile
        </Link>

        <Link className="cart-btn" to="/cart">
          <FaShoppingCart /> {cartItems.length}
        </Link>

        {isAdmin && (
          <Link className="admin-btn" to="/admin">
            Admin
          </Link>
        )}

        {!token ? (
          <>
            <Link className="nav-item" to="/login">
              Login
            </Link>

            <Link className="register-btn" to="/register">
              Register
            </Link>
          </>
        ) : (
          <button
            className="logout-btn"
            onClick={() => {
              localStorage.removeItem("token");
              window.location.reload();
            }}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;