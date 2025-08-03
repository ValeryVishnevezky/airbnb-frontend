import DatePicker from "react-datepicker"
import { useState } from "react"

export function DateModalMobile({ filterBy, handleDateChange, onGuestModalOpen, clearDates }) {
  const [dateRange, setDateRange] = useState([
    filterBy.availableDates.start,
    filterBy.availableDates.end,
  ])
  const [startDate, endDate] = dateRange || [null, null]

  function clearDate() {
    setDateRange([null, null])
    clearDates()
  }

  return (
    <div className="date-modal-mobile" onClick={(e) => e.stopPropagation()}>
      <h1>When’s your trip?</h1>
      <div className="date-picker-modal">
        <DatePicker
          selected={startDate}
          onChange={(dates) => {
            setDateRange(dates)
            handleDateChange(dates)
          }}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          inline          
          dateFormat="dd/MM/yyyy"
          monthsShown={1}
          calendarStartDay={0}
        />
      </div>
      <div className="date-modal-btns-box">
        <button className="clear" onClick={()=> clearDate()}>Clear</button>
        <button className="next" onClick={()=> onGuestModalOpen()}>Next</button>
      </div>
    </div>
  )
}
