import React from "react"

export function GuestFavorite({ rating, reviewCount }) {
  return (
    <div className="modal-wrapper">
    <div className="guest-favorite">
      <div className="guest-favorite-info">
        <img src="/svg/leftleaf.svg" alt="Left Leaf" className="leaf-icon" />
        <div className="text-container">
          <span>Guest</span>
          <span>Favorite</span>
        </div>
        <img src="/svg/rightleaf.svg" alt="Right Leaf" className="leaf-icon" />
      </div>
      <p className="guest-favorite-text">One of the most loved homes on Airbnb, according to guests</p>
      <div className="guest-favorite-rating">
        <div className="rating-container">
          <span className="rating">{rating}</span>
          <div className="stars">
            {[...Array(5)].map((_, i) => (
              <img
                key={i}
                src="/svg/star.svg"
                alt="Star"
                className="star-icon"
              />
            ))}
          </div>
        </div>
        <div className="separator"></div>
        <div className="review-container">
          <span className="review-number">{reviewCount}</span>
          <span className="review-text">Reviews</span>
        </div>
      </div>
    </div>
    </div>
  )
}
