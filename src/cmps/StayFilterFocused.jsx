import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { stayAction } from "../store/actions/stay.actions.js";
import { DateModal } from "./DateModal.jsx";
import { GuestModal } from "./GuestModal.jsx";
import { PlaceModal } from "./PlaceModal.jsx";
import { Link, useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";

export function StayFilterFocused({ modalType, isFilterFocused }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const filterBy = useSelector((state) => state.stayModule.filterBy);
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [isPlaceDropdownOpen, setPlaceDropdownOpen] = useState(false);
  const [isDateInDropdownOpen, setDateInDropdownOpen] = useState(false);
  const [isDateOutDropdownOpen, setDateOutDropdownOpen] = useState(false);
  const [isGuestDropdownOpen, setGuestDropdownOpen] = useState(false);
  const [totalGuests, setTotalGuests] = useState(filterBy.minCapacity || 0);
  const [adults, setAdults] = useState(filterBy.minCapacity || 0);
  const [children, setChildren] = useState(filterBy.minCapacity || 0);
  const [infants, setInfants] = useState(filterBy.minCapacity || 0);
  const [pets, setPets] = useState(filterBy.minCapacity || 0);
  const [country, setCountry] = useState(filterBy.place);
  const [startDate, setStartDate] = useState(filterBy.start);
  const [endDate, setEndDate] = useState(filterBy.end);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (isFilterApplied) {
      stayAction.loadStays();
      setIsFilterApplied(false);
    }
  }, [isFilterApplied]);

  useEffect(() => {
    onModalsClose();
    switch (modalType) {
      case "anywhere":
        onPlaceModalOpen();
        break;
      case "anyWeek":
        onDateInModalOpen();
        break;
      case "addGuests":
        onGuestModalOpen();
        break;
      default:
        break;
    }
  }, [modalType]);

  function handleChange({ target }) {
    const { name, value } = target;
    setCountry(value);
    if (isFilterApplied) {
      dispatch(stayAction.setFilterBy({ ...filterBy, [name]: value }));
    }
    if (name === "place" && value) {
      onDateInModalOpen();
    }
  }

  function handleSelectPlace(place) {
    setCountry(place);
    if (place) {
      onDateInModalOpen();
    }
  }

  function handleDateChange(dates) {
    const [startDate, endDate] = dates;
    setStartDate(startDate);
    setEndDate(endDate);
    if (isFilterApplied) {
      dispatch(
        stayAction.setFilterBy({
          ...filterBy,
          availableDates: { start: startDate, end: endDate },
        })
      );
    }
    if (startDate && !endDate) {
      setDateInDropdownOpen(false);
      setDateOutDropdownOpen(true);
    }
  }

  function handleGuestChange(guestDetails) {
    const { adults, children, infants, pets } = guestDetails;
    const totalGuests = adults + children + infants + pets;
    setTotalGuests(totalGuests);
    setAdults(adults);
    setChildren(children);
    setInfants(infants);
    setPets(pets);
    if (isFilterApplied) {
      dispatch(
        stayAction.setFilterBy({
          ...filterBy,
          minCapacity: totalGuests,
          adults: adults,
          children: children,
          infants: infants,
          pets: pets,
        })
      );
    }
  }

  function clearDates() {
    setStartDate("");
    setEndDate("");
    dispatch(
      stayAction.setFilterBy({
        ...filterBy,
        availableDates: { start: null, end: null },
      })
    );
    setDateInDropdownOpen(false);
    setDateOutDropdownOpen(false);
  }

  function createSearchParams() {
    const searchParams = new URLSearchParams();
    if (startDate) {
      searchParams.set("checkIn", formatDate(startDate));
    }
    if (endDate) {
      searchParams.set("checkOut", formatDate(endDate));
    }
    if (country) {
      searchParams.set("place", country);
    }
    if (adults > 0) {
      searchParams.set("adults", adults);
    }
    if (children > 0) {
      searchParams.set("children", children);
    }
    if (infants > 0) {
      searchParams.set("infants", infants);
    }
    if (pets > 0) {
      searchParams.set("pets", pets);
    }
    return searchParams;
  }

  function updateFiltersInStore() {
    dispatch(
      stayAction.setFilterBy({
        ...filterBy,
        place: country,
        availableDates: { start: startDate, end: endDate },
        minCapacity: totalGuests,
        adults: adults,
        children: children,
        infants: infants,
        pets: pets,
      })
    );
  }
  
  function applyFilters(event) {
    event.preventDefault();
    updateFiltersInStore();
    const searchParams = createSearchParams();
    if (searchParams.toString()) {
      navigate(`/stay?${searchParams.toString()}`);
    } else {
      navigate("/stay");
    }
    setIsFilterApplied(true);
  }

  function formatDate(dates) {
    const date = new Date(dates);
    return date.toISOString().split("T")[0];
  }

  function onPlaceModalOpen() {
    setPlaceDropdownOpen(!isPlaceDropdownOpen);
    setDateInDropdownOpen(false);
    setDateOutDropdownOpen(false);
    setGuestDropdownOpen(false);
  }

  function onDateInModalOpen() {
    setDateInDropdownOpen(!isDateInDropdownOpen);
    setDateOutDropdownOpen(false);
    setPlaceDropdownOpen(false);
    setGuestDropdownOpen(false);
  }

  function onDateOutModalOpen() {
    setDateOutDropdownOpen(!isDateOutDropdownOpen);
    setDateInDropdownOpen(false);
    setPlaceDropdownOpen(false);
    setGuestDropdownOpen(false);
  }

  function onGuestModalOpen() {
    setGuestDropdownOpen(!isGuestDropdownOpen);
    setDateInDropdownOpen(false);
    setDateOutDropdownOpen(false);
    setPlaceDropdownOpen(false);
  }

  function onModalsClose() {
    setGuestDropdownOpen(false);
    setDateInDropdownOpen(false);
    setDateOutDropdownOpen(false);
    setPlaceDropdownOpen(false);
  }

  function handleMouseMove(e) {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const mouseX = ((e.clientX - rect.left) / rect.width) * 100;
    const mouseY = ((e.clientY - rect.top) / rect.height) * 100;
    button.style.setProperty("--mouse-x", `${mouseX}%`);
    button.style.setProperty("--mouse-y", `${mouseY}%`);
    setMousePos({ x: mouseX, y: mouseY });
  }

  return (
    <section
      className={`stay-filter-focused-main-box ${
        isFilterFocused ? "" : "transform"
      }`}
    >
      <div className="stay-filter-focused-main">
        <div className="stays-link">
          <Link to="/stay" className="stays">
            Stays
          </Link>
        </div>

        <section
          className={`stay-filter-focused ${
            isPlaceDropdownOpen ||
            isDateInDropdownOpen ||
            isDateOutDropdownOpen ||
            isGuestDropdownOpen
              ? "gray"
              : "white"
          }`}
        >
          <div
            className={`stay-filter-focused-place ${
              isPlaceDropdownOpen ? "focus-place" : "not-focus-place"
            }`}
            onClick={() => onPlaceModalOpen()}
          >
            <h3>Where</h3>
            <input
              type="text"
              name="place"
              value={country || ""}
              onChange={handleChange}
              placeholder="Search destinations"
            />
          </div>

          <div
            className={`stay-filter-focused-date ${
              isDateInDropdownOpen ? "focus-date" : "not-focus-date"
            }`}
            onClick={() => onDateInModalOpen()}
          >
            <div className="stay-filter-focused-date-in-box">
              <div className="stay-filter-focused-date-in">
                <h3>Check in</h3>
                <div className="date-input">
                  {startDate
                    ? startDate.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })
                    : "Add dates"}
                </div>
              </div>
              {startDate && endDate && isDateInDropdownOpen && (
                <button onClick={clearDates}>
                  <img src="/svg/close.svg" alt="" />
                </button>
              )}
            </div>
          </div>

          <div
            className={`stay-filter-focused-date ${
              isDateOutDropdownOpen ? "focus-date" : "not-focus-date"
            }`}
            onClick={() => onDateOutModalOpen()}
          >
            <div className="stay-filter-focused-date-out-box">
              <div className="stay-filter-focused-date-out">
                <h3>Check out</h3>
                <div className="date-input">
                  {endDate
                    ? endDate.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })
                    : "Add dates"}
                </div>
              </div>
              {startDate && endDate && isDateOutDropdownOpen && (
                <button onClick={clearDates}>
                  <img src="/svg/close.svg" alt="" />
                </button>
              )}
            </div>
          </div>

          <div
            className={`stay-filter-focused-guest ${
              isGuestDropdownOpen ? "focus-guest" : "not-focus-guest"
            }`}
            onClick={() => onGuestModalOpen()}
          >
            <div className="guest-input-box">
              <h3>Who</h3>
              <div className="guest-input">
                {totalGuests
                  ? `${totalGuests} guest${totalGuests > 1 ? "s" : ""}`
                  : "Add guests"}
              </div>
            </div>
            {isPlaceDropdownOpen ||
            isDateInDropdownOpen ||
            isDateOutDropdownOpen ||
            isGuestDropdownOpen ? (
              <button
                className="stay-filter-focused-search"
                onClick={(ev) => applyFilters(ev)}
                onMouseMove={handleMouseMove}
              >
                <i className="fa-solid fa-magnifying-glass"></i> Search
              </button>
            ) : (
              <button
                className="stay-filter-focused-not-search"
                onClick={(ev) => applyFilters(ev)}
                onMouseMove={handleMouseMove}
              >
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            )}
          </div>
        </section>

        {isPlaceDropdownOpen && (
          <PlaceModal
            filterBy={filterBy}
            handleSelectPlace={handleSelectPlace}
          />
        )}
        {isDateInDropdownOpen && (
          <DateModal filterBy={filterBy} handleDateChange={handleDateChange} />
        )}
        {isDateOutDropdownOpen && (
          <DateModal filterBy={filterBy} handleDateChange={handleDateChange} />
        )}
        {isGuestDropdownOpen && (
          <GuestModal
            filterBy={filterBy}
            handleGuestChange={handleGuestChange}
          />
        )}
      </div>
    </section>
  );
}
