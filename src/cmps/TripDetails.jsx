import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { numberWithCommas } from "../services/utils/util.service.js";
import { userService } from "../services/user/user.service.js";

export function TripDetails({
  selectedStayId,
  stays,
  orders,
  setTripDetailsOpen,
}) {
  const user = useSelector((storeState) => storeState.userModule.user);
  const [order, setOrder] = useState([]);
  const [stay, setStay] = useState({});
  const [host, setHost] = useState({});
  const navigate = useNavigate();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(stays);
    
    const stay = Object.values(stays).find((stay) => stay._id === selectedStayId);
    setStay(stay);
    const order = Object.values(orders).find((order) => order.stayId === selectedStayId);
    setOrder(order);
    if (order) {
      userService.getById(order.hostId).then((host) => setHost(host));
    }
    setLoading(false);
  }, [selectedStayId, stays, orders]);

  function handleMouseMove(e) {
    const button = e.currentTarget
    const rect = button.getBoundingClientRect()
    const mouseX = ((e.clientX - rect.left) / rect.width) * 100
    const mouseY = ((e.clientY - rect.top) / rect.height) * 100
    button.style.setProperty("--mouse-x", `${mouseX}%`)
    button.style.setProperty("--mouse-y", `${mouseY}%`)
    setMousePos({ x: mouseX, y: mouseY })
  }

  function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  function onTripClick(stayId) {
    navigate(`/stay/${stayId}`);
  }

  if (loading) return <div>Loading...</div>;
  return (
    <div className="trip-details" onClick={() => setTripDetailsOpen(false)}>
      <div className="trip-details-modal">
        <div className="trip-details-stay-info">
          <div className="trip-details-img">
            <img src={stay.imgUrls[0]} alt="" />
          </div>

          <div className="trip-details-info">
            <h1>{stay.name}</h1>
            <p>
              Adults <span>{order.guests.adults}</span>
            </p>
            <p>
              Kids <span>{order.guests.kids}</span>
            </p>
            <p>
              Country <span>{stay.country}</span>
            </p>
            <p>
              Dates{" "}
              <span className="span-dates">
                {formatDate(order.startDate)} - {formatDate(order.endDate)}
              </span>
            </p>
            <p>
              Total price{" "}
              <span className="span-price">
                ${numberWithCommas(order.totalPrice)}
                 {/* / night {order.nights}
                {order.nights === 1 ? "night" : "nights"} */}
              </span>
            </p>
          </div>
        </div>

        <div className="trip-details-bottom">
          <div className="trip-details-host-info">
            <div className="trip-details-host-info-box">
              <img src={host.imgUrl} alt="" />
              <h1>Host {host.fullname}</h1>
            </div>
          </div>
          <button
            onClick={() => onTripClick(stay._id)}
            onMouseMove={handleMouseMove}
          >
            Stay details
          </button>
        </div>
      </div>
    </div>
  );
}
