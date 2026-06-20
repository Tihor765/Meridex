import { useEffect, useState, useContext } from "react";
import API from "../services/api";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";

function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [message, setMessage] = useState("");

  const { addToCart } = useContext(CartContext);
  const { addToWishlist } = useContext(WishlistContext);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get("/products");
        setProducts(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ color: "white", marginBottom: "20px" }}>
        🛍️ All Products
      </h1>

      {/* Search */}
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="🔍 Search products..."
        style={{
          width: "100%",
          padding: "14px",
          borderRadius: "12px",
          border: "none",
          marginBottom: "20px",
          fontSize: "16px",
        }}
      />

      {/* Category Filter */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px",
          flexWrap: "wrap",
        }}
      >
        {["All", "Electronics", "Fashion", "Books"].map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            style={{
              background:
                category === cat ? "#6c63ff" : "#ffffff",
              color:
                category === cat ? "white" : "#333",
              border: "none",
              padding: "10px 18px",
              borderRadius: "20px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Message */}
      {message && (
        <div
          style={{
            background: "#22c55e",
            color: "white",
            padding: "12px",
            borderRadius: "10px",
            marginBottom: "20px",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          {message}
        </div>
      )}

      {/* Products Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fill, minmax(260px, 1fr))",
          gap: "20px",
        }}
      >
        {filteredProducts.map((product) => (
          <div
            key={product._id}
            style={{
              background: "rgba(255,255,255,0.1)",
              backdropFilter: "blur(10px)",
              border:
                "1px solid rgba(255,255,255,0.2)",
              borderRadius: "15px",
              padding: "15px",
              boxShadow:
                "0 8px 20px rgba(0,0,0,0.3)",
              color: "white",
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              style={{
                width: "100%",
                height: "220px",
                objectFit: "cover",
                borderRadius: "12px",
              }}
            />

            <h3>{product.name}</h3>

            <p>{product.description}</p>

            <p>⭐⭐⭐⭐⭐ (4.8)</p>

            <p>
              <strong>₹{product.price}</strong>
            </p>

            <p>Stock: {product.stock}</p>

            <div
              style={{
                display: "flex",
                gap: "10px",
                marginTop: "15px",
              }}
            >
              {/* Wishlist */}
              <button
                onClick={() => {
                  addToWishlist(product);

                  setMessage(
                    `❤️ ${product.name} added to wishlist`
                  );

                  setTimeout(() => {
                    setMessage("");
                  }, 2000);
                }}
                style={{
                  backgroundColor: "#ff4d88",
                  color: "white",
                  border: "none",
                  padding: "10px 12px",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                ❤️ Wishlist
              </button>

              {/* Cart */}
              <button
                onClick={() => {
                  addToCart(product);

                  setMessage(
                    `🛒 ${product.name} added to cart`
                  );

                  setTimeout(() => {
                    setMessage("");
                  }, 2000);
                }}
                style={{
                  backgroundColor: "#2563eb",
                  color: "white",
                  border: "none",
                  padding: "10px 12px",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                Add to Cart 🛒
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;