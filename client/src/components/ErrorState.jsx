import "./ErrorState.css";

function ErrorState({
  title = "Something went wrong",
  message = "We couldn't load the requested data.",
  onRetry,
}) {
  return (
    <div className="error-state">
      <div className="error-icon">⚠️</div>

      <h2>{title}</h2>

      <p>{message}</p>

      {onRetry && (
        <button className="retry-btn" onClick={onRetry}>
          Try Again
        </button>
      )}
    </div>
  );
}

export default ErrorState;