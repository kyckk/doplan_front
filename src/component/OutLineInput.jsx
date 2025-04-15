const OutlineInput = ({
    value,
    placeholder,
    onChange
  }) => {
    return (
      <input
        type="text"
        className="outline-input"
        placeholder={placeholder}
        value={value}
        onChange={onChange} // input의 입력 값이 변경되면 props로 받은 onChange 함수 실행
      />
    )
  }
  
  export default OutlineInput;