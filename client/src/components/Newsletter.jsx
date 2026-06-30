import "./Home.css";

const Newsletter = () => {
  return (
    <section className="newsletter-section">
      <h2>Stay Updated</h2>

      <p>
        Subscribe to get exclusive deals and new arrivals.
      </p>

      <div className="newsletter-form">
        <input
          type="email"
          placeholder="Enter your email"
        />

        <button>Subscribe</button>
      </div>
    </section>
  );
};

export default Newsletter;