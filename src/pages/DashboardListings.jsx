import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { stayAction } from "../store/actions/stay.actions.js";

export default function DashboardListings() {
  const user = useSelector((storeState) => storeState.userModule.user);  
  const stays = useSelector((storeState) => storeState.stayModule.stays);
  const [isSmallListing, setSmallListing] = useState(window.innerWidth <= 745);
  const navigate = useNavigate();
  
  useEffect(() => {
    stayAction.loadStays()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    };
  }, [])

  function handleResize() {
    if (window.innerWidth <= 745) {
      setSmallListing(true);
    } else {
      setSmallListing(false);
    }
  };

  function onImgClick(stayId) {
    const stay = stays.find((stay) => stay._id === stayId);
    navigate(`/stay/${stay._id}`);
  }

  const usersStays = stays.filter((stay) => stay.host._id === user._id)
  if (!stays || !user || !usersStays) return <div>Loading...</div>
  return (
    <div className="dashboard-listings">
      <div className="dashboard-links">
        <Link to="/dashboard/listings" className="link-l">
          Listings
        </Link>
        <Link to="/dashboard/reservations" className="link">
          Reservations
        </Link>
      </div>
      <div className="dashboard-listings-list">
        <div className="dashboard-listings-header">
          <h1>
            {usersStays.length}
            {usersStays.length === 1 ? " listing" : " listings"}
          </h1>
          <button>
            <Link to="/stay/edit" className="add-listing">
              <img src="/svg/plus.svg" alt="" /> Add listings
            </Link>
          </button>
        </div>
        {isSmallListing ? (
          <div className="dashboard-listings-stays-small">
            {usersStays.map((usersStay) => (
              <div key={usersStay._id} className="stay">
                <div className="stay-img">
                  <img
                    onClick={() => onImgClick(usersStay._id)}
                    src={usersStay.imgUrls[0] || ""}
                    alt={usersStay.name}
                    className="stay-image"
                  />
                </div>
                <h1 className="stay-name">{usersStay.name}</h1>
                <h1 className="num">{usersStay.capacity} {usersStay.capacity === 1 ? "Guest" : "Guests"}</h1>
                <h1 className="num">{usersStay.bedrooms} {usersStay.bedrooms === 1 ? "Bedroom" : "Bedrooms"}</h1>
                <h1 className="num">{usersStay.bathrooms} {usersStay.bathrooms === 1 ? "Bathroom" : "Bathrooms"}</h1>
                <h1 className="num">${usersStay.price}</h1>
                <div className="name">
                  <Link to={`/stay/edit/${usersStay._id}`} className="edit-btn">
                    Edit
                  </Link>
                  <Link to={`/stay/${usersStay._id}`} className="view-btn">
                    View
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="dashboard-listings-stays">
            <table className="stay-table">
              <thead>
                <tr>
                  <th className="listing">LISTING</th>
                  <th></th>
                  <th>CAPACITY</th>
                  <th>BEDROOMS</th>
                  <th>BATHROOMS</th>
                  <th>PRICE</th>
                  <th className="manage">MANAGE</th>
                </tr>
              </thead>
              <tbody>
                {usersStays.map((usersStay) => (
                  <tr key={usersStay._id}>
                    <td className="stay-img">
                      <img
                        onClick={() => onImgClick(usersStay._id)}
                        src={usersStay.imgUrls[0] || ""}
                        alt={usersStay.name}
                        className="stay-image"
                        style={{ width: "100px", height: "auto" }}
                      />
                    </td>
                    <td className="stay-name">{usersStay.name}</td>
                    <td className="num">{usersStay.capacity}</td>
                    <td className="num">{usersStay.bedrooms}</td>
                    <td className="num">{usersStay.bathrooms}</td>
                    <td className="num">${usersStay.price}</td>
                    <td className="name">
                      <Link to={`/stay/edit/${usersStay._id}`} className="edit-btn">
                        Edit
                      </Link>
                      <Link to={`/stay/${usersStay._id}`} className="view-btn">
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
