// Calendar.js
import React, { useState } from "react";
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, format, isSameMonth, isSameDay } from "date-fns";

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const renderHeader = () => (
    <div className="header">
      <button onClick={() => setCurrentMonth(prev => addDays(prev, -30))}>◀</button>
      <span>{format(currentMonth, "yyyy년 MM월")}</span>
      <button onClick={() => setCurrentMonth(prev => addDays(prev, 30))}>▶</button>
    </div>
  );

  const renderDays = () => {
    const days = [];
    const date = new Date();
    const dayNames = ["일", "월", "화", "수", "목", "금", "토"];

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col" key={i}>
          {dayNames[i]}
        </div>
      );
    }
    return <div className="days row">{days}</div>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 0 });
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 0 });

    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const cloneDay = day;
        days.push(
          <div
            className={`col cell ${
              !isSameMonth(day, monthStart) ? "disabled" : isSameDay(day, selectedDate) ? "selected" : ""
            }`}
            key={day}
            onClick={() => setSelectedDate(cloneDay)}
          >
            <span>{format(day, "d")}</span>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      );
      days = [];
    }

    return <div className="body">{rows}</div>;
  };

  return (
    <div className="calendar">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  );
};

export default Calendar;
