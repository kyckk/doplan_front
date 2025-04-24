import "../static/main.css";
import { useState, useEffect } from "react";
import TodoApi from "../lib/Api/TodoApi";
import { Icon } from "@iconify/react";
const TodoText = ({ open, onClose, sqeunce }) => {
  console.log("sqeunce", sqeunce);
  const [updateList, setUpdateList] = useState([]); 
  useEffect(() => {
    const fetchData = async () => {
      let array = [];
      try {
        array = await TodoApi.selectTodoList(sqeunce);
      } catch (e) {
        console.error(e);
      } finally {
        setUpdateList(array);
      }
    };
    fetchData();
  }, [sqeunce]);


  if (!open) return null;
  return (
    
    <div className="BackDrop">
      
  <div className=" Dialog" style={{flexDirection: "column", width:"500px" }}>
    <h1 style={{textAlign:"center",margin: "auto"}}>완료목록</h1>
    {Array.isArray(updateList) && updateList.length > 0 ? (
      updateList.slice(0, 5).map((item) => (
        <li key={item.todoId} className="update-list">
          <Icon
                    
                    icon="mdi:check-circle"
                    width="32"
                    height="18"
                  /><p>{item.content}</p>
        </li>
      ))
    ) : (
      <p>완룍목록이 없습니다다.</p>  // 업데이트가 없다는 메시지
    )}
    <button onClick={onClose}>닫기</button>
  </div>
</div>
  );
};
export default TodoText;
