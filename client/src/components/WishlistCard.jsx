import "../pages/Wishlist.css";

const WishlistCard = ({
  item,
  removeFromWishlist,
}) => {
  return (
    <div className="wishlist-card">

      <img
        src={item.image}
        alt={item.name}
        className="wishlist-image"
      />

      <div className="wishlist-content">

        <h2 className="wishlist-name">
          {item.name}
        </h2>

        <h3 className="wishlist-price">
          ₹{item.price}
        </h3>

        <button
          className="wishlist-remove-btn"
          onClick={() =>
            removeFromWishlist(item._id)
          }
        >
          ❤️ Remove
        </button>

      </div>

    </div>
  );
};

export default WishlistCard;