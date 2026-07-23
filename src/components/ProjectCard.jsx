import { useRef } from "react";
import { Link } from "react-router-dom";
import styles from "./ProjectCard.module.css";

function ProjectCard({ project }) {
  const { id, title, subtitle, type, demoVideo, poster } = project;
  const videoRef = useRef(null);

  const handleMouseEnter = () => {
    videoRef.current?.play();
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <Link
      to={`/project/${id}`}
      className={styles.card}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <video
        ref={videoRef}
        src={demoVideo}
        poster={poster}
        muted
        loop
        playsInline
        preload="metadata"
        className={styles.media}
      />

      <div className={styles.info}>
        <h3 className={styles.title}>{title}</h3>
        <span className={styles.type}>{type}</span>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>
    </Link>
  );
}

export default ProjectCard;
