import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Navbar() {
  const { cartItems } = useContext(CartContext);
  const token = localStorage.getItem("token");

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 30px",
        background: "#2563eb",
        color: "white",
      }}
    >
      <h2>🛒 NovaCart</h2>

      <div style={{ display: "flex", gap: "20px" }}>
        <Link
          to="/"
          style={{ color: "white", textDecoration: "none" }}
        >
          Home
        </Link>

        <Link
          to="/wishlist"
          style={{ color: "white", textDecoration: "none" }}
        >
          ❤️ Wishlist
        </Link>

<Link
  to="/profile"
  style={{ color: "white", textDecoration: "none" }}
>
  👤 Profile
</Link>
        <Link
          to="/cart"
          style={{ color: "white", textDecoration: "none" }}
        >
          <FaShoppingCart /> Cart ({cartItems.length})
        </Link>

        {token ? (
          <button
            onClick={() => {
              localStorage.removeItem("token");
              window.location.reload();
            }}
            style={{
              background: "transparent",
              border: "none",
              color: "white",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            style={{ color: "white", textDecoration: "none" }}
          >
            Login
          </Link>
        )}

        <Link
          to="/register"
          style={{ color: "white", textDecoration: "none" }}
        >
          Register
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;