import { useEffect, useState, useContext } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

function Home() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);

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
      <h1>My E-Commerce Website</h1>
      {/* link to cart */}
      <Link to="/cart">
        <button>Go to Cart</button>
      </Link> 

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
        {products.map((product) => (
          <div
            key={product._id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "15px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            }}
          >
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p><strong>₹{product.price}</strong></p>
            <p>Stock: {product.stock}</p>

            <button onClick={() => addToCart(product)}>
                Add to Cart
                </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;