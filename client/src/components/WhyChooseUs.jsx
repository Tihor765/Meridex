import "./Home.css";

const features = [
  {
    icon: "🚚",
    title: "Free Delivery",
    text: "Fast & secure shipping on every order.",
  },
  {
    icon: "🔒",
    title: "Secure Payment",
    text: "100% safe payment with Razorpay.",
  },
  {
    icon: "💎",
    title: "Premium Quality",
    text: "Only trusted and genuine products.",
  },
  {
    icon: "🎧",
    title: "24/7 Support",
    text: "Our team is always here to help.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="why-section">
      <h2 className="section-title">Why Choose Meridex?</h2>

      <div className="why-grid">
        {features.map((item) => (
          <div key={item.title} className="why-card">
            <div className="why-icon">{item.icon}</div>

            <h3>{item.title}</h3>

            <p>{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;