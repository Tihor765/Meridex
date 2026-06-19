import { useEffect, useState, useContext } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";

function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

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
      {/* Hero Section */}
      <div
        style={{
          background: "linear-gradient(to right, #2563eb, #7c3aed)",
          color: "white",
          padding: "40px",
          borderRadius: "15px",
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        <h1>🛒 Welcome to NovaCart</h1>

        <p>Discover amazing products at unbeatable prices.</p>

        <Link to="/cart">
          <button
            style={{
              padding: "10px 20px",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Go to Cart
          </button>
        </Link>
      </div>

      {/* Search Bar */}
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="🔍 Search products..."
        style={{
          width: "100%",
          padding: "12px",
          borderRadius: "10px",
          border: "1px solid #ddd",
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
        <button onClick={() => setCategory("All")}>
          All
        </button>

        <button onClick={() => setCategory("Electronics")}>
          Electronics
        </button>

        <button onClick={() => setCategory("Fashion")}>
          Fashion
        </button>

        <button onClick={() => setCategory("Books")}>
          Books
        </button>
      </div>

      {/* Products Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
        {filteredProducts.map((product) => (
          <div
            key={product._id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "15px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
                borderRadius: "10px",
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
                marginTop: "10px",
              }}
            >
              <button
                onClick={() => addToWishlist(product)}
                style={{
                  backgroundColor: "pink",
                  border: "none",
                  padding: "10px 15px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                ❤️ Wishlist
              </button>

              <button
                onClick={() => addToCart(product)}
                style={{
                  backgroundColor: "#2563eb",
                  color: "white",
                  border: "none",
                  padding: "10px 15px",
                  borderRadius: "5px",
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

export default Home;