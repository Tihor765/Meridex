import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Navbar() {
  const { cartItems } = useContext(CartContext);
  const token = localStorage.getItem("token");

  const navLink = {
    color: "white",
    textDecoration: "none",
    fontSize: "17px",
    fontWeight: "500",
    transition: "0.3s",
  };

  return (
    <nav
      style={{
        background: "rgba(15,23,42,0.95)",
        backdropFilter: "blur(10px)",
        padding: "18px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      {/* Logo */}
      <Link
        to="/"
        style={{
          textDecoration: "none",
          color: "white",
          fontSize: "32px",
          fontWeight: "700",
        }}
      >
        🛒 NovaCart
      </Link>

      {/* Navigation */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "30px",
        }}
      >
        <Link to="/" style={navLink}>
          Home
        </Link>

        <Link to="/products" style={navLink}>
          Products
        </Link>

        <Link to="/wishlist" style={navLink}>
          ❤️ Wishlist
        </Link>

        <Link to="/profile" style={navLink}>
          👤 Profile
        </Link>

        <Link to="/orders" style={navLink}>
          📦 Orders
        </Link>

        <Link to="/cart" style={navLink}>
          🛒 Cart ({cartItems.length})
        </Link>

        {!token ? (
          <>
            <Link to="/login" style={navLink}>
              Login
            </Link>

            <Link
              to="/register"
              style={{
                background: "#6c63ff",
                color: "white",
                padding: "10px 18px",
                borderRadius: "10px",
                textDecoration: "none",
                fontWeight: "600",
              }}
            >
              Register
            </Link>
          </>
        ) : (
          <button
            onClick={() => {
              localStorage.removeItem("token");
              window.location.reload();
            }}
            style={{
              background: "#ef4444",
              color: "white",
              border: "none",
              padding: "10px 18px",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: "600",
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