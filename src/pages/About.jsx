import { useState, useEffect, useRef } from "react";
import styles from "./About.module.css";
import h1 from "../assets/h1.jpg";
import h2 from "../assets/h2.jpg";
import h3 from "../assets/h3.jpg";
import h4 from "../assets/h4.jpg";
import p2 from "../assets/p2.jpg";
import p3 from "../assets/p3.jpg";
import p6 from "../assets/p6.jpg";

const STRENGTHS = [
  {
    key: "thorough",
    label: "Thorough",
    tagline: "An empty page doesn't stay empty — not on my watch.",
    detail:
      "GalleryReservation 프로젝트에서 비어있던 하단 페이지를 발견하고, 지도(Map API) 연동과 페이지 개발을 직접 채워 넣었습니다.",
    image: h1,
  },
  {
    key: "proactive",
    label: "Proactive",
    tagline: "I don't wait to be asked — I see the gap and step in.",
    detail:
      "WorkSync에서 프론트엔드를 맡았지만, 백엔드 인원이 비었을 때는 먼저 나서서 보조하며 공백을 채웠습니다.",
    image: h2,
  },
  {
    key: "resourceful",
    label: "Resourceful",
    tagline: "When there's no ready-made way, I build one myself.",
    detail:
      "채용 공고를 일일이 확인하는 대신, Python과 Selenium으로 용인 인근 신입 개발자 채용 공고를 자동 수집하는 크롤링 파이프라인을 직접 만들었습니다.",
    image: h3,
  },
  {
    key: "persistent",
    label: "Persistent",
    tagline: "I finish what I start — even when I have to take it apart first.",
    detail:
      "저장 공간이 부족해지자 컴퓨터 본체를 직접 해체해 SSD를 설치했고, 지금까지 문제없이 사용하고 있습니다.",
    image: h4,
  },
];

const SKILLS = [
  {
    category: "개발 기술",
    items: ["JavaScript", "Java", "Python", "React", "Spring Boot 3"],
    desc: "다양한 언어와 프레임워크로 프론트엔드와 백엔드를 넘나들며 작업합니다.",
  },
  {
    category: "스타일링 및 마크업",
    items: [
      "HTML5 시맨틱 마크업",
      "CSS Modules",
      "반응형 디자인",
      "웹 접근성(ARIA)",
    ],
    desc: "디자인 실무 경험을 살려, 디테일과 접근성을 모두 잡은 UI를 구현합니다.",
  },
  {
    category: "형상 관리",
    items: ["Git", "GitHub"],
    desc: "기능별로 브랜치를 나눠 작업하며 팀 프로젝트 협업을 진행했습니다.",
  },
  {
    category: "백엔드 서비스 및 배포",
    items: [
      "Spring Security",
      "JPA",
      "PostgreSQL · MySQL · Supabase",
      "AWS EC2 · Lightsail · OCI",
      "Docker",
      "GitHub Actions",
      "Vercel",
    ],
    desc: "서버 구축부터 배포·운영까지 서비스 전체 주기를 다뤄봤습니다.",
  },
];

const SKILL_STEPS = 1 + SKILLS.length;

function useScrollStep(ref, steps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let ticking = false;

    function update() {
      const el = ref.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      const progress = total > 0 ? scrolled / total : 0;
      const next = Math.min(steps - 1, Math.floor(progress * steps));

      setIndex(next);
      ticking = false;
    }

    function handleScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    update();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [ref, steps]);

  return index;
}

export default function About() {
  const [activeKey, setActiveKey] = useState(STRENGTHS[0].key);
  const active = STRENGTHS.find((s) => s.key === activeKey);

  const skillWrapRef = useRef(null);
  const skillStep = useScrollStep(skillWrapRef, SKILL_STEPS);

  return (
    <div className={styles.about}>
      <section className={styles.heroSection}>
        <p className={styles.heroLine}>
          I don&apos;t need to shine
          <img src={p2} alt="" className={styles.inlineImg} />
          from day one.
        </p>
        <p className={styles.heroLine}>
          I promise I&apos;ll never{" "}
          <img src={p3} alt="" className={styles.inlineImg} /> be the one who
          holds a team back.
        </p>
        <p className={styles.heroLine}>
          Slowly, steadily, I grow into someone who gives more
          <img src={p6} alt="" className={styles.inlineImg} />
          than I take.
        </p>
        <p className={styles.heroSub}>
          저는 팀의 가치를 높이는 든든한 존재가 될 자신이 있습니다. 팀에 짐이
          되지 않고 언제나 제 몫 이상을 해내겠습니다.
          <br />
          당장 화려하진 않더라도, 묵묵히 내실을 다져 받은 것보다 더 많이
          돌려주는 개발자가 되겠습니다.
        </p>
      </section>

      <section className={styles.strengthSection}>
        <div className={styles.strengthList}>
          {STRENGTHS.map((s, i) => (
            <button
              key={s.key}
              type="button"
              className={`${styles.strengthItem} ${
                activeKey === s.key ? styles.strengthItemActive : ""
              }`}
              onClick={() => setActiveKey(s.key)}
              aria-pressed={activeKey === s.key}
            >
              <span className={styles.strengthIndex}>
                {String(i + 1).padStart(2, "0")}
              </span>
              {s.label}
            </button>
          ))}
        </div>

        <div className={styles.strengthDetail}>
          <div
            className={styles.strengthImage}
            style={
              active.image
                ? { backgroundImage: `url(${active.image})` }
                : undefined
            }
          />
          <p className={styles.strengthTagline}>{active.tagline}</p>
          <p className={styles.strengthText}>{active.detail}</p>
        </div>
      </section>

      <section
        className={styles.skillSection}
        ref={skillWrapRef}
        style={{ height: `${SKILL_STEPS * 100}vh` }}
      >
        <div className={styles.skillSticky}>
          <div className={styles.starsLayer1}></div>
          <div className={styles.starsLayer2}></div>
          <div className={styles.starsLayer3}></div>

          <div className={styles.skillContent}>
            <div
              className={`${styles.skillPane} ${
                skillStep === 0 ? styles.skillPaneActive : ""
              }`}
            >
              <h2 className={styles.skillMain}>BUILT TO SHIP</h2>
              <p className={styles.skillSub}>
                기획부터 배포까지, 혼자서도 완성할 수 있는 능력을 갖췄습니다.
              </p>
            </div>

            {SKILLS.map((sk, i) => (
              <div
                key={sk.category}
                className={`${styles.skillPane} ${
                  skillStep === i + 1 ? styles.skillPaneActive : ""
                }`}
              >
                <h3 className={styles.skillCategory}>{sk.category}</h3>
                <ul className={styles.skillItems}>
                  {sk.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <p className={styles.skillDesc}>{sk.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.starHero}>
        <div className={styles.starsLayer1}></div>
        <div className={styles.starsLayer2}></div>
        <div className={styles.starsLayer3}></div>

        <div className={styles.introCard}>
          <span className={styles.role}>Let's build something together.</span>
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
              <a
                href="https://app.notion.com/p/3b26e780c0d080bfa37adae3aa493ec2?source=copy_link"
                className={styles.linkTag}
                target="_blank"
                rel="noopener noreferrer"
              >
                Resume
              </a>
              <a
                href="https://app.notion.com/p/3b26e780c0d080bfa37adae3aa493ec2?source=copy_link"
                className={styles.linkValue}
                target="_blank"
                rel="noopener noreferrer"
              >
                이력서 보기
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
