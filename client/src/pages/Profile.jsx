import { Link } from "react-router-dom";

function Profile() {
  const token = localStorage.getItem("token");

  return (
    <div
      style={{
        padding: "30px",
        maxWidth: "600px",
        margin: "auto",
        textAlign: "center",
      }}
    >
      <h1>👤 My Profile</h1>

      <p>Welcome to NovaCart!</p>

      <p>
        Status: {token ? "✅ Logged In" : "❌ Not Logged In"}
      </p>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          marginTop: "20px",
        }}
      >
        <Link to="/wishlist">
          <button>❤️ My Wishlist</button>
        </Link>

        <Link to="/cart">
          <button>🛒 My Cart</button>
        </Link>

        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/";
          }}
          style={{
            backgroundColor: "red",
            color: "white",
            border: "none",
            padding: "10px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;