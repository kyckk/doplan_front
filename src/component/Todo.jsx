const ToDo = ({
    completed, // boolean 타입, 완료한 To Do인지 아닌지 여부
      value,
    onClick
  }) => {
    return (
      <div
        className="to-do"
        data-is-complete={completed} // HTML의 data속성에 completed 값 저장
        onClick={onClick}
      >
        <p>{completed && <span>&#10004;</span>}</p>
        <p>{value}</p>
       
      </div>
      
    )
  }
  
  export default ToDo;