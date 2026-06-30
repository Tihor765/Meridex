import { Link } from "react-router-dom";
import "./Home.css";

const categories = [
  { icon: "📱", title: "Mobiles", color: "#2563eb" },
  { icon: "💻", title: "Laptops", color: "#7c3aed" },
  { icon: "⌚", title: "Smart Watches", color: "#22c55e" },
  { icon: "🎧", title: "Headphones", color: "#ec4899" },
  { icon: "📷", title: "Cameras", color: "#f59e0b" },
  { icon: "🎮", title: "Gaming", color: "#ef4444" },
];

const Categories = () => {
  return (
    <section className="categories-section">
      <h2 className="section-title">Shop by Category</h2>

      <div className="categories-grid">
        {categories.map((category) => (
          <Link
            key={category.title}
            to="/products"
            className="category-link"
          >
            <div
              className="category-card"
              style={{ borderColor: category.color }}
            >
              <div className="category-icon">
                {category.icon}
              </div>

              <h3>{category.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Categories;