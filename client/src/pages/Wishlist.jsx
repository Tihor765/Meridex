import { useContext } from "react";
import { WishlistContext } from "../context/WishlistContext";
import WishlistCard from "../components/WishlistCard";
import "./Wishlist.css";

function Wishlist() {
  const { wishlistItems, removeFromWishlist } =
    useContext(WishlistContext);

  return (
    <div className="wishlist-page">
      <h1 className="wishlist-title">
        ❤️ My Wishlist
      </h1>

      {wishlistItems.length === 0 ? (
        <div className="wishlist-empty">
          <h2>Your Wishlist is Empty 💔</h2>
          <p>
            Save your favorite products here for later.
          </p>
        </div>
      ) : (
        <div className="wishlist-grid">
          {wishlistItems.map((item) => (
            <WishlistCard
              key={item._id}
              item={item}
              removeFromWishlist={removeFromWishlist}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;