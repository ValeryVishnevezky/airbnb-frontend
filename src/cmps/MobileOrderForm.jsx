import React from "react"
import { useNavigate } from "react-router-dom"
import { numberWithCommas } from "../services/utils/util.service.js"

export function MobileOrderForm({ stay }) {
  const navigate = useNavigate()

  const handleReserve = () => {
    sessionStorage.setItem(
      "reservationDates",
      JSON.stringify({ checkIn: "2024-12-06", checkOut: "2024-12-11" })
    )
    sessionStorage.setItem("reservationGuests", 1)
    navigate(`/reservation/${stay._id}`)
  }

  if (!stay) return null

  return (
    <div className="mobile-order-form">
      <div className="mobile-order-content">
        <div className="mobile-order-price">
          <div>
            <span className="mobile-price-per-night">
              ${numberWithCommas(stay.price)}
            </span>{" "}
            <span className="mobile-price-text">night</span>
          </div>
          <div className="mobile-dates">
            Dec 6–11
          </div>
        </div>
        <button className="mobile-reserve-button" onClick={handleReserve}>
          Reserve
        </button>
      </div>
    </div>
  )
}
