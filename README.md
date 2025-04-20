# 📌 ToDo App - Frontend (React.js)

## 1. 프로젝트 소개

이 리포지토리는 **ToDo및calendar 애플리케이션의 프론트엔드**입니다.  
React.js (v19)를 기반으로 CRA(Create React App)로 개발되었으며,  
REST API를 통해 Spring Boot 백엔드와 통신합니다.

### 주요 기능

→ 할 일 조회 (첫 페이지)

→ 추가 (+ 버튼 클릭이후 저장버튼 클락해야 db에저장)

→ 완료 처리 / 삭제 (완료삭제 버튼 클릭)

→ 수정 처리 (연필모양 클릭 이후 저장 버튼 클릭해야 db에저장  )  

→ 라우팅 구현  (react-router-dom 활용  (예: /, /calendar))

→ Calendar 기능 구현 ,달력 기반 UI 구현 및 date-fns 활용

백앤드 연동
→ fetch Api활용
---

## 2. 실행 방법

### 필수 조건

- Node.js (v16 이상)
- npm 또는 yarn

### 설치 및 실행

```bash
# 1. 프로젝트 클론
git clone https://github.com/kyckk/doplan_front.git

# 2. 패키지 설치
npm install

# 3. 개발 서버 실행
npm start
기본 개발 서버 주소: http://localhost:3000

3. 폴더 구조
📦 doplan_front
├── public
├── src
│   ├── components       # 공통 컴포넌트
│   ├── pages            # 메인 페이지들 (todo및 calendar)
│   ├── lib              # fetch API 함수 정의
│   ├── static           # 디자인 리소스
│   └── index.js
├── package.json
└── README.md

4. fetch 사용 예시
// lib/todoApi.js
const GetTodoList = async () => {
  let data = [];
  try {
    const response = await fetch("http://localhost:8080/todoList", {
      method: "GET",
    });
    data = await response.json();
  } catch (error) {
    console.error("Error fetching todo list:", error);
  }
  return data;
};
5. 추가 구현 기능
✅ calendar 완료된 처리된일을 수정 날짜에 체크 
