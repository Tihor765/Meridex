import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import { CartContext } from "../context/CartContext";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);

  const [reviewData, setReviewData] = useState({
    customerName: "Rohit",
    rating: 5,
    comment: "",
  });

  const { addToCart, clearCart } = useContext(CartContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productRes = await API.get(`/products/${id}`);
        setProduct(productRes.data);

        const reviewRes = await API.get(`/reviews/${id}`);
        setReviews(reviewRes.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  const relatedProducts = [
    {
      id: 1,
      name: "Smart Watch",
      price: 2999,
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
    },
    {
      id: 2,
      name: "Headphones",
      price: 1999,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    },
    {
      id: 3,
      name: "Laptop",
      price: 49999,
      image:
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500",
    },
  ];

  if (!product) {
    return (
      <h2
        style={{
          color: "white",
          textAlign: "center",
          marginTop: "50px",
        }}
      >
        Loading...
      </h2>
    );
  }

  return (
    <div
      style={{
        padding: "40px",
        color: "white",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 300px",
          gap: "30px",
          alignItems: "start",
        }}
      >
        <div
          style={{
            background: "rgba(255,255,255,0.1)",
            padding: "20px",
            borderRadius: "20px",
          }}
        >
          <img
            src={product.image}
            alt={product.name}
            style={{
              width: "100%",
              borderRadius: "15px",
            }}
          />
        </div>

        <div>
          <h1>{product.name}</h1>

          <h2 style={{ color: "#22c55e" }}>
            ₹{product.price}
          </h2>

          <p>{product.description}</p>

          <p>
            <strong>Stock:</strong> {product.stock}
          </p>
        </div>

        <div
          style={{
            background: "rgba(255,255,255,0.1)",
            padding: "25px",
            borderRadius: "20px",
          }}
        >
          <h2>₹{product.price}</h2>

          <button
            onClick={() => addToCart(product)}
            style={{
              width: "100%",
              padding: "12px",
              background: "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "10px",
              marginBottom: "10px",
            }}
          >
            Add to Cart 🛒
          </button>

          <button
            disabled={product.stock <= 0}
           onClick={async () => {
  try {
    const { data } = await API.post("/payments/create-order", {
      amount: product.price,
    });

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: data.amount,
      currency: data.currency,
      name: "Meridex",
      description: product.name,
      order_id: data.id,

      handler: async function () {
        await API.post("/orders", {
          productId: product._id,
          productName: product.name,
          price: product.price,
          customerName: "Rohit",
        });

        clearCart();

        const res = await API.get(`/products/${product._id}`);
        setProduct(res.data);

        navigate("/order-success");
      },

      theme: {
        color: "#2563eb",
      },
    };

    const razor = new window.Razorpay(options);
    razor.open();

  } catch (error) {
  console.log(error);
  console.log(error.response?.data);
  alert(error.response?.data?.message || error.message);
}
}}
            style={{
              width: "100%",
              padding: "12px",
              background:
                product.stock > 0 ? "#22c55e" : "#9ca3af",
              color: "white",
              border: "none",
              borderRadius: "10px",
            }}
          >
            {product.stock > 0 ? "Buy Now ⚡" : "Out of Stock"}
          </button>
        </div>
      </div>
            {/* Reviews */}
      <div style={{ marginTop: "50px" }}>
        <h2>⭐ Customer Reviews</h2>

        {/* Review Form */}
        <div
          style={{
            background: "rgba(255,255,255,0.1)",
            padding: "20px",
            borderRadius: "15px",
            marginTop: "20px",
          }}
        >
          <input
            type="number"
            min="1"
            max="5"
            value={reviewData.rating}
            onChange={(e) =>
              setReviewData({
                ...reviewData,
                rating: Number(e.target.value),
              })
            }
            placeholder="Rating (1-5)"
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
            }}
          />

          <textarea
            placeholder="Write your review..."
            value={reviewData.comment}
            onChange={(e) =>
              setReviewData({
                ...reviewData,
                comment: e.target.value,
              })
            }
            style={{
              width: "100%",
              height: "100px",
              padding: "10px",
              marginBottom: "10px",
            }}
          />

          <button
            onClick={async () => {
              try {
                await API.post("/reviews", {
                  productId: product._id,
                  ...reviewData,
                });

                const reviewRes = await API.get(
                  `/reviews/${product._id}`
                );

                setReviews(reviewRes.data);

                setReviewData({
                  customerName: "Rohit",
                  rating: 5,
                  comment: "",
                });

                alert("✅ Review Added Successfully!");
              } catch (error) {
                console.log(error);
                alert("Failed to add review");
              }
            }}
            style={{
              background: "#2563eb",
              color: "white",
              border: "none",
              padding: "12px 20px",
              borderRadius: "10px",
              cursor: "pointer",
            }}
          >
            Submit Review ⭐
          </button>
        </div>

        {/* Review List */}
        <div style={{ marginTop: "25px" }}>
          {reviews.length === 0 ? (
            <p>No Reviews Yet</p>
          ) : (
            reviews.map((review) => (
              <div
                key={review._id}
                style={{
                  background: "rgba(255,255,255,0.1)",
                  padding: "15px",
                  borderRadius: "10px",
                  marginBottom: "15px",
                }}
              >
                <h3>{review.customerName}</h3>
                <p>{"⭐".repeat(review.rating)}</p>
                <p>{review.comment}</p>
              </div>
            ))
          )}
        </div>
      </div>
            {/* Related Products */}
      <div style={{ marginTop: "60px" }}>
        <h2>🔥 Related Products</h2>

        <div
          style={{
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
            marginTop: "20px",
          }}
        >
          {relatedProducts.map((item) => (
            <div
              key={item.id}
              style={{
                background: "rgba(255,255,255,0.1)",
                padding: "15px",
                borderRadius: "15px",
                width: "220px",
                textAlign: "center",
              }}
            >
              <img
                src={item.image}
                alt={item.name}
                style={{
                  width: "100%",
                  height: "150px",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              />

              <h3>{item.name}</h3>

              <p>₹{item.price}</p>

              <button
                onClick={() => addToCart(item)}
                style={{
                  background: "#2563eb",
                  color: "white",
                  border: "none",
                  padding: "10px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  width: "100%",
                }}
              >
                Add to Cart 🛒
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;