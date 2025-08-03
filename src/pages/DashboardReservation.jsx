import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { loadHostOrders, updateOrder } from "../store/actions/order.actions.js";
import { numberWithCommas } from "../services/utils/util.service.js";
import { userService } from "../services/user/user.service.js";
import { stayService } from "../services/stay/stay.service.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export default function DashboardReservation() {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState({});
  const [stays, setStays] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loggedinUser =
      JSON.parse(sessionStorage.getItem("loggedinUser")) ||
      JSON.parse(localStorage.getItem("loggedinUser"));

    if (loggedinUser && loggedinUser._id) {
      const hostId = String(loggedinUser._id);
      loadHostOrders(hostId).then((response) => {
        const monthsOrder = [
          "Jan", "Feb", "Mar", "Apr", "May", "Jun",
          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ]
        const sortedOrders = response.sort((a, b) => {
          const monthA = new Date(a.startDate).toLocaleString("en-US", { month: "short" });
          const monthB = new Date(b.startDate).toLocaleString("en-US", { month: "short" });
          return monthsOrder.indexOf(monthB) - monthsOrder.indexOf(monthA);
        });
        setOrders(sortedOrders);

        const userIds = response.map((order) => order.userId);
        Promise.all(userIds.map((id) => userService.getById(id))).then(
          (usersData) => {
            const usersMap = usersData.reduce((map, user) => {
              map[user._id] = user;
              return map;
            }, {});
            setUsers(usersMap);
          }
        );

        const stayIds = response.map((order) => order.stayId);
        Promise.all(stayIds.map((id) => stayService.getById(id))).then(
          (stayData) => {
            const staysMap = stayData.reduce((map, stay) => {
              map[stay._id] = stay;
              return map;
            }, {});
            setStays(staysMap);
            setLoading(false);
          }
        );
      });
    }
  }, []);

  const handleStatusChange = async (orderId, status) => {
    const updatedOrders = orders.map((order) => {
      if (order._id === orderId) {
        order.status = status;
      }
      updateOrder(order);
      return order;
    });
    setOrders(updatedOrders);
  };

  const getStayBookingCounts = () => {
    const stayBookingCounts = {};
    if (orders && orders.length > 0) {
      orders.forEach((order) => {
        const stay = stays[order.stayId];
        if (stay && stay.name) {
          const stayName = stay.name;
          stayBookingCounts[stayName] = (stayBookingCounts[stayName] || 0) + 1;
        }
      });
    }
    return stayBookingCounts;
  };

  const getStatusCounts = () => {
    const statusCounts = { pending: 0, approved: 0, rejected: 0 };
    if (orders) {
      orders.forEach((order) => {
        statusCounts[order.status] = (statusCounts[order.status] || 0) + 1;
      });
    }
    return statusCounts;
  };

  function getMonthlyRevenue() {
    const revenueByMonth = {};
    if (orders && orders.length > 0) {
      orders.forEach((order) => {
        const month = new Date(order.startDate).toLocaleString("default", {
          month: "short",
        });
        revenueByMonth[month] = (revenueByMonth[month] || 0) + order.totalPrice;
      });
    }
    const monthsOrder = [
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
    ];
    const sortedRevenue = Object.keys(revenueByMonth)
      .sort((a, b) => monthsOrder.indexOf(a) - monthsOrder.indexOf(b))
      .reduce((acc, month) => {
        acc[month] = revenueByMonth[month];
        return acc;
      }, {});

    return sortedRevenue;
  }

  const stayBookingCounts = getStayBookingCounts();
  const statusCounts = getStatusCounts();
  const monthlyRevenue = getMonthlyRevenue();

  const totalReservations =
    statusCounts.pending + statusCounts.approved + statusCounts.rejected;

  const pendingPercent = Math.round(
    (statusCounts.pending / totalReservations) * 100
  );
  const approvedPercent = Math.round(
    (statusCounts.approved / totalReservations) * 100
  );
  const rejectedPercent = Math.round(
    (statusCounts.rejected / totalReservations) * 100
  );

  const stayPieData = {
    labels: Object.keys(stayBookingCounts),
    datasets: [
      {
        label: "Stay Bookings",
        data: Object.values(stayBookingCounts),
        backgroundColor: ["#6A0DAD", "#0000FF", "#1E90FF", "#00CED1"],
        hoverBackgroundColor: ["#6A0DAD", "#0000FF", "#1E90FF", "#00CED1"],
        borderRadius: 0,
      },
    ],
  };

  const barData = {
    labels: Object.keys(monthlyRevenue),
    datasets: [
      {
        label: "Revenue",
        data: Object.values(monthlyRevenue),
        backgroundColor: [
          "#6A0DAD",
          "#0000FF",
          "#1E90FF",
          "#00CED1",
          "#40E0D0",
        ],
        hoverBackgroundColor: [
          "#500A9D",
          "#0000CC",
          "#1876D2",
          "#00B2A8",
          "#37CACD",
        ],
        borderRadius: 8,
        borderSkipped: false,
      },
    ],
  };

  const pieOptions = {
    plugins: {
      legend: {
        display: true,
        position: "left",
        labels: {
          boxWidth: 18,
          boxHeight: 18,
          usePointStyle: true,
          pointStyle: "rectRounded",
          padding: 5,
          color: "#333",
          font: {
            size: 14,
            family: "AirbnbCereal_W_Lt, san serif",
            weight: "normal",
          },
        },
      },
      tooltip: {
        enabled: true,
      },
    },
    radius: "80%",
    responsive: true,
    maintainAspectRatio: false,
  };

  const barOptions = {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: function (context) {
            return `$${numberWithCommas(context.raw)}`;
          },
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 14,
            family: "AirbnbCereal_W_Lt, san serif",
            weight: "normal",
          },
          color: "#333",
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          display: false,
        },
      },
    },
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="dashboard-reservation">
      <div className="dashboard-links">
        <Link to="/dashboard/listings" className="link">
          Listings
        </Link>
        <Link to="/dashboard/reservations" className="link-r">
          Reservations
        </Link>
      </div>
      <div className="charts-container">
        <div className="chart-card-pie">
          <h3>Stays Booked</h3>
          <div className="pie-chart-container">
            <Pie data={stayPieData} options={pieOptions} />
          </div>
        </div>
        <div className="chart-card-3">
          <div>
            <h3>Reservation Status</h3>
            <div className="reservation-status">
              <div className="status-item">
                <span>Pending</span>
                <span style={{ color: "#FFCE56" }}>
                  {statusCounts.pending} ({pendingPercent}%)
                </span>
              </div>
              <div className="status-item">
                <span>Approved</span>
                <span style={{ color: "#4CAF50" }}>
                  {statusCounts.approved} ({approvedPercent}%)
                </span>
              </div>
              <div className="status-item">
                <span>Rejected</span>
                <span style={{ color: "#FF0000" }}>
                  {statusCounts.rejected} ({rejectedPercent}%)
                </span>
              </div>
            </div>
          </div>
          {/* <div className="actionable-insights">
            <h4>Actionable Insights</h4>
            {statusCounts.pending > statusCounts.approved ? (
              <p>Most reservations are pending. Follow up to increase approvals!</p>
            ) : (
              <p>Approval rates are steady. Great work maintaining quality bookings!</p>
            )}
            {statusCounts.rejected > 0 && (
              <p>
                {statusCounts.rejected} rejected reservations. Consider reviewing
                pricing or policies.
              </p>
            )}
          </div> */}
        </div>
        <div className="chart-card">
          <h3>Revenue / Month</h3>
          <div className="bar-chart-container" style={{ height: "150px" }}>
            <Bar data={barData} options={barOptions} />
          </div>
        </div>
      </div>
      <table>
        <thead>
          <tr className="table-headers">
            <th>BOOKER</th>
            <th>STAY NAME</th>
            <th>DATES RESERVED</th>
            <th>GUESTS</th>
            <th>PRICE / NIGHT</th>
            <th>TOTAL</th>
            <th>STATUS</th>
            <th>MANAGE</th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td colSpan="8" className="no-orders">
                No orders available
              </td>
            </tr>
          ) : (
            orders.map((order) => {
              const user = users[order.userId] || {};
              const stay = stays[order.stayId] || {};

              return (
                <tr key={order._id}>
                  <td className="user-fullname">{user.fullname || "Unknown User"}</td>
                  <td className="stay-name">{stay.name.toLowerCase().substring(0, 20)}...</td>
                  <td className="dates">
                    {new Date(order.startDate).toLocaleDateString("en-US", {
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
                  </td>
                  <td className="guests">{order.guests.adults} Guests</td>
                  <td>${stay.price}</td>
                  <td>${order.totalPrice}</td>
                  <td
                    className="status"
                    style={{
                      color:
                        order.status === "approved"
                          ? "#4CAF50"
                          : order.status === "rejected"
                          ? "#FF0000"
                          : "#FFCE56",
                    }}
                  >
                    {order.status
                      ? order.status.charAt(0).toUpperCase() +
                        order.status.slice(1).toLowerCase()
                      : "Unknown"}
                  </td>
                  <td>
                    <div className="action-btns">
                      <button
                        className="approve-btn"
                        onClick={() =>
                          handleStatusChange(order._id, "approved")
                        }
                      >
                        Approve
                      </button>
                      <button
                        className="reject-btn"
                        onClick={() =>
                          handleStatusChange(order._id, "rejected")
                        }
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
