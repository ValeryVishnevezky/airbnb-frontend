
export function AppHeaderMobileTop({ onOpenFilter }) {

  return (
    <div className="app-header-mobile-top" onClick={() => onOpenFilter()}>
      <div className="app-header-mobile-search-icon">
        <i className="fa-solid fa-magnifying-glass"></i>
      </div>
      <div className="app-header-mobile-where">
        <h1>Where to?</h1>
        <div className="app-header-mobile-anywhere">
          <h3>Anywhere</h3>
          <i className="fa-solid fa-circle"></i>
          <h3>Any week</h3>
          <i className="fa-solid fa-circle"></i>
          <h3>Add guests</h3>
        </div>
      </div>
    </div>
  );
}
