import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null; // 화면에 아무것도 렌더링하지 않음
}

export default ScrollToTop;

// 일반 웹사이트(멀티페이지)는 페이지를 이동하면 브라우저가 새로 문서를 불러오면서 스크롤이 자동으로 맨 위로 리셋된다.
// 하지만 React Router 같은 SPA는 실제로는 페이지 이동이 아니라, 같은 html 문서 안에서 컴포넌트만 바꿔치기하는 방식이기에
// 브라우저 입장에서는 새 페이지를 로드한 것이 아니라 이전 스크롤 위치를 유지한다.
// 라우트가 바뀔 때 마다 스크롤을 맨 위로 강제 이동
