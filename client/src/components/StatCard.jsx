import "../pages/Admin.css";

function StatCard({ icon, title, value }) {
  return (
    <div className="stat-card">
      <div className="stat-icon">
        {icon}
      </div>

      <div>
        <h3 className="stat-title">
          {title}
        </h3>

        <h2 className="stat-value">
          {value}
        </h2>
      </div>
    </div>
  );
}

export default StatCard;