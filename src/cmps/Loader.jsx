export function Loader({ count = 6 }) {
  return (
    <div className="stay-loader">
      <div className="loader-header" />
      <div className="loader-grid">
        {Array.from({ length: count }).map((_, idx) => (
          <div key={idx} className="loader-card">
            <div className="loader-img shimmer" />
            <div className="loader-text shimmer" />
            <div className="loader-text short shimmer" />
          </div>
        ))}
      </div>
    </div>
  )
}
