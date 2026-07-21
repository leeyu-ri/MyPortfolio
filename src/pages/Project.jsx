import ProjectCard from "../components/ProjectCard";
import projects from "../data/projects";
import styles from "./Project.module.css";

function Project() {
  return (
    <div className={styles.project}>
      <h1 className={styles.projectTitle}>My Project</h1>
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          className={styles.projectList}
        />
      ))}
    </div>
  );
}

export default Project;
