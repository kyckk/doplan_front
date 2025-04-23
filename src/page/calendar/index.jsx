import React, { useState } from "react";
import "../../static/calendar.css";
import "../../static/main.css";
import Page from "../../component/Page";
import Render from "../../component/calendar/Render";
import { addMonths, subMonths } from "date-fns";

const Calender = () => {
    
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  console.log(selectedDate);
  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };
  const onDateClick = (day) => {
    setSelectedDate(day);
  };
  return (
    <Page header={<h1>header</h1>}>
      <div className="app">
        <div className="calendar">
          <Render.RenderHeader
            currentMonth={currentMonth}
            prevMonth={prevMonth}
            nextMonth={nextMonth}
          />
          <Render.RenderDays />
          <Render.RenderCells
            currentMonth={currentMonth}
            selectedDate={selectedDate}
            onDateClick={onDateClick}
          />
        </div>
      </div>
     
    </Page>
  );
};

export default Calender;
