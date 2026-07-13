import { Routes, Route } from "react-router-dom";
// Routes : 여기 안에 있는 Route들 중에서 지금 URL에 맞는 걸 하나만 보여줘, 컨테이너
// Route : 이 경로면 이 컴포넌트를 보여줘라는 개별 규칙 하나하나
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Project from "./pages/Project";
import ProjectDetail from "./pages/ProjectDetail";
import About from "./pages/About";

function App() {
  return (
    <div>
      <Nav /> {/* Routes 바깥 = 항상 보이는 네비게이션 바 */}
      <Routes>
        {/* 페이지 바뀔 때 마다 내용 교체 */}
        <Route path="/" element={<Home />} />
        <Route path="/project" element={<Project />} />
        <Route path="/project/:id" element={<ProjectDetail />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer /> {/* Routes 바깥 = 항상 보이는 네비게이션 바 */}
    </div>
  );
}

export default App;
