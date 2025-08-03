import React from "react"
import { amenityIcons } from "../services/utils/amenities.js"

export function AmenitiesModal({ amenities, onClose }) {
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("amenities-modal-overlay")) {
      onClose();
    }
  }

  const getRandomIcon = () => {
    const iconKeys = Object.keys(amenityIcons)
    const randomIndex = Math.floor(Math.random() * iconKeys.length);
    return amenityIcons[iconKeys[randomIndex]]
  }

  return (
    <div
      className="amenities-modal-overlay"
      onClick={handleOverlayClick}
    >
      <div className="amenities-modal-content">
        <button className="close-modal-icon" onClick={onClose}>
          ✕
        </button>
        <h3>What this place offers</h3>
        <ul className="amenities-list">
          {amenities.map((amenity, index) => {
            const icon = amenityIcons[amenity] || getRandomIcon(); 
            return (
              <li key={index} className="amenity-item">
                <img
                  src={icon}
                  alt={amenity}
                  className="amenity-icon"
                />
                <span>{amenity}</span>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
