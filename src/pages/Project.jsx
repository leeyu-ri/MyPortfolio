import ProjectCard from "../components/ProjectCard";
import projects from "../data/projects";
import styles from "./Project.module.css";

function Project() {
  return (
    <div className={styles.project}>
      <h1 className={styles.projectTitle}>My Project</h1>
      <p className={styles.projectSubtitle}>
        React, Spring Boot, Supabase, AWS 등을 기반으로 팀 프로젝트를
        진행했으며, 프론트엔드 구현부터 백엔드 API 개발까지 다루는 풀스택 역량을
        지속적으로 쌓아가고 있습니다.
      </p>
      <div className={styles.projectList}>
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}

export default Project;
