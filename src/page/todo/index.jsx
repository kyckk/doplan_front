import React, { useState } from "react";
import Page from "../../component/Page";
import "../../static/main.css";
import OutlineInput from "../../component/OutLineInput";
import PrimaryButton from "../../component/PrimaryButton";
import ToDo from "../../component/Todo";
import TodoApi from "../../lib/Api/TodoApi";
const Todo = () => {
    
  const [inputValue, setInputValue] = useState("");
  const [toDoList] = useState([
    { id: 1, content: "todo내용1" },
    { id: 2, content: "todo내용2" },
    { id: 3, content: "todo내용3" },
  ]);
 
  const data =async()=>{
    await TodoApi.GetTodoList()
  }
    data();  
  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  
  return (
    <Page header={<h1>header</h1>}>
      <div className="app">
        <h1 className="app-title">&#128466; To Do List</h1>

        <div className="app-form">
          <OutlineInput
            placeholder="무엇을 해야하나요?"
            value={inputValue}
            onChange={handleChange}
          />
          <PrimaryButton />
        </div>

        <div className="app-list">
        {toDoList.map((toDo, index) =>
          <ToDo
            key={index}
            isComplete={true}
            value={toDo.content}
            onClick={() => {}}
          />
        )}
        </div>

        <div className="app-footer">
          {/* 남은 일 개수와 <TextButton /> 추가할 곳 */}
        </div>
      </div>
    </Page>
  );
};
export default Todo;
