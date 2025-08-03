export function StayFilterUnfocused({
  toggleFilterFocus,
  onOpenFilterFocus,
  isFilterFocused,
}) {
  return (
      <div
        className={`stay-filter-unfocused ${isFilterFocused ? 'hide' : ''}`}
        onClick={() => toggleFilterFocus()}
      >
        {/* Place */}
        <div
          className="stay-filter-unfocused-place"
          onClick={() => onOpenFilterFocus("anywhere")}
        >
          <h3>Anywhere</h3>
        </div>

        {/* Date */}
        <div
          className="stay-filter-unfocused-date"
          onClick={() => onOpenFilterFocus("anyWeek")}
        >
          <h3>Any week</h3>
        </div>

        {/* Guests */}
        <div
          className="stay-filter-unfocused-guest"
          onClick={() => onOpenFilterFocus("addGuests")}
        >
          <h3>Add guests</h3>
        </div>

        <button
          className="stay-filter-unfocused-search"
          onClick={() => toggleFilterFocus()}
        >
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>
  )
}
