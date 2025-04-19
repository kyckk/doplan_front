import React from "react";
import "../static/main.css";
const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">My App</div>
      <ul>
        <li>
          <a href="/">Todo List</a>
        </li>
        <li>
          <a href="/calendar">Calendar</a>
        </li>
      </ul>
    </nav>
  );
};
export default Navbar;
