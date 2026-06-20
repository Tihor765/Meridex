import { Link } from "react-router-dom";

function Home() {
  return (
    <div style={{ padding: "20px" }}>
      <div
        style={{
          background: "linear-gradient(135deg, #ff6b9d, #6c63ff)",
          color: "white",
          padding: "50px",
          borderRadius: "25px",
          marginBottom: "30px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "40px",
        }}
      >
        <div style={{ flex: 1 }}>
          <h1
            style={{
              fontSize: "60px",
              marginBottom: "15px",
              fontWeight: "bold",
            }}
          >
            NovaCart
          </h1>

          <h2
            style={{
              marginBottom: "20px",
              fontSize: "36px",
            }}
          >
            Modern Shopping Experience
          </h2>

          <p
            style={{
              maxWidth: "500px",
              fontSize: "18px",
              lineHeight: "1.6",
            }}
          >
            Discover premium products with amazing discounts
            and a beautiful shopping experience.
          </p>

          <Link to="/products">
            <button
              style={{
                marginTop: "25px",
                background: "white",
                color: "#6c63ff",
                border: "none",
                padding: "14px 30px",
                borderRadius: "12px",
                fontWeight: "bold",
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              Shop Now 🚀
            </button>
          </Link>
        </div>

        <img
          src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800"
          alt="shopping"
          style={{
            width: "100%",
            maxWidth: "350px",
            height: "220px",
            objectFit: "cover",
            borderRadius: "20px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
          }}
        />
      </div>
    </div>
  );
}

export default Home;