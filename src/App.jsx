import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Project from "./pages/Project";
import ProjectDetail from "./pages/ProjectDetail";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <div>
      <ScrollToTop />
      <Nav />
      <Routes>
        {/* 페이지 바뀔 때 마다 내용 교체 */}
        <Route path="/" element={<Home />} />
        <Route path="/project" element={<Project />} />
        <Route path="/project/:id" element={<ProjectDetail />} />
        <Route path="/about" element={<About />} />
        {/* 
        위 경로에 하나도 안 맞을 때 보여주는 화면.
        vercel.json에서 모든 주소를 index.html로 보내고 있어서,
        이게 없으면 없는 주소로 들어왔을 때 빈 화면이 뜬다.
        */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
