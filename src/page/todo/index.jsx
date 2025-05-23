import React, { useEffect, useState } from "react";
import Page from "../../component/Page";
import "../../static/main.css";
import OutlineInput from "../../component/OutLineInput";
import PrimaryButton from "../../component/PrimaryButton";
import ToDo from "../../component/Todo";
import TodoApi from "../../lib/Api/TodoApi";
import TextButton from "../../component/TextButton";
import Dialog from "../../component/Dialog";
import { format} from "date-fns";
const Todo = () => {
  const [inputValue, setInputValue] = useState("");
  const [toDoList, setToDoList] = useState([
    { todoId: "", content: "", updatedAt:"",createdAt:"", completed: false },
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const [currentSeq, setCurrentSeq] = useState(null);
  const data = async () => {
    console.log("저장1~~~~~~~~~~toDoList", toDoList);  
    
    try {
      await TodoApi.SaveTodo(toDoList);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
   
  };
  const addToDo = () => {
    
    if (inputValue === "") {  
      alert("내용을 입력하세요.");
      return;
    }
    if (inputValue.trim()) {
      setToDoList((current) => [
        ...current,
        { todoId: "",updatedAt:"",createdAt:"", content: inputValue, completed: false },
      ]);
      setInputValue("");
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      let array = [];
      let filterArray =[];
      try {
        array = await TodoApi.GetTodoList();
        filterArray =array.filter((element) => element.completed === false)
        console.log("array", filterArray);  
        // array.forEach(element => {
        //   if(element.completed ===true){
        //     toggleComplete(element.todoId)
        //   }
        // })
      } catch (e) {
        console.error(e);
      } finally {
        setToDoList(filterArray)
      }
      
    }; 
    fetchData();
  }, []);
 
  const handleChange = (event) => {
    setInputValue(event.target.value);
  };
  const toggleComplete = (id) => {
    setToDoList((current) =>
      current.map((toDo) => {
        if (toDo.todoId === id) {
          return { ...toDo, completed: !toDo.completed };
        }
        return toDo;
      })
    );
    
  };
  const isUncompletedToDo = (toDo) => !toDo.completed;

  const getUncompletedToDoList = () => toDoList.filter(isUncompletedToDo);

  const removeAllCompletedToDo = () => {
    if(toDoList.filter((toDo) => toDo.completed).length === 0) {
      alert("삭제할 목록이 없습니다.");
      return;
    };
    const updateList=toDoList.filter((todo)=> todo.completed === true).map((todo) => {
      return { ...todo, updatedAt: format( new Date(), "yyyy-MM-d") };  
    })
    console.log("삭제할 목록", updateList);
    
   
    console.log("삭제할 목록", toDoList);
    data()
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
          
          <button className="primary-button" onClick={data} style={{background:"black"}}>저장</button>
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
                completed={toDo.completed}
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
