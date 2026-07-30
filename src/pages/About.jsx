import styles from "./About.module.css";

export default function About() {
  return (
    <div className={styles.about}>
      <section className={styles.starHero}>
        <div className={styles.starsLayer1}></div>
        <div className={styles.starsLayer2}></div>
        <div className={styles.starsLayer3}></div>

        <div className={styles.introCard}>
          <span className={styles.role}>Full-Stack Developer</span>
          <h1 className={styles.name}>이유리</h1>

          <div className={styles.links}>
            <div className={styles.linkLine}>
              <span className={styles.linkTag}>Birth</span>
              <p className={styles.linkValue}>99.06.10</p>
            </div>

            <div className={styles.linkLine}>
              <span className={styles.linkTag}>Phone</span>
              <p className={styles.linkValue}>010-7734-5727</p>
            </div>

            <div className={styles.linkLine}>
              <span className={styles.linkTag}>Email</span>
              <a href="mailto:yuri7534@naver.com" className={styles.linkValue}>
                yuri7534@naver.com
              </a>
            </div>

            <div className={styles.linkLine}>
              <a
                href="https://github.com/leeyu-ri"
                target="_blank"
                rel="noreferrer"
                className={styles.linkTag}
              >
                Github
              </a>
              <a
                href="https://github.com/leeyu-ri"
                target="_blank"
                rel="noreferrer"
                className={styles.linkValue}
              >
                github.com/leeyu-ri
              </a>
            </div>

            <div className={styles.linkLine}>
              <a href="#" className={styles.linkTag}>
                Resume
              </a>
              <a href="#" className={styles.linkValue}>
                이력서 보기
              </a>
            </div>
          </div>
        </div>

        <div className={styles.scrollIndicator} aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M6 9L12 15L18 9"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </section>

      <section className={styles.content}>
        <h2 className={styles.sectionTitle}>About</h2>

        <div className={styles.introText}>
          <p>
            <span className={styles.highlight}>Frontend</span>와{" "}
            <span className={styles.highlight}>Backend</span>를 아우르는 풀스택
            개발자를 목표로 성장하고 있는 신입 개발자입니다.
          </p>
          <p>
            React와 Spring Boot 기반 팀 프로젝트를 진행하며
            <br />
            프론트엔드 구현부터{" "}
            <span className={styles.highlight}>백엔드 협업</span>까지 함께
            경험을 쌓아가고 있습니다.
          </p>
          <p>
            사용자 경험을 세심하게 다듬는 작업에 관심이 많고
            <br />
            작은 디테일이 서비스의 완성도를 결정한다고 생각합니다.
          </p>
        </div>

        <div className={styles.mindsetSection}>
          <span className={styles.mindsetLabel}>Mindset</span>
          <blockquote className={styles.mindsetQuote}>
            우물 안 개구리가 되지 말자, 내가 아는 것이 전부가 아니다.
          </blockquote>
          <p className={styles.mindsetText}>
            항상 배우는 자세로 새로운 기술과 문제를 마주하고,
            <br />
            팀원들과 함께&nbsp;
            <span className={styles.highlight}>
              더 나은 결과를 만들어가는 개발자
            </span>
            가 되고자 합니다.
          </p>
        </div>
      </section>
    </div>
  );
}
