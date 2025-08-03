import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { TripDetails } from "../cmps/TripDetails.jsx";
import { stayService } from "../services/stay/stay.service.js";
import { loadUserOrders } from "../store/actions/order.actions.js";

export default function Trips() {
  const user = useSelector((storeState) => storeState.userModule.user);
  const [isTripDetailsOpen, setTripDetailsOpen] = useState(false);
  const [selectedStayId, setSelectedStayId] = useState(null);
  const [orders, setOrders] = useState([]);
  const [stays, setStays] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?._id) {
      loadUserOrders(user._id).then((response) => {
        const sortedOrders = response.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
        setOrders(sortedOrders);

        const stayIds = response.map((order) => order.stayId);
        Promise.all(stayIds.map((id) => stayService.getById(id)))
          .then((stayData) => {
            const staysMap = stayData.reduce((map, stay) => {
              map[stay._id] = stay;
              return map;
            }, {});
            setStays(staysMap);
            setLoading(false);
          });
      });
    }
  }, [user]);

  function onTripClick(stayId) {
    setSelectedStayId(stayId);
    setTripDetailsOpen(true);
  };

  if (loading) return <div>Loading...</div>;
  return (
    <div className="trips-page">
      <h1>Your trips</h1>
      <div className="user-trips">
        {orders.length > 0 ? (
          orders.map((order) => {
            const stay = stays[order.stayId];
            const stayImage = stay?.imgUrls?.[0] || "";
            const stayName = stay?.name || "";
            return (
              <div
                key={order._id}
                className="user-trip"
                onClick={() => onTripClick(order.stayId)}
              >
                <div className="user-trip-top">
                  <img src={stayImage} alt={stayName} className="trip-image" />
                  <h3 className="trip-name">{stayName.substring(0, 27)}...</h3>
                  <h4 className="trip-dates">{new Date(order.startDate).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                    <span> - </span>
                    {new Date(order.endDate).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                    </h4>
                </div>
                <div className="user-trip-bottom">
                  <p className="user-trip-price">Total ${order.totalPrice}</p>
                  <p className="user-trip-status">
                    <span className={`status ${order.status?.toLowerCase() || "unknown"}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1).toLowerCase()}
                    </span>
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <p>No trips yet</p>
        )}
      </div>
      {isTripDetailsOpen && (
        <TripDetails
        selectedStayId={selectedStayId}
        stays={stays}
        orders={orders}
          setTripDetailsOpen={setTripDetailsOpen}
        />
      )}
    </div>
  );
}
