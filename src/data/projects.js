const projects = [
  {
    id: "1",
    title: "WorkSync",
    subtitle: "사내 협업 플랫폼",
    period: "2026.05 ~ 2026.06",
    type: "팀 프로젝트",
    troubleshooting: [
      {
        id: "ts-1",
        title: "프론트엔드 API URL 하드코딩 문제 (localhost:8080)",
        problem:
          "로컬 개발 환경에서 http://localhost:8080/api로 하드코딩된 API 주소가 14개 파일에 산재해 있어, 배포 후 프론트엔드가 서버 API 대신 로컬호스트로 요청을 보내는 문제가 발생했습니다.",
        solution:
          "Nginx에서 /api 경로를 백엔드(localhost:8080)로 프록시하도록 설정하고, 프론트엔드의 모든 BASE_URL을 /api(상대 경로)로 통일했습니다.",
        code: `// Before
const BASE_URL = "http://localhost:8080/api";

// After
const BASE_URL = "/api";`,
      },
      {
        id: "ts-2",
        title: "WebSocket CORS 오류 (403 Forbidden)",
        problem:
          "배포 후 WebSocket(STOMP) 연결 시 403 에러가 발생했습니다. 실시간 메신저, 알림 등 WebSocket 기반 기능이 전혀 동작하지 않았습니다.",
        cause:
          "WebSocketConfig의 setAllowedOrigins가 환경변수 FRONTEND_URL을 참조하는데, 서버에 설정된 값이 http://3.39.166.21:5173(개발용)으로 남아 있어 https://worksync.kr에서 보내는 요청이 차단됐습니다.",
        solution:
          "systemd 서비스 파일의 환경변수를 실제 도메인으로 수정했습니다.",
        code: `FRONTEND_URL=https://worksync.kr`,
      },
      {
        id: "ts-3",
        title: "Nginx 정적 파일 권한 오류 (500 Internal Server Error)",
        problem:
          "배포 후 사이트 접속 시 500 에러가 발생했습니다. Nginx 에러 로그에 Permission denied가 찍혀 있었습니다.",
        cause:
          "Nginx 프로세스가 /home/ubuntu 디렉토리에 접근할 권한이 없어 프론트엔드 빌드 결과물(dist/)을 읽지 못했습니다.",
        solution: "홈 디렉토리 및 빌드 디렉토리에 실행 권한을 부여했습니다.",
        code: `sudo chmod 755 /home/ubuntu
sudo chmod -R 755 /home/ubuntu/WorkSync/frontend/dist`,
      },
      {
        id: "ts-4",
        title: "GitHub Actions 빌드 타임아웃",
        problem:
          "초기 CI/CD 구성 시 EC2 서버에서 직접 빌드(./gradlew build)를 실행했더니 메모리 부족(OOM)으로 프로세스가 강제 종료되거나, 빌드 시간이 10분을 초과해 타임아웃이 발생했습니다.",
        solution:
          "빌드를 EC2가 아닌 GitHub Actions 러너에서 수행하고, 완성된 JAR 파일과 프론트엔드 빌드 결과물만 SCP로 서버에 전송하는 방식으로 전환했습니다.",
        code: `GitHub Actions Runner
  ├─ ./gradlew build -x test  → worksync.jar 생성
  ├─ npm run build             → dist/ 생성
  └─ SCP → EC2 전송 → systemd restart`,
      },
      {
        id: "ts-5",
        title: "로그인 계정 잠금 문제",
        problem:
          "테스트 중 비밀번호를 여러 번 틀려 계정이 잠기는 현상이 발생했습니다. (locked_until 컬럼에 미래 시각이 저장되어 로그인 불가)",
        solution: "Supabase에서 직접 잠금 상태를 초기화했습니다.",
        code: `UPDATE employee SET locked_until = NULL, login_fail_count = 0;`,
      },
      {
        id: "ts-6",
        title: "메신저 대화 목록 실시간 갱신 안 됨",
        problem:
          "새 메시지가 도착해도 왼쪽 대화 목록에 즉시 반영되지 않고 새로고침을 해야 나타났습니다. 메시지 내용은 WebSocket으로 실시간 수신되는데 대화 목록은 갱신되지 않았습니다.",
        cause:
          "대화 목록은 페이지 최초 로드 시 1회만 API로 불러오고, WebSocket의 unread 이벤트 핸들러가 기존 방의 안읽음 수만 업데이트할 뿐 새 방을 목록에 추가하는 로직이 없었습니다.",
        solution:
          "unread 이벤트 수신 시 목록에 없는 roomId가 감지되면 대화 목록 전체를 재조회하도록 수정했습니다.",
        code: `setConversation((prev) => {
  const exists = prev.some((conv) => conv.id === roomId);
  if (!exists) {
    getChatRoom(accessToken).then((data) => {
      setConversation(Array.isArray(data.data) ? data.data : []);
    });
    return prev;
  }
  return prev.map((conv) =>
    conv.id === roomId ? { ...conv, unreadCount } : conv
  );
});`,
      },
      {
        id: "ts-7",
        title: "JWT 토큰 유실로 인한 자동 로그아웃",
        problem:
          "새로고침 시 메모리(useState)에 저장된 Access Token이 소실되어 이후 모든 API 요청이 401 오류를 반환하며 자동 로그아웃되는 문제가 발생했습니다.",
        cause:
          "Access Token을 React 상태(메모리)에만 보관해 페이지 새로고침 시 상태가 초기화되면서 토큰이 사라졌습니다.",
        solution:
          "Refresh Token을 localStorage에 저장하고, 앱 초기화 시 자동으로 Access Token을 재발급받도록 수정했습니다.",
        code: `// 앱 초기화 시 Refresh Token으로 Access Token 재발급
useEffect(() => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (refreshToken) {
    axios.post("/api/auth/token/refresh", { refreshToken })
      .then((res) => setAccessToken(res.data.accessToken));
  }
}, []);`,
      },
      {
        id: "ts-8",
        title: "WebSocket 연결 시 Spring Security 401 오류",
        problem:
          "STOMP 핸드셰이크 과정에서 JWT 헤더가 전달되지 않아 Spring Security 인증에 실패하며 WebSocket 연결이 거부됐습니다. 실시간 채팅 및 알림 기능 전체가 동작하지 않았습니다.",
        cause:
          "일반 HTTP 요청과 달리 WebSocket 연결은 Spring Security 필터를 거치지 않아 토큰 검증 로직이 적용되지 않았습니다. 클라이언트도 STOMP 연결 시 Authorization 헤더를 포함하지 않고 있었습니다.",
        solution:
          "클라이언트의 connectHeaders에 Authorization 헤더를 추가하고, 서버에서 ChannelInterceptor로 STOMP 연결 시 토큰을 직접 검증하도록 수정했습니다.",
        code: `// 클라이언트: STOMP 연결 시 JWT 헤더 포함
const client = new Client({
  connectHeaders: { Authorization: \`Bearer \${accessToken}\` },
});

// 서버: ChannelInterceptor로 토큰 검증
@Override
public Message<?> preSend(Message<?> message, MessageChannel channel) {
    StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);
    if (StompCommand.CONNECT.equals(accessor.getCommand())) {
        String token = accessor.getFirstNativeHeader("Authorization");
        jwtProvider.validateToken(token.replace("Bearer ", ""));
    }
    return message;
}`,
      },
      {
        id: "ts-9",
        title: "대시보드 다중 조회 시 N+1 쿼리 성능 저하",
        problem:
          "대시보드 진입 시 결재·업무·근태·알림을 개별 API로 각각 조회하면서 연관관계 지연 로딩이 반복 실행되어 응답 속도가 약 3배 저하됐습니다.",
        cause:
          "각 도메인 서비스가 목록을 전부 조회한 뒤 애플리케이션 레벨에서 카운팅하는 방식이어서 불필요한 쿼리가 다수 발생했습니다.",
        solution:
          "countBy 쿼리를 분리하고 DashboardResponse DTO에 필요한 집계값만 담아 단건으로 처리했습니다.",
        code: `// 집계값만 단건 조회
public DashboardResponse getDashboard(Long employeeId) {
    long pendingApprovals  = approvalLineRepository.countByApproverIdAndStatus(employeeId, WAITING);
    long myTasks           = taskRepository.countByAssigneeIdAndStatusNot(employeeId, DONE);
    long unreadNotifications = notificationRepository.countByReceiverIdAndIsReadFalse(employeeId);
    AttendanceStatus todayStatus = attendanceRepository.findTodayStatus(employeeId);
    return new DashboardResponse(pendingApprovals, myTasks, unreadNotifications, todayStatus);
}`,
      },
    ],
    description: [
      [
        {
          text: "결재·근태·게시판·메신저·업무 현황을 한 화면에서 확인할 수 있는 ",
        },
        { text: "사내 통합 업무 플랫폼", highlight: true },
        { text: "입니다." },
      ],
      [
        { text: "JWT 인증", highlight: true },
        { text: "으로 로그인 상태 확인 및 사번 기반 사용자 관리" },
      ],
      [
        { text: "결재 양식 선택과 " },
        { text: "결재선에 따른 검토·승인·참조 단계", highlight: true },
        { text: " 처리 지원" },
      ],
      [
        { text: "휴가 신청과 " },
        { text: "결재 문서 연동", highlight: true },
        { text: " 처리" },
      ],
      [
        { text: "부서 지정 업무 생성과 " },
        { text: "진행 상태 관리", highlight: true },
      ],
      [
        { text: "게시판에 " },
        { text: "파일 첨부 및 공유", highlight: true },
        { text: " 기능 제공" },
      ],
      [
        { text: "이벤트 발생 시 " },
        { text: "실시간 알림", highlight: true },
        { text: "으로 처리 현황 확인" },
      ],
      [
        { text: "Figma로 " },
        { text: "와이어프레임 설계와 공통 컴포넌트 UI 검수", highlight: true },
        { text: "를 진행" },
      ],
      [
        { text: "사내 시스템을 " },
        {
          text: "직접 설계 및 구축 해보고자 하는 학습 목적의 개발",
          highlight: true,
        },
      ],
    ],
    features: "전자결재, 연차 관리, 업무 관리, 게시판 프론트엔드 구현",
    contribution: "40%",
    stack: ["React", "Spring Boot", "Supabase", "OCI"],
    github: "https://github.com/leeyu-ri/WorkSync",
    figma:
      "https://www.figma.com/design/WnMtbKK7Ys3FhOjMdb8Ucq/%EA%B7%B8%EB%A3%B9%EC%9B%A8%EC%96%B4-%EC%8B%9C%EC%8A%A4%ED%85%9C---%EC%82%AC%EB%82%B4-%EB%A9%94%EC%8B%A0%EC%A0%80--%EB%B3%B5%EC%82%AC-?node-id=281-3558",
    demoVideo: "/WorkSyncDemo.mp4",
    poster: "/WorkSyncMain2.png",
    demo: "https://worksync.kr/",
  },
  {
    id: "2",
    title: "GalleryReservation",
    subtitle: "갤러리 예약 시스템",
    period: "2026.03 ~ 2026.04.08",
    type: "팀 프로젝트",
    troubleshooting: [
      {
        id: "ts-1",
        title: "로그아웃 시 500 에러 — Spring Security 6 CSRF Lazy Loading",
        problem:
          "로그인 후 메인 화면에서 로그아웃 버튼을 클릭하면 500 Internal Server Error가 발생했습니다. 로컬 환경에서 간헐적으로 재현되었고, 특히 HTML 파일 내 CSS 코드가 많을 때 발생 빈도가 높았습니다.",
        cause:
          "Spring Security 6은 CSRF 토큰을 지연(Lazy) 방식으로 생성합니다. 요청이 들어왔을 때 CSRF 토큰 객체를 즉시 쿠키에 담지 않고, 토큰 값을 실제로 참조하는 시점에 응답 쿠키(XSRF-TOKEN)를 발급합니다. 그런데 HTML 내 인라인 CSS가 과도하게 많아 Thymeleaf 렌더링 시간이 길어지면서 응답 버퍼가 먼저 flush되어 Set-Cookie 헤더가 브라우저에 전달되지 않는 타이밍 문제가 발생했고, 로그아웃 POST 요청에 CSRF 토큰이 없거나 불일치하여 Security 필터에서 차단되면서 500 응답으로 이어졌습니다.",
        solution:
          "인라인 CSS를 전부 외부 .css 파일로 분리하여 렌더링 부하를 줄이고, CSRF 쿠키가 응답에 정상 포함되도록 수정했습니다. 추가로 Security 설정에 OncePerRequestFilter를 구현한 CsrfCookieFilter를 등록하여 렌더링 전에 CSRF 토큰을 강제로 초기화함으로써 재발을 방지했습니다. 이 과정에서 응답 버퍼 flush 타이밍이 보안 동작에 영향을 줄 수 있고, HTML 렌더링 최적화가 단순한 성능 문제를 넘어 보안 동작에도 영향을 준다는 점을 배웠습니다.",
        code: `// CsrfCookieFilter — 렌더링 전 CSRF 토큰 강제 로드
public class CsrfCookieFilter extends OncePerRequestFilter {
    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        CsrfToken csrfToken = (CsrfToken) request.getAttribute(CsrfToken.class.getName());
        csrfToken.getToken(); // 강제 참조 → 쿠키 즉시 발급
        filterChain.doFilter(request, response);
    }
}`,
      },
      {
        id: "ts-2",
        title:
          "Member ↔ Reservation 양방향 매핑 시 Hibernate AnnotationException 발생",
        problem:
          "애플리케이션 기동 시 org.hibernate.AnnotationException: mappedBy reference an unknown target entity property 예외가 발생하며 서버가 시작되지 않았습니다.",
        cause:
          'Member 엔티티에서 Reservation과의 관계를 선언할 때 @OneToMany(mappedBy = "member")로 작성했으나, Reservation 엔티티의 실제 필드명이 member가 아닌 memberEntity로 선언되어 있었습니다. JPA는 mappedBy 값을 통해 연관된 엔티티의 실제 필드명을 찾기 때문에 이름이 불일치하면 매핑 자체가 실패합니다.',
        solution:
          "Reservation 엔티티의 필드명을 memberEntity에서 member로 통일하고, 팀 전체가 ERD를 다시 검토하여 연관관계 방향과 필드 네이밍 규칙을 사전에 합의했습니다. 이 과정에서 mappedBy가 단순한 문자열이 아니라 상대 엔티티의 실제 필드명 그 자체라는 것과, 팀 협업 시 네이밍 컨벤션을 미리 정의하고 공유하는 것의 중요성을 배웠습니다.",
        code: `// Member.java — mappedBy 값과 실제 필드명 불일치
@OneToMany(mappedBy = "member")  // ← "member"를 찾으나
private List<Reservation> reservations;

// Reservation.java — 수정 전 필드명
@ManyToOne
@JoinColumn(name = "member_id")
private Member memberEntity;  // ← "memberEntity"로 선언되어 있었음

// Reservation.java — 수정 후 (필드명 일치)
@ManyToOne
@JoinColumn(name = "member_id")
private Member member;  // mappedBy = "member" 와 일치`,
      },
      {
        id: "ts-3",
        title: "AWS 배포 후 소셜 로그인 성공해도 로그인 페이지로 리다이렉트",
        problem:
          "로컬 환경에서는 카카오·네이버 소셜 로그인이 정상 동작했으나, AWS EC2 배포 후 팀원 전원이 소셜 로그인 시도 시 DB 저장까지는 완료되지만 로그인 성공 후 메인 페이지(/)가 아닌 로그인 페이지(/member/login)로 다시 리다이렉트되는 현상이 발생했습니다.",
        cause:
          "에러 로그에 'null value in column created_at violates not-null constraint'가 기록되어 있었습니다. Member 엔티티에 @PrePersist 어노테이션이 누락되어 있어 소셜 로그인 시 신규 사용자를 DB에 저장할 때 created_at 컬럼에 null이 들어가 PostgreSQL의 NOT NULL 제약 조건을 위반했고, CustomOAuth2UserService 내부에서 예외가 발생해 OAuth2 흐름 자체가 실패했습니다. 로컬에서는 이미 테스트 계정이 존재해 findByEmail()로 기존 사용자를 조회했기 때문에 새로운 INSERT가 발생하지 않아 재현되지 않았습니다.",
        solution:
          "@PrePersist 어노테이션을 추가하여 엔티티가 처음 저장되는 시점에 createdAt이 자동으로 세팅되도록 수정했습니다. 이 과정에서 로컬과 배포 환경의 DB 상태 차이로 버그가 숨겨질 수 있다는 것과, 배포 환경에서 발생하는 이슈는 반드시 서버 로그를 먼저 확인해야 한다는 습관의 중요성을 배웠습니다.",
        code: `// 수정 전 — @PrePersist 누락
@Entity
public class Member {
    private LocalDateTime createdAt;

    public void onCreate() {
        this.createdAt = LocalDateTime.now();
    }
}

// 수정 후 — @PrePersist 추가
@PrePersist
public void onCreate() {
    this.createdAt = LocalDateTime.now();
}`,
      },
    ],
    description: [
      [
        {
          text: "갤러리 공간을 탐색하고 날짜·시간을 선택해 예약을 신청할 수 있는 ",
        },
        { text: "미술관 갤러리 예약 플랫폼", highlight: true },
        { text: "입니다." },
      ],
      [
        { text: "아이디·비밀번호 회원가입 또는 " },
        { text: "카카오·네이버 소셜 로그인", highlight: true },
        { text: " 지원" },
      ],
      [
        { text: "커버 이미지·위치·수용 인원 기반 " },
        { text: "갤러리 목록 탐색과 키워드 검색", highlight: true },
      ],
      [
        { text: "날짜·시간·인원 선택 예약 신청과 " },
        { text: "수용 인원 초과 검증", highlight: true },
      ],
      [
        { text: "내 예약 목록에서 " },
        { text: "대기·확정·거절·취소 상태 확인 및 취소 처리", highlight: true },
      ],
      [
        { text: "관리자의 갤러리 등록·수정과 " },
        { text: "예약 승인·거절 처리", highlight: true },
      ],
    ],
    features:
      "예약 목록/상세 조회, 예약 취소 백엔드 구현 및 프론트엔드 UX/UI 담당",
    contribution: "40%",
    stack: ["Spring Boot", "Thymeleaf", "AWS EC2", "Docker", "GitHub Actions"],
    github: "https://github.com/leeyu-ri/GalleryReservation",
    demoVideo: "/GalleryReservation.mp4",
    poster: "/GalleryReservation2.png",
    demo: "http://16.176.8.20/",
  },
  {
    id: "3",
    title: "Portfolio Website",
    subtitle: "개인 포트폴리오 웹사이트",
    period: "2026.07 ~ 진행중",
    type: "개인 프로젝트",
    description: [
      [
        { text: "제가 진행한 프로젝트와 기술 스택을 소개하는 " },
        { text: "개인 포트폴리오 웹사이트", highlight: true },
        { text: "입니다." },
      ],
      [
        { text: "IntersectionObserver 기반 " },
        { text: "스크롤 순차 fade-in 애니메이션", highlight: true },
        { text: " 적용" },
      ],
      [
        { text: "프로젝트 카드 호버 및 " },
        { text: "키보드 포커스 시 데모 영상 자동 재생", highlight: true },
      ],
      [
        { text: "프로젝트 상세 페이지에 " },
        { text: "아코디언 형태의 트러블슈팅 섹션", highlight: true },
        { text: " 구성" },
      ],
      [
        { text: "About 페이지에 " },
        { text: "캔버스 기반 별 배경 애니메이션", highlight: true },
        { text: " 직접 구현" },
      ],
      [
        { text: "alt, aria-label, 키보드 포커스 대응 등 " },
        { text: "웹 접근성", highlight: true },
        { text: " 고려" },
      ],
      [
        { text: "기획부터 디자인, 개발, 배포까지 " },
        { text: "전 과정을 스스로 진행", highlight: true },
        { text: "한 프로젝트입니다." },
      ],
    ],
    features:
      "Home 스크롤 애니메이션, 프로젝트 카드 UI, 상세 페이지 아코디언, About 페이지 배경 애니메이션 직접 기획 및 구현",
    contribution: "100%",
    stack: ["React", "Vite", "React Router", "CSS Modules"],
    github: "https://github.com/leeyu-ri/portfolio",
    demoVideo: "/MyPortfolio.mp4",
    poster: "/MyPortfolio2.png",
    demo: "https://leeyuri-portfolio.vercel.app/",
  },
];

export default projects;
