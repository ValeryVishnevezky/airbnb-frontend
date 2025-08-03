import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
// import { orderService } from '../services/order/order.service'
// import { orderServiceLocal } from '../services/order/order.servece.local.js'
import { addOrder } from "../store/actions/order.actions.js";
import { ReservationSuccessfull } from './ReservationSuccessfull'
import { numberWithCommas } from '../services/utils/util.service'

export  function ReservationDetails({ stay, guests, adults, children, infants, pets, reservationDates, totalPrice, onClose }) {
  const [nights, setNights] = useState(0)
  const [showSuccess, setShowSuccess] = useState(false)
  const user = useSelector((storeState) => storeState.userModule.user)

  useEffect(() => {
    const checkInDate = new Date(reservationDates.checkIn)
    const checkOutDate = new Date(reservationDates.checkOut)
    const calculatedNights = (checkOutDate - checkInDate) / (1000 * 3600 * 24)
    setNights(calculatedNights)
  }, [reservationDates])

  const handleConfirmReservation = () => {
    const order = {
      stayId: stay._id.toString(),
      pricePerNight: stay.price,
      nights,
      guests: { adults, children, infants, pets },
      startDate: reservationDates.checkIn,
      endDate: reservationDates.checkOut,
      status: 'pending',
    }

    addOrder(order)
      .then(() => setShowSuccess(true))
      .catch(err => console.error("Failed to save order:", err))
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  if (showSuccess) {
    return (
      <div className="modal-overlay">
        <ReservationSuccessfull
          stay={stay}
          reservationDates={reservationDates}
          guests={guests}
          totalPrice={numberWithCommas(totalPrice)}
          onClose={() => {
            setShowSuccess(false)
            onClose()
          }}
        />
      </div>
    )
  }

  return (
    <div className="modal-overlay">
      <div className="reservation-details">
        <div className="details-container">
          <div className="details-wrapper">
            <div className="reservation-text">
              <h2>One last step</h2>
              <p>Dear {user.fullname},</p>
              <p>In order to complete your reservation, please confirm your trip details.</p>
              <div className="reservation-info">
                <h3>Reservation details</h3>
                <div className="info-item">
                  <span className="label">Trip dates:</span>
                  <span className="value">{formatDate(reservationDates.checkIn)} - {formatDate(reservationDates.checkOut)}</span>
                </div>
                <div className="info-item">
                  <span className="label">Guests:</span>
                  <div>
                    {adults > 0 && (
                      <span className="value guests">{adults} {adults > 1 ? 'adults' : 'adult'}</span>
                    )}
                    {children > 0 && (
                      <span className="value guests">{children} {children > 1 ? 'children' : 'child'}</span>
                    )}
                    {infants > 0 && (
                      <span className="value guests">{infants} {infants > 1 ? 'infants' : 'infant'}</span>
                    )}
                    {pets > 0 && (
                      <span className="value guests">{pets} {pets > 1 ? 'pets' : 'pet'}</span>
                    )}
                  </div>
                </div>

                <div className="price-details">
                  <div className="info-item">
                    <span className="label">${numberWithCommas(stay.price)} x {nights} nights</span>
                    <span className="value">${numberWithCommas(totalPrice)}</span>
                  </div>
                  <div className="info-item">
                    <span className="label service-label">Service fee</span>
                    <span className="value">$0</span>
                  </div>
                  <div className="info-item total">
                    <span className="label">Total</span>
                    <span className="value">${numberWithCommas(totalPrice)}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="reservation-image">
              <img src={stay.imgUrls ? stay.imgUrls[0] : ''} alt={stay.name || 'Stay'} />
              <p className="stay-name">{stay.name || 'Stay Name'}</p>
              <p className="stay-location">{stay.loc.city}, {stay.loc.country}</p>
            </div>
          </div>
          <div className="buttons-container">
            <button onClick={onClose} className="back-button">Back</button>
            <button onClick={handleConfirmReservation} className="confirm-button">Confirm</button>
          </div>
        </div>
      </div>
    </div>
  )
}
