export function PlaceModalMobile({
  filterBy,
  handleChange,
  onDateModalOpen,
  clearPlace,
  handleSelectPlace
}) {

  function getRandomCountry() {
    const countries = [
      "United States",
      "Indonesia",
      "Portugal",
      "Thailand",
      "Australia",
      "Canada",
      "Spain"
    ];
  
    const randomIndex = Math.floor(Math.random() * countries.length);
    return countries[randomIndex];
  }

  return (
    <div className="place-modal-mobile">
      <h1>Where to?</h1>
      <i className="fa-solid fa-magnifying-glass"></i>
      <form onSubmit={onDateModalOpen}>
        <input
          type="text"
          name="place"
          value={filterBy.place || ""}
          onChange={handleChange}
          placeholder="Search destinations"
        />
      </form>
        <div className="place-btns">
          <div
            className="place-btn"
            onClick={() => handleSelectPlace(getRandomCountry())}
          >
            <img src="/img/world.jpg" alt="world" />
            <h2>I’m flexible</h2>
          </div>

          <div
            className="place-btn"
            onClick={() => handleSelectPlace("Turkey")}
          >
            <img src="/img/middle-east.webp" alt="middle east" />
            <h2>Middle East</h2>
          </div>

          <div className="place-btn" onClick={() => handleSelectPlace("Italy")}>
            <img src="/img/italy.webp" alt="italy" />
            <h2>Italy</h2>
          </div>

          <div
            className="place-btn"
            onClick={() => handleSelectPlace("United States")}
          >
            <img
              src="/img/united-states.webp"
              alt="united states"
            />
            <h2>United States</h2>
          </div>

          <div
            className="place-btn"
            onClick={() => handleSelectPlace("Greece")}
          >
            <img src="/img/greece.webp" alt="greece" />
            <h2>Greece</h2>
          </div>

          <div
            className="place-btn"
            onClick={() => handleSelectPlace("Indonesia")}
          >
            <img
              src="/img/southeast-asia.webp"
              alt="southeast asia"
            />
            <h2>Southeast Asia</h2>
          </div>
        </div>
      <div className="date-modal-btns-box">
        <button className="clear" onClick={() => clearPlace()}>
          Clear
        </button>
        <button className="next" onClick={() => onDateModalOpen()}>
          Next
        </button>
      </div>
    </div>
  );
}
