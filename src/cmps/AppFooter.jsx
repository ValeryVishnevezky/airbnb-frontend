import { useSelector } from "react-redux"
import { useLocation } from "react-router-dom";

export function AppFooter() {
  const count = useSelector((storeState) => storeState.userModule.count)
  const location = useLocation();
  const isDetailsPage = location.pathname.startsWith("/stay/");

  return (
    <footer className={`app-footer ${isDetailsPage ? "" : "margin-bottom"}`}>
      <div className="footer-content">
        <p>© 2024 Airdnd, Inc.</p>
        <div className="footer-links">
          <a href="/">Terms </a> 
          <i className="fa-solid fa-circle"></i>
          <a href="/">Sitemap </a>
          <i className="fa-solid fa-circle"></i>
          <a href="/">Privacy </a>
          <i className="fa-solid fa-circle"></i>
          <a href="/">Your Privacy Choices</a>
        </div>
      </div>

      <div className="footer-content-bottom">
		<div className="footer-lng">
        <img
          className="app-footer-world-svg"
          src="/svg/world.svg"
          alt=""
        />
        <h1>English (US)</h1>
		</div>
        <h1>₪ ILS</h1>
      </div>
    </footer>
  )
}
