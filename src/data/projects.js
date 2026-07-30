const projects = [
  {
    id: "1",
    title: "WorkSync",
    subtitle: "사내 협업 플랫폼",
    period: "2026.05 ~ 2026.06",
    type: "팀 프로젝트",
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
    contribution: "35%",
    stack: ["Spring Boot", "Thymeleaf", "AWS EC2", "Docker", "GitHub Actions"],
    github: "https://github.com/leeyu-ri/GalleryReservation",
    demoVideo: "/GalleryReservation.mp4",
    poster: "/GalleryReservation2.png",
    demo: "http://13.125.228.1",
  },
];

export default projects;
