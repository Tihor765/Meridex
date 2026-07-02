import { useState, useEffect, useContext, useCallback } from "react";
import API from "../services/api";
import "./Products.css";

import ProductSkeleton from "../components/ProductSkeleton";
import ProductCard from "../components/ProductCard";
import ErrorState from "../components/ErrorState";

import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import { SearchContext } from "../context/SearchContext";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");
  const [maxPrice, setMaxPrice] = useState(100000);
  const [message, setMessage] = useState("");

  const { search } = useContext(SearchContext);
  const { addToCart } = useContext(CartContext);
  const { addToWishlist } = useContext(WishlistContext);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(false);

      const res = await API.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Failed to fetch products:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

 useEffect(() => {
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(false);

      const res = await API.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  fetchProducts();
}, []);

  const filteredProducts = products
    .filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || product.category === category;

      const matchesPrice = product.price <= maxPrice;

      return matchesSearch && matchesCategory && matchesPrice;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "low-high":
          return a.price - b.price;

        case "high-low":
          return b.price - a.price;

        case "a-z":
          return a.name.localeCompare(b.name);

        case "z-a":
          return b.name.localeCompare(a.name);

        default:
          return 0;
      }
    });

  if (loading) {
    return (
      <div className="products-grid">
        {[...Array(8)].map((_, index) => (
          <ProductSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <ErrorState
        title="Unable to Load Products"
        message="We couldn't connect to the server. Please try again."
        onRetry={fetchProducts}
      />
    );
  }

  return (
    <div className="products-page">
      {/* Header */}
      <div className="products-header">
        <div>
          <h1 className="products-title">🛍️ All Products</h1>

          <p className="products-subtitle">
            Discover premium products at the best prices.
          </p>
        </div>

        <div className="products-count">
          {filteredProducts.length} Products
        </div>
      </div>

      {/* Filters */}
      <div className="filter-toolbar">
        {/* Category */}
        <div className="filter-group">
          <label>Category</label>

          <div className="category-filter">
            {["All", "Electronics", "Fashion", "Books"].map((cat) => (
              <button
                key={cat}
                className={
                  category === cat
                    ? "category-btn active"
                    : "category-btn"
                }
                onClick={() => setCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Sort */}
        <div className="filter-group">
          <label>Sort By</label>

          <select
            className="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="default">Sort By</option>
            <option value="low-high">💰 Price: Low → High</option>
            <option value="high-low">💰 Price: High → Low</option>
            <option value="a-z">🔤 Name: A → Z</option>
            <option value="z-a">🔤 Name: Z → A</option>
          </select>
        </div>

        {/* Price */}
        <div className="filter-group price-group">
          <label>Maximum Price: ₹{maxPrice}</label>

          <input
            type="range"
            min="0"
            max="100000"
            step="500"
            value={maxPrice}
            className="price-slider"
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />
        </div>
      </div>

      {/* Success Message */}
      {message && (
        <div className="success-message">
          {message}
        </div>
      )}

      {/* Products */}
      <div className="products-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              addToCart={addToCart}
              addToWishlist={addToWishlist}
              setMessage={setMessage}
            />
          ))
        ) : (
          <div
            style={{
              gridColumn: "1 / -1",
              textAlign: "center",
              padding: "60px 20px",
              color: "white",
            }}
          >
            <h2>🔍 No Products Found</h2>

            <p>
              Try changing your search, category, or price filter.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Products;