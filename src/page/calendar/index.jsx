import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { format, addMonths, subMonths } from "date-fns";
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from "date-fns";
import { isSameMonth, isSameDay, addDays, parse } from "date-fns";
import "../../static/calendar.css";
import "../../static/main.css";
import Page from "../../component/Page";
import TodoApi from "../../lib/Api/TodoApi";
import TodoText from "../../component/TodoText";

const RenderHeader = ({ currentMonth, prevMonth, nextMonth }) => {
  return (
    <div className="header row">
      <span class="fluent-mdl2--completed"></span>
      <div className="col col-start">
        <span className="text">
          <span className="text month">{format(currentMonth, "M")}월</span>
          {format(currentMonth, "yyyy")}
        </span>
      </div>
      <div className="col col-end">
        <Icon icon="bi:arrow-left-circle-fill" onClick={prevMonth} />
        <Icon icon="bi:arrow-right-circle-fill" onClick={nextMonth} />
      </div>
    </div>
  );
};

const RenderDays = () => {
  const days = [];
  const date = ["Sun", "Mon", "Thu", "Wed", "Thrs", "Fri", "Sat"];

  for (let i = 0; i < 7; i++) {
    days.push(
      <div className="col" key={i}>
        {date[i]}
      </div>
    );
  }

  return <div className="days row">{days}</div>;
};

const RenderCells = ({ currentMonth, selectedDate, onDateClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentSeq, setCurrentSeq] = useState(null);
  
  const [toDoList, setToDoList] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      let array = [];
      try {
        array = await TodoApi.GetTodoList();
      } catch (e) {
        console.error(e);
      } finally {
        setToDoList(array);
      }
    };
    fetchData();
  }, []);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);
  console.log(toDoList);
  const rows = [];
  let days = [];
  let day = startDate;
  console.log("day", day);

  console.log("date", format(startDate, "yyyy/M/d"));
  let formattedDate = "";

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = format(day, "d");
      // console.log("formattedDate", formattedDate);
      // console.log("day", day);
      // console.log("currentMonth,day"+format(currentMonth, "M"),format(day, "M"))
      const cloneDay = day;
      days.push(
        <div
          className={`col cell ${
            !isSameMonth(day, monthStart)
              ? "disabled"
              : isSameDay(day, selectedDate)
              ? "selected"
              : format(currentMonth, "M") !== format(day, "M")
              ? "not-valid"
              : "valid"
          }`}
          key={day}
          onClick={() => {
            onDateClick(parse(cloneDay));
            setIsOpen(true);
            setCurrentSeq(format(cloneDay, "yyyy/M/d"));
          }}
       
        >
          <span
            className={
              format(currentMonth, "M") !== format(day, "M")
                ? "text not-valid"
                : ""
            }
          >
            {/* {format(day, 'yyyy/M/d')} */}
            {formattedDate}
          </span>
          {toDoList.some(
            (toDo) =>
              format(new Date(toDo.updatedAt), "yyyy/M/d") ===
                format(day, "yyyy/M/d") && toDo.completed === true
          )&& <Icon
          style={{ margin: "4px 0 0 14px" }}
          icon="mdi:check-circle"
          width="32"
          height="18"
        />}
         
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
  return <div className="body">{rows} <TodoText open={isOpen} sqeunce={currentSeq}  onClose={() => setIsOpen(false)}/></div>;
};

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
          <RenderHeader
            currentMonth={currentMonth}
            prevMonth={prevMonth}
            nextMonth={nextMonth}
          />
          <RenderDays />
          <RenderCells
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
