import { Link, useNavigate } from "react-router-dom";
import "./Profile.css";

function Profile() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="profile-page">
      {/* Header */}
      <div className="profile-header">
        <h1>👤 My Account</h1>
        <p>Welcome back! Manage your Meridex account.</p>

        <p>
          Status:{" "}
          <strong>
            {token ? "✅ Logged In" : "❌ Not Logged In"}
          </strong>
        </p>
      </div>

      {/* Dashboard */}
      <div className="profile-grid">

        <Link to="/wishlist" className="profile-card">
          <div style={{ fontSize: "45px" }}>❤️</div>
          <h2>Wishlist</h2>
          <p>View your saved products.</p>
        </Link>

        <Link to="/cart" className="profile-card">
          <div style={{ fontSize: "45px" }}>🛒</div>
          <h2>My Cart</h2>
          <p>Manage your shopping cart.</p>
        </Link>

        <Link to="/orders" className="profile-card">
          <div style={{ fontSize: "45px" }}>📦</div>
          <h2>My Orders</h2>
          <p>Track all your purchases.</p>
        </Link>

        <Link to="/addresses" className="profile-card">
  <div style={{ fontSize: "45px" }}>📍</div>

  <h2>My Addresses</h2>

  <p>Manage your saved delivery addresses.</p>
</Link>

        <div className="profile-card">
          <div style={{ fontSize: "45px" }}>⚙️</div>
          <h2>Account Settings</h2>
          <p>Coming Soon</p>
        </div>

        <div className="profile-card">
          <div style={{ fontSize: "45px" }}>🚪</div>

          <h2>Logout</h2>

          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>

      </div>
    </div>
  );
}

export default Profile;