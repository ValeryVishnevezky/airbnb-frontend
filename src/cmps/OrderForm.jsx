import React, { useState, useEffect, useRef } from "react";
import { stayService } from "../services/stay/stay.service.js";
import { numberWithCommas } from "../services/utils/util.service.js";
import { GuestModalDetails } from "./GuestModalDetails.jsx";
import { DateModalDetails } from "./DateModalDetails.jsx";
import { ReservationDetails } from "./ReservationDetails.jsx";

export function OrderForm({ stayId, filterBy, formatDate }) {
  const [stay, setStay] = useState(null);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(0);
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [pets, setPets] = useState(0);
  const [nights, setNights] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const orderFormRef = useRef(null);
  const [isGuestDropdownOpen, setGuestDropdownOpen] = useState(false);
  const [isDateDropdownOpen, setDateDropdownOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    stayService
      .getById(stayId)
      .then((stay) => {
        setStay(stay);
      })
      .catch((err) => console.error("Failed to load stay:", err));
  }, [stayId]);

  useEffect(() => {
    if (filterBy.availableDates.start) {
      setCheckIn(filterBy.availableDates.start);
    }
    if (filterBy.availableDates.end) {
      setCheckOut(filterBy.availableDates.end);
    }
    if (filterBy.minCapacity) {
      setGuests(filterBy.minCapacity);
    }
  }, [filterBy]);

  useEffect(() => {
    if (checkIn && checkOut) {
      const checkInDate = new Date(checkIn);
      const checkOutDate = new Date(checkOut);
      const calculatedNights = Math.max(
        (checkOutDate - checkInDate) / (1000 * 3600 * 24),
        0
      );
      setNights(calculatedNights);
    } else {
      setNights(0);
    }
  }, [checkIn, checkOut]);

  useEffect(() => {
    if (stay) {
      setTotalPrice(stay.price * nights);
    }
  }, [nights, stay]);

  const handleReserve = () => {
    setIsModalOpen(true);
  };

  function handleGuestChange(guestDetails) {
    const { adults, children, infants, pets } = guestDetails;
    const totalGuests = adults + children + infants + pets;
    setAdults(adults);
    setChildren(children);
    setInfants(infants);
    setPets(pets);
    setGuests(totalGuests);
  }

  function handleDateChange(dates) {
    const [startDate, endDate] = dates;

    if (startDate && endDate) {
      setCheckIn(startDate);
      setCheckOut(endDate);
      setDateDropdownOpen(false);
    }
  }

  function onOpenGuestModal() {
    setGuestDropdownOpen(!isGuestDropdownOpen);
    setDateDropdownOpen(false);
  }

  function onOpenDateModal() {
    setDateDropdownOpen(!isDateDropdownOpen);
    setGuestDropdownOpen(false);
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

  if (!stay) return <p>Loading...</p>;
  return (
    <>
      <div className="order-form" ref={orderFormRef}>
        <div className="order-price">
          <span className="price-per-night">
            ${numberWithCommas(stay.price)}
          </span>{" "}
          <span>night</span>
        </div>
        <div className="order-table">
          <div className="order-dates" onClick={() => onOpenDateModal()}>
            <div className="date-input">
              <label>Check in</label>
              <div className="input">
                {checkIn
                  ? new Date(checkIn).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  : "Add dates"}
              </div>
            </div>
            <div className="date-input">
              <label>Check out</label>
              <div className="input">
                {checkOut
                  ? new Date(checkOut).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  : "Add dates"}
              </div>
            </div>
          </div>
          <div
            className={`${
              isGuestDropdownOpen ? "bold-border" : "order-guests"
            } `}
            onClick={() => onOpenGuestModal()}
          >
            <div className="stay-details-guest">
              <label>Guests</label>
              <div className="guest-input">
                {guests
                  ? `${guests} guest${guests > 1 ? "s" : ""}`
                  : "Add guests"}
              </div>
            </div>
          </div>
        </div>
        <button className="reserve-button" onClick={handleReserve} onMouseMove={handleMouseMove}>
          Reserve
        </button>
        <p className="no-charge-text">You won't be charged yet</p>
        <div className="order-summary">
          <div className="price-calculation">
            <span className="underline-text">
              ${numberWithCommas(stay.price)} x {nights}{" "}
              {nights === 1 ? " night" : " nights"}
            </span>
            <span>${numberWithCommas(totalPrice)}</span>
          </div>
          <div className="total-divider"></div>
          <div className="total-price">
            <span>Total</span>
            <span>${numberWithCommas(totalPrice)}</span>
          </div>
        </div>
        {isGuestDropdownOpen && (
          <GuestModalDetails
            filterBy={filterBy}
            handleGuestChange={handleGuestChange}
            setGuestDropdownOpen={setGuestDropdownOpen}
          />
        )}
        {isDateDropdownOpen && (
          <DateModalDetails
            nights={nights}
            checkIn={checkIn ? new Date(checkIn) : null}
            checkOut={checkOut ? new Date(checkOut) : null}
            handleDateChange={handleDateChange}
            setDateDropdownOpen={setDateDropdownOpen}
          />
        )}
      </div>
      {isModalOpen && (
        <ReservationDetails
          stay={stay}
          guests={guests}
          adults={adults}
          children={children}
          infants={infants}
          pets={pets}
          reservationDates={{ checkIn, checkOut }}
          totalPrice={totalPrice}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}
