const GetTodoList = async () => {
  try {
    const response = await fetch("http://localhost:8080/todoList", {
      method: "GET",
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error fetching todo list:", error);
  }

  return "";
};
const SaveTodo = async (toDoList) => {
  alert();
  console.log("toDoList", toDoList);
  try {
    const response = await fetch("http://localhost:8080/saveTodo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // 서버에 JSON을 보낼 때 명시
      },
      body: JSON.stringify(toDoList), // toDoList를 JSON으로 변환해서 보냄
    });
    //const data = await response.json();  // 서버에서 JSON 응답을 받음
    console.log(response);
  } catch (error) {
    console.error("Error fetching todo list:", error);
  }

  return "";
};
export default { GetTodoList, SaveTodo };
