import DatePicker from "react-datepicker";
import { useState } from "react";
import { format } from "date-fns";

export function DateModalDetails({
  nights,
  checkIn,
  checkOut,
  handleDateChange,
  setDateDropdownOpen,
}) {
  const [dateRange, setDateRange] = useState([checkIn, checkOut]);
  const [startDate, endDate] = dateRange;
  const [isCheckIn, satCheckIn] = useState(true);
  const [isCheckOut, satCheckOut] = useState(false);

  function onClearDates() {
    setDateRange([null, null]);
    satCheckIn(true);
    satCheckOut(false);
  }

  function onOpenCheckIn() {
    satCheckIn(true);
    satCheckOut(false);
  }

  function onOpenCheckOut() {
    satCheckOut(true);
    satCheckIn(false);
  }

  function formatDate(dates) {
    const date = new Date(dates)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div className="date-modal-details" onClick={(e) => e.stopPropagation()}>
      <div className="date-picker-modal">
        <div className="date-picker-modal-top">
        <div className="date-picker-modal-days-info">
          <h1>{!nights ? "Select dates" : `${nights} ${nights === 1 ? "night" : "nights"}`}</h1>
        <h3>{!startDate || !endDate
        ? "Minimum stay: 1 night"
        : `${formatDate(startDate)} - ${formatDate(endDate)}`}</h3>
        </div>
        <div className="order-dates">
          <div
            className={isCheckIn ? "order-dates-bold-border" : "date-input"}
            onClick={() => onOpenCheckIn()}
            >
            <label>Check in</label>
            <div className="input">
              {startDate ? startDate.toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          day: "numeric",
                        }
                      )
                    : "Add dates"}
            </div>
          </div>

          <div
            className={isCheckOut ? "order-dates-bold-border" : "date-input"}
            onClick={() => onOpenCheckOut()}
            >
            <label>Check out</label>
            <div className="input">
              {endDate ? endDate.toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          day: "numeric",
                        }
                      )
                    : "Add dates"}
            </div>
          </div>
        </div>
            </div>
        <DatePicker
          selected={startDate}
          onChange={(dates) => {
            setDateRange(dates);
            handleDateChange(dates);
            if (dates[0] && !dates[1]) {
              onOpenCheckOut();
            }
          }}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          inline
          dateFormat="dd/MM/yyyy"
          monthsShown={2}
          calendarStartDay={0}
        />
      </div>
      <div className="date-modal-btns">
        <button className="date-modal-clear-btn" onClick={() => onClearDates()}>
          Clear dates
        </button>
        <button
          className="date-modal-close-btn"
          onClick={() => setDateDropdownOpen(false)}
        >
          Close
        </button>
      </div>
    </div>
  );
}
