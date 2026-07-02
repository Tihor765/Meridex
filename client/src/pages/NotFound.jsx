import { Link } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
  return (
    <div className="not-found">
      <div className="error-code">404</div>

      <h1>Oops! Page Not Found</h1>

      <p>
        The page you are looking for doesn't exist or has been moved.
      </p>

      <Link to="/">
        <button className="home-btn">
          🏠 Back to Home
        </button>
      </Link>
    </div>
  );
}

export default NotFound;