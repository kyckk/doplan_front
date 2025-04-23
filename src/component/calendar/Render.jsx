import { Icon } from "@iconify/react";
import { format } from "date-fns";
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from "date-fns";
import { isSameMonth, isSameDay, addDays, parse } from "date-fns";
import React, { useState, useEffect } from "react";
import TodoApi from "../../lib/Api/TodoApi";
import TodoText from "../TodoText";


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
            {formattedDate}
          </span>

          {isCompletedOnDay(toDoList,day) && (
            <Icon
              style={{ margin: "4px 0 0 14px" }}
              icon="mdi:check-circle"
              width="32"
              height="18"
            />
          )}
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
  return (
    <div className="body">
      {rows}{" "}
      <TodoText
        open={isOpen}
        sqeunce={currentSeq}
        onClose={() => setIsOpen(false)}
      />
    </div>
  );
};

const isCompletedOnDay = (targetTodo,targetDay) => {
  return targetTodo.some(
    (toDo) =>
      format(new Date(toDo.updatedAt), "yyyy/M/d") ===
        format(targetDay, "yyyy/M/d") && toDo.completed === true
  );
};
const Render = {
  RenderHeader: RenderHeader,
  RenderDays: RenderDays,
  RenderCells: RenderCells,
};
export default Render;
