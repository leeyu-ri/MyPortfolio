import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./ProjectCard.module.css";

function ProjectCard({ project }) {
  const { id, title, subtitle, type, demoVideo, poster } = project;
  const videoRef = useRef(null);
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    videoRef.current?.play();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // 한 번만 실행
        }
      },
      { threshold: 0.2 }, // 20% 보이면 트리거
    );
    // 화면을 그리기 전에 다른 화면으로 이동했을 때 에러 방지하기 위해
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <Link
      ref={cardRef}
      to={`/project/${id}`}
      className={`${styles.card} ${isVisible ? styles.visible : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
    >
      <div className={styles.mediaWrapper}>
        <img
          src={poster}
          alt={title}
          className={styles.posterImage}
          style={{ opacity: isHovered ? 0 : 1 }}
        />
        <video
          ref={videoRef}
          src={demoVideo}
          muted
          loop
          playsInline
          preload="metadata"
          className={styles.videoMedia}
          style={{ opacity: isHovered ? 1 : 0 }}
          aria-hidden="true"
        />
      </div>
      {/*  */}
      <div className={styles.info}>
        <h3 className={styles.title}>{title}</h3>
        <span className={styles.type}>{type}</span>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>
    </Link>
  );
}

export default ProjectCard;
