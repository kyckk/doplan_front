import React, { useEffect, useState } from "react";
import Page from "../../component/Page";
import "../../static/main.css";
import OutlineInput from "../../component/OutLineInput";
import PrimaryButton from "../../component/PrimaryButton";
import ToDo from "../../component/Todo";
import TodoApi from "../../lib/Api/TodoApi";
import TextButton from "../../component/TextButton";
import Dialog from "../../component/Dialog";
const Todo = () => {
  const [inputValue, setInputValue] = useState("");
  const [toDoList, setToDoList] = useState([
    { todoId: 1, content: "todo내용1", isComplete: false },
    { todoId: 2, content: "todo내용2", isComplete: true },
    { todoId: 3, content: "todo내용3", isComplete: true },
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const [currentSeq, setCurrentSeq] = useState(null);
  const data = async () => {
    //await TodoApi.GetTodoList()
    await TodoApi.SaveTodo(toDoList);
  };
  const addToDo = () => {
    if (inputValue.trim()) {
      setToDoList((current) => [
        ...current,
        { todoId: 4, content: inputValue, isComplete: false },
      ]);
      setInputValue("");
    }
    data();
  };
  useEffect(() => {
    console.log("업데이트된 toDoList:", toDoList);
  }, [toDoList]); // toDoList가 변경될 때마다 useEffect가 실행됨

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };
  const toggleComplete = (id) => {
    console.log("id", id);
    setToDoList((current) =>
      current.map((toDo) => {
        if (toDo.todoId === id) {
          return { ...toDo, isComplete: !toDo.isComplete };
        }
        return toDo;
      })
    );
  };
  const isUncompletedToDo = (toDo) => !toDo.isComplete;

  const getUncompletedToDoList = () => toDoList.filter(isUncompletedToDo);

  const removeAllCompletedToDo = () => {
    setToDoList((current) => current.filter(isUncompletedToDo));
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
          <PrimaryButton onClick={addToDo} />
        </div>

        <div className="app-list">
          {toDoList.map((toDo, index) => (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <ToDo
                key={toDo.todoId}
                isComplete={toDo.isComplete}
                value={toDo.content}
                onClick={() => toggleComplete(toDo.todoId)}
              />
              <button
                style={{
                  marginLeft: 10, 
                  background: "black",
                }}
                className="primary-button"
                onClick={() =>{setIsOpen(true) ;setCurrentSeq(toDo.todoId)}}
              >
                &#9998;
              </button>
            
                  
            
            </div>
          ))}
            <Dialog open={isOpen} sqeunce={currentSeq} state={setToDoList} onClose={() => setIsOpen(false)}/>
        </div>

        <div className="app-footer">
          <p>남은 일 :{getUncompletedToDoList().length}개</p>
          <TextButton label="완료 목록 삭제" onClick={removeAllCompletedToDo} />
        </div>
      </div>
    </Page>
  );
};
export default Todo;
