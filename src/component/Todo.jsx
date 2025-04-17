const ToDo = ({
    isComplete, // boolean 타입, 완료한 To Do인지 아닌지 여부
      value,
    onClick
  }) => {
    return (
      <div
        className="to-do"
        data-is-complete={isComplete} // HTML의 data속성에 isComplete 값 저장
        onClick={onClick}
      >
        {/* isComplete이 true일때만 ✔️ 이모티콘 출력 */}
        <p>{isComplete && <span>&#10004;</span>}</p>
        <p>{value}</p>
       
      </div>
      
    )
  }
  
  export default ToDo;