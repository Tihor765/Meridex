import { useEffect, useState, useContext } from "react";
import API from "../services/api";
import "./Products.css";

import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import { SearchContext } from "../context/SearchContext";

import ProductCard from "../components/ProductCard";

function Products() {
  const [products, setProducts] = useState([]);
  const { search } = useContext(SearchContext);

  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");
  const [maxPrice, setMaxPrice] = useState(100000);
  const [message, setMessage] = useState("");

  const { addToCart } = useContext(CartContext);
  const { addToWishlist } = useContext(WishlistContext);

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
    <div className="products-page">
     <div className="products-header">
  <div>
    <h1 className="products-title">
      🛍️ All Products
    </h1>

    <p className="products-subtitle">
      Discover premium products at the best prices.
    </p>
  </div>

  <div className="products-count">
    {filteredProducts.length} Products
  </div>
</div>

      {/* Category Filter */}
  {/* ================= FILTER TOOLBAR ================= */}

<div className="filter-toolbar">

  {/* Category Filter */}
  <div className="filter-group">
    <label>Category</label>

    <div className="category-filter">
      {["All", "Electronics", "Fashion", "Books"].map((cat) => (
        <button
          key={cat}
          onClick={() => setCategory(cat)}
          className={
            category === cat
              ? "category-btn active"
              : "category-btn"
          }
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
      value={sortBy}
      onChange={(e) => setSortBy(e.target.value)}
      className="sort-select"
    >
      <option value="default">Sort By</option>
      <option value="low-high">
        💰 Price: Low → High
      </option>
      <option value="high-low">
        💰 Price: High → Low
      </option>
      <option value="a-z">
        🔤 Name: A → Z
      </option>
      <option value="z-a">
        🔤 Name: Z → A
      </option>
    </select>
  </div>

  {/* Price Filter */}
  <div className="filter-group price-group">
    <label>
      Maximum Price: ₹{maxPrice}
    </label>

    <input
      type="range"
      min="0"
      max="100000"
      step="500"
      value={maxPrice}
      onChange={(e) =>
        setMaxPrice(Number(e.target.value))
      }
      className="price-slider"
    />
  </div>

</div>

      {/* Success Message */}
      {message && (
        <div className="success-message">
          {message}
        </div>
      )}

      {/* Products Grid */}
      <div className="products-grid">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            addToCart={addToCart}
            addToWishlist={addToWishlist}
            setMessage={setMessage}
          />
        ))}
      </div>
    </div>
  );
}

export default Products;