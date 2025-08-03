import { useEffect, useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { amenityIcons, filterAmenities } from "../services/utils/amenities.js";
import { loadStay } from "../store/actions/stay.actions";
import { OrderForm } from "../cmps/OrderForm";
import { AmenitiesModal } from "../cmps/AmenitiesModal";
import { MobileGallery } from "../cmps/MobileGallery.jsx";
import { MobileOrderForm } from "../cmps/MobileOrderForm.jsx";
import { LongTxt } from "../cmps/LongTxt.jsx";
import { MobileHeader } from "../cmps/MobileHeader.jsx";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { StayInformation } from "../cmps/StayInformation";
import { GuestFavorite } from "../cmps/GuestFavorite.jsx";



const MySwal = withReactContent(Swal);

export default function StayDetails() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 745);
  const { stayId } = useParams();
  const stay = useSelector((storeState) => storeState.stayModule.stay);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const filterBy = useSelector((storeState) => storeState.stayModule.filterBy);
  const [reviewAmount, setReviewAmount] = useState(6);
  

  useEffect(() => {
    if (stay) {
      let num = isMobile ? stay.reviews.length : 6
      setReviewAmount(num)
    }
  }, [isMobile, stay])

  useEffect(() => {
    const params = updateSearchParams(filterBy);
    if (params.toString()) {
      setSearchParams(params)
    }
    loadStay(stayId);
  }, [stayId, filterBy, setSearchParams, loadStay]);

  function updateSearchParams(filterBy) {
    const params = new URLSearchParams();
    if (filterBy.availableDates.start) {
      params.set("startDate", formatDate(filterBy.availableDates.start));
    }
    if (filterBy.availableDates.end) {
      params.set("endDate", formatDate(filterBy.availableDates.end));
    }
    if (filterBy.place) {
      params.set("place", filterBy.place);
    }
    if (filterBy.adults) {
      params.set("adults", filterBy.adults);
    }
    if (filterBy.children) {
      params.set("children", filterBy.children);
    }
    if (filterBy.infants) {
      params.set("infants", filterBy.infants);
    }
    if (filterBy.pets) {
      params.set("pets", filterBy.pets);
    }
    return params;
  }

  function formatDate(dates) {
    const date = new Date(dates);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate
  }

  useEffect(() => {
    window.addEventListener("resize", handleMobileResize);
    return () => {
      window.removeEventListener("resize", handleMobileResize);
    };
  }, []);

  function handleMobileResize() {
    setIsMobile(window.innerWidth < 745);
  }

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const showSharePopup = () => {
    MySwal.fire({
      position: "top-end",
      icon: "success",
      title: "Link copied",
      showConfirmButton: false,
      timer: 900,
      customClass: {
        popup: "share-popup",
      },
      backdrop: false,
      target: ".share-btn",
    });
  };

  if (!stay) return <p>Loading...</p>;

  const hardcodedRatings = stay.reviews.map(
    (_, index) => 4.91 + (index % 10) / 100
  );
  const averageRating = (
    hardcodedRatings.reduce((sum, rate) => sum + rate, 0) /
    hardcodedRatings.length
  ).toFixed(2);

  const filteredAmenities = filterAmenities(stay.amenities, amenityIcons);

  return (
    <div className="main-details">
      {isMobile && <MobileHeader />}
      <section className="stay-details">
        {stay && (
          <div className="stay-content">
            <div className="stay-main">
              {!isMobile && (
                <div className="stay-header">
                  <h3>{stay.name}</h3>
                  <div className="stay-actions">
                    <button className="share-btn" onClick={showSharePopup}>
                      <img src="/svg/share.svg" alt="Share" />
                      Share
                    </button>
                    <button className="save-btn">
                      <img src="/svg/save.svg" alt="Save" />
                      Save
                    </button>
                  </div>
                </div>
              )}
              {isMobile ? (
                <MobileGallery stay={stay} />
              ) : (
                <div className="stay-gallery">
                  {stay.imgUrls.map((url, index) => (
                    <div key={index} className="image-wrapper">
                      <img src={url} alt={stay.name} className="stay-image" />
                    </div>
                  ))}
                </div>
              )}

              <div className="stay-content-wrapper">
                <div className="grid-wrapper">
                  <div className="stay-description">
                    {isMobile && <h3>{stay.name}</h3>}
                    <p>
                      {stay.type} in {stay.loc.city}, {stay.loc.country}
                    </p>
                  </div>
                  <div className="stay-capacity">
                    <h6 className="stay-capacity-guests">
                      {stay.capacity} {stay.capacity === 1 ? "guest" : "guests"} • {stay.bedrooms}{" "}
                      {stay.bedrooms === 1 ? "bedroom" : "bedrooms"} • {stay.bathrooms}{" "}
                      {stay.bathrooms === 1 ? "bath" : "baths"}
                    </h6>
                    {stay.isGuestFavorite ? (
                      <GuestFavorite
                        rating={averageRating}
                        reviewCount={stay.reviews.length}
                      />
                    ) : (
                      <div className="stay-capacity-review">
                        <img src="/svg/star.svg" alt="" />
                        <h6>
                          {stay.reviews && stay.reviews.length > 0
                            ? averageRating
                            : "No rating"}{" "}
                          •{" "}
                          <span>
                            {stay.reviews.length === 1
                              ? " 1 review"
                              : `${stay.reviews.length} reviews`}
                          </span>
                        </h6>
                      </div>
                    )}
                  </div>


                  <div className="stay-host">
                    <img
                      src={stay.host.pictureUrl}
                      alt={stay.host.fullname}
                      className="host-image"
                    />
                    <div className="titles">
                      <h5>Hosted by {stay.host.fullname}</h5>
                      <h6>
                        {stay.host.isSuperhost && (
                          <span className="superhost-badge">Superhost •</span>
                        )}{" "}
                        1 year hosting
                      </h6>
                    </div>
                  </div>
                  <StayInformation amenities={stay.amenities} />
                  <div className="stay-info">
                    <h6>
                      <LongTxt txt={stay.summary} />
                    </h6>
                  </div>
                  <div className="stay-amenities">
                    <h6>What this place offers</h6>
                    <ul className="amenities-preview">
                      {filteredAmenities.map((amenity, index) => (
                        <li key={index} className="amenity-item">
                          <img
                            src={amenityIcons[amenity]}
                            alt={amenity}
                            className="amenity-icon"
                          />
                          <span>{amenity}</span>
                        </li>
                      ))}
                    </ul>
                    <button className="show-more-btn" onClick={toggleModal}>
                      Show all {stay.amenities.length} amenities
                    </button>
                  </div>
                </div>
                {isMobile ? (
                  <MobileOrderForm />
                ) : (
                  <div className="stay-order">
                    <OrderForm
                      stayId={stayId}
                      filterBy={filterBy}
                      formatDate={formatDate}
                    />
                  </div>
                )}
              </div>

              <div className="stay-reviews">
                <div className="stay-reviews-header">
                  <img src="/svg/star.svg" alt="" />
                  <h6>
                    {stay.reviews && stay.reviews.length > 0
                      ? averageRating
                      : "No rating"}{" "}
                    •{" "}
                    <span>
                      {stay.reviews.length === 1
                        ? " 1 review"
                        : `${stay.reviews.length} reviews`}
                    </span>
                  </h6>
                </div>
                <div className="review-items">
                  {stay.reviews.slice(0, reviewAmount).map((review, index) => (
                    <div key={index} className="review-item">
                      <div className="review-header">
                        <img
                          className="reviewer-image"
                          src={review.by.imgUrl}
                          alt={review.by.fullname}
                        />
                        <div className="reviewer-details">
                          <h6 className="reviewer-name">
                            {review.by.fullname}
                          </h6>
                          <h5 className="review-rate">
                            Rating: 4.{91 + (index % 10)}
                          </h5>
                        </div>
                      </div>
                      <h4 className="review-text">
                        <LongTxt txt={review.txt} length={150} />
                      </h4>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
      {isModalOpen && (
        <AmenitiesModal amenities={stay.amenities} onClose={toggleModal} />
      )}
      {isMobile && <MobileOrderForm stay={stay} />}
    </div>
  );
}
