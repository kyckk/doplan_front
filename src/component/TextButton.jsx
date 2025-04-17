const TextButton = ({ label, onClick }) => {
  return (
    <p
      className="text-button"
      onClick={onClick} // 클릭하면 props로 받은 onClick 함수 실행
    >
      {label}
    </p>
  );
};

export default TextButton;
