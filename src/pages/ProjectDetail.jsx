import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import projects from "../data/projects";
import styles from "./ProjectDetail.module.css";

function ProjectDetail() {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);
  const [openId, setOpenId] = useState(null);

  if (!project) return <div>프로젝트를 찾을 수 없습니다.</div>;

  const {
    title,
    subtitle,
    period,
    type,
    description,
    features,
    contribution,
    stack,
    github,
    figma,
    demo,
    troubleshooting,
  } = project;

  const toggleTrouble = (troubleId) => {
    setOpenId((prev) => (prev === troubleId ? null : troubleId));
  };

  return (
    <div className={styles.page}>
      <Link to="/project" className={styles.backButton}>
        ←
      </Link>
      <div className={styles.header}>
        <span className={styles.type}>{type}</span>
      </div>
      <h1 className={styles.title}>{title}</h1>

      <div className={styles.description}>
        {description.map((line, i) => (
          <p key={i}>
            {line.map((segment, j) =>
              segment.highlight ? (
                <span key={j} className={styles.highlight}>
                  {segment.text}
                </span>
              ) : (
                <span key={j}>{segment.text}</span>
              ),
            )}
          </p>
        ))}
      </div>

      <section className={styles.infoSection}>
        <h2 className={styles.infoTitle}>주요 정보 및 링크</h2>

        <dl className={styles.infoTable}>
          <div className={styles.infoRow}>
            <dt className={styles.infoLabel}>기간</dt>
            <dd className={styles.infoValue}>{period}</dd>
          </div>

          <div className={styles.infoRow}>
            <dt className={styles.infoLabel}>주요 기능</dt>
            <dd className={styles.infoValue}>{features}</dd>
          </div>

          <div className={styles.infoRow}>
            <dt className={styles.infoLabel}>주요 기술</dt>
            <dd className={styles.infoValue}>{stack.join(", ")}</dd>
          </div>

          <div className={styles.infoRow}>
            <dt className={styles.infoLabel}>기여도</dt>
            <dd className={styles.infoValue}>{contribution}</dd>
          </div>

          <div className={styles.infoRow}>
            <dt className={styles.infoLabel}>깃허브</dt>
            <dd className={styles.infoValue}>
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.infoLinkTag}
              >
                깃허브 URL
              </a>
            </dd>
          </div>

          {figma && (
            <div className={styles.infoRow}>
              <dt className={styles.infoLabel}>Figma</dt>
              <dd className={styles.infoValue}>
                <a
                  href={figma}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.infoLinkTag}
                >
                  와이어프레임 URL
                </a>
              </dd>
            </div>
          )}

          <div className={styles.infoRow}>
            <dt className={styles.infoLabel}>URL</dt>
            <dd className={styles.infoValue}>
              <a
                href={demo}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.infoLinkTag}
              >
                배포 URL
              </a>
            </dd>
          </div>
        </dl>
      </section>

      {troubleshooting && troubleshooting.length > 0 && (
        <section className={styles.infoSection}>
          <h2 className={styles.infoTitle}>트러블슈팅</h2>

          <div className={styles.infoTable}>
            {troubleshooting.map((item) => {
              const isOpen = openId === item.id;
              return (
                <div key={item.id} className={styles.troubleRow}>
                  <button
                    type="button"
                    className={styles.troubleButton}
                    onClick={() => toggleTrouble(item.id)}
                    aria-expanded={isOpen}
                    aria-controls={`trouble-content-${item.id}`}
                  >
                    <span>{item.title}</span>
                    <span
                      className={isOpen ? styles.chevronOpen : styles.chevron}
                      aria-hidden="true"
                    >
                      ▾
                    </span>
                  </button>

                  {isOpen && (
                    <div
                      id={`trouble-content-${item.id}`}
                      className={styles.troubleContent}
                    >
                      <p>
                        <strong>문제</strong> {item.problem}
                      </p>

                      {item.cause && (
                        <p>
                          <strong>원인</strong> {item.cause}
                        </p>
                      )}

                      <p>
                        <strong>해결</strong> {item.solution}
                      </p>

                      {item.code && (
                        <pre className={styles.troubleCode}>
                          <code>{item.code}</code>
                        </pre>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}

export default ProjectDetail;
