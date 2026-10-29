import { Link } from "react-router-dom";
import styles from "./NotFound.module.css";

// 존재하지 않는 주소로 들어왔을 때 보여주는 화면
// vercel.json이 실제 파일이 없는 모든 주소를 index.html로 보내기 때문에
// 없는 주소는 App.jsx의 path="*를 거쳐 여기로 온다.

function NotFound() {
  return (
    <main className={styles.notFound}>
      <p className={styles.code}>404</p>
      <h1 className={styles.title}>페이지를 찾을 수가 없습니다</h1>
      <p className={styles.desc}>주소가 잘못되었거나 삭제된 페이지입니다</p>
      <Link to="/" className={styles.homeLink}>
        홈으로 돌아가기
      </Link>
    </main>
  );
}

export default NotFound;
