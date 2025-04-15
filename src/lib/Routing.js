import { BrowserRouter, Route, Routes } from "react-router-dom";
import Todo from "../page/todo";
import Calendar from "../page/calendar";
const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Todo/>}></Route>
        <Route path="/Calendar" element={<Calendar/>}></Route>
        
      </Routes>
    </BrowserRouter>
  );
};
export default Routing;
