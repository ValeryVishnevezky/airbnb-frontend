import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { stayAction } from "../store/actions/stay.actions.js";
import { PlaceModalMobile } from "./PlaceModalMobile.jsx";
import { DateModalMobile } from "./DateModalMobile.jsx";
import { GuestModalMobile } from "./GuestModalMobile.jsx";
import "react-datepicker/dist/react-datepicker.css";

export function StayFilterMobile({ onCloseFilter }) {
  const dispatch = useDispatch();
  const filterBy = useSelector((state) => state.stayModule.filterBy);
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [isPlaceDropdownOpen, setPlaceDropdownOpen] = useState(false);
  const [isDateDropdownOpen, setDateDropdownOpen] = useState(false);
  const [isGuestDropdownOpen, setGuestDropdownOpen] = useState(false);
  const [totalGuests, setTotalGuests] = useState(filterBy.minCapacity || 0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (isFilterApplied) {
      stayAction.loadStays();
      setIsFilterApplied(false);
    }
  }, [isFilterApplied]);

  function handleChange({ target }) {
    const { name, value } = target;
    dispatch(stayAction.setFilterBy({ ...filterBy, [name]: value }));
  }

  function handleSelectPlace(place) {
    dispatch(stayAction.setFilterBy({ ...filterBy, place: place }))
  }

  function handleDateChange(dates) {
    const [startDate, endDate] = dates;
    dispatch(
      stayAction.setFilterBy({
        ...filterBy,
        availableDates: { start: startDate, end: endDate },
      })
    );
  }

  function handleGuestChange(newTotalGuests) {
    setTotalGuests(newTotalGuests);
    dispatch(
      stayAction.setFilterBy({ ...filterBy, minCapacity: newTotalGuests })
    );
  }

  function applyFilters() {
    setIsFilterApplied(true);
    onCloseFilter();
  }

  function clearPlace() {
    dispatch(stayAction.setFilterBy({ ...filterBy, place: "" }));
  }

  function clearDates() {
    dispatch(
      stayAction.setFilterBy({
        ...filterBy,
        availableDates: { start: null, end: null },
      })
    );
  }

  function clearGuest() {
    dispatch(stayAction.setFilterBy({ ...filterBy, minCapacity: 0 }));
  }

  function clearAllFilters() {
    dispatch(
      stayAction.setFilterBy({
        ...filterBy,
        place: "",
        availableDates: { start: null, end: null },
        minCapacity: 0,
      })
    );
    setTotalGuests(0);
  }

  function onPlaceModalOpen() {
    setPlaceDropdownOpen(true);
    setDateDropdownOpen(false);
    setGuestDropdownOpen(false);
  }

  function onDateModalOpen() {
    setDateDropdownOpen(true);
    setPlaceDropdownOpen(false);
    setGuestDropdownOpen(false);
  }

  function onGuestModalOpen() {
    setGuestDropdownOpen(true);
    setDateDropdownOpen(false);
    setPlaceDropdownOpen(false);
  }

  function handleMouseMove(e) {
    const button = e.currentTarget
    const rect = button.getBoundingClientRect()
    const mouseX = ((e.clientX - rect.left) / rect.width) * 100
    const mouseY = ((e.clientY - rect.top) / rect.height) * 100
    button.style.setProperty("--mouse-x", `${mouseX}%`)
    button.style.setProperty("--mouse-y", `${mouseY}%`)
    setMousePos({ x: mouseX, y: mouseY })
  }

  return (
    <section className="stay-filter-mobile-box">
      <div className="stay-filter-mobile">
        <div className="stay-filter-mobile-close">
          <button className="close-btn" onClick={onCloseFilter}>
            <img src="/svg/close.svg" alt="" />
          </button>
        </div>

        {/* Place */}
        <div
          className={`stay-filter-focused-place ${
            isPlaceDropdownOpen ? "active" : ""
          }`}
          onClick={() => onPlaceModalOpen()}
        >
          {isPlaceDropdownOpen ? (
            <PlaceModalMobile
              filterBy={filterBy}
              handleChange={handleChange}
              onDateModalOpen={onDateModalOpen}
              clearPlace={clearPlace}
              handleSelectPlace={handleSelectPlace}
            />
          ) : (
            <>
              <h3>Where</h3>
              <h4>{filterBy.place ? filterBy.place : "Search place"}</h4>
            </>
          )}
        </div>

        {/* Date */}
        <div
          className={`stay-filter-focused-date ${
            isDateDropdownOpen ? "active" : ""
          }`}
          onClick={() => onDateModalOpen()}
        >
          {isDateDropdownOpen ? (
            <DateModalMobile
              filterBy={filterBy}
              handleDateChange={handleDateChange}
              clearDates={clearDates}
              onGuestModalOpen={onGuestModalOpen}
            />
          ) : (
            <>
              <h3>When</h3>
              <h4 className="date-input">
                {filterBy.availableDates.start && filterBy.availableDates.end
                  ? `${filterBy.availableDates.start.toLocaleDateString(
                      "en-US",
                      {
                        month: "short",
                        day: "numeric",
                      }
                    )} - ${filterBy.availableDates.end.toLocaleDateString(
                      "en-US",
                      {
                        day: "numeric",
                      }
                    )}`
                  : "Add dates"}
              </h4>
            </>
          )}
        </div>

        {/* Guests */}
        <div
          className={`stay-filter-focused-guest ${
            isGuestDropdownOpen ? "active" : ""
          }`}
          onClick={() => onGuestModalOpen()}
        >
          {isGuestDropdownOpen ? (
            <GuestModalMobile
              filterBy={filterBy}
              handleGuestChange={handleGuestChange}
              clearGuest={clearGuest}
              applyFilters={applyFilters}
            />
          ) : (
            <>
              <h3>Who</h3>
              <h4 className="guest-input">
                {totalGuests
                  ? `${totalGuests} guest${totalGuests > 1 ? "s" : ""}`
                  : "Add guests"}
              </h4>
            </>
          )}
        </div>
      </div>

      <div className="stay-filter-mobile-bottom">
        <button
          className="stay-filter-mobile-clear"
          onClick={() => clearAllFilters()}
        >
          Clear All
        </button>
        <button
          className="stay-filter-mobile-search"
          onClick={() => applyFilters()}
          onMouseMove={handleMouseMove}
        >
          <i className="fa-solid fa-magnifying-glass"></i> Search
        </button>
      </div>
    </section>
  );
}
