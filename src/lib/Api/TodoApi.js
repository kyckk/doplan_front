const GetTodoList = async () => {
    const response = await fetch('http://localhost:8080/todoList',{
        method:'GET',
      });
    const data = await response.json();
    console.log(data);
    return  "";
}

export default  {GetTodoList}