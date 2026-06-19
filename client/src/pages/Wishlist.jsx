import { useContext } from "react";
import { WishlistContext } from "../context/WishlistContext";

function Wishlist() {
  const { wishlistItems, removeFromWishlist } =
    useContext(WishlistContext);

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>❤️ My Wishlist</h1>

      {wishlistItems.length === 0 ? (
        <p style={{ textAlign: "center" }}>
          No items in wishlist.
        </p>
      ) : (
        wishlistItems.map((item) => (
          <div
            key={item._id}
            style={{
              border: "1px solid gray",
              padding: "20px",
              margin: "10px 0",
              textAlign: "center",
              borderRadius: "10px",
            }}
          >
            <h3>{item.name}</h3>

            <p>₹{item.price}</p>

            <button
              onClick={() =>
                removeFromWishlist(item._id)
              }
              style={{
                backgroundColor: "red",
                color: "white",
                border: "none",
                padding: "10px 15px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Remove ❤️
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default Wishlist;