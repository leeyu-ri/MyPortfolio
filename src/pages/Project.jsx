import ProjectCard from "../components/ProjectCard";
import projects from "../data/projects";

function Project() {
  return (
    <div>
      <h1>Project 페이지</h1>
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}

export default Project;
