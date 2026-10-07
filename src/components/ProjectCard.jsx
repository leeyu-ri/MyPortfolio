import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./ProjectCard.module.css";
import useInView from "../hooks/useInView";

function ProjectCard({ project }) {
  const { id, title, subtitle, type, demoVideo, poster } = project;
  const videoRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [cardRef, isVisible] = useInView();

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
        <span className={styles.type}>{type}</span>
        <h3 className={styles.title}>{title}</h3>

        <p className={styles.subtitle}>{subtitle}</p>
      </div>
    </Link>
  );
}

export default ProjectCard;
