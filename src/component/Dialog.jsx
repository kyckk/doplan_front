import "../static/main.css";
import { useState } from "react";
const Dialog = ({ open,state, onClose ,sqeunce}) => {
    const [inputValue, setInputValue] = useState("");
    const handleChange= (e) => {
        setInputValue(e.target.value);
    };
    const state1 = (value) => { 
        console.log(sqeunce)
        if(inputValue === ""){
            alert("수정 할 내용을 입력하세요.")
            return;
        }
        state((current) =>
            
            current.map((toDo) => {
                // console.log(toDo.todoId)
                    if (toDo.todoId === sqeunce) {
                        return { ...toDo, content: inputValue };
                    }
                    return toDo;
            })
          );
        onClose();  
      }
    
  if (!open) return null;
  return (
    <div className="BackDrop" >
      <div className="Dialog">
        <input type="text" onChange={handleChange} />
        <button onClick={state1}>수정</button>
        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  );
};
export default Dialog;
