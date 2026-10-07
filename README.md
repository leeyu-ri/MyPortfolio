🌀 useScrollStep — 스크롤 단계 인터랙션 훅

스크롤을 내리면 이미지나 텍스트가 단계별로 바뀌는 인터랙션을 위한 커스텀 훅입니다. Home의 이미지 전환 섹션과 About의 기술 스택 섹션에서 같은 로직을 쓰고 있어, 하나의 훅으로 분리해 재사용했습니다.

사용처 단계 수 동작
SecondSection.jsx (Home) 사진 개수 (7) 스크롤에 따라 프레임 속 사진 교체
About.jsx 인트로 1 + 기술 카테고리 4 = 5 스크롤에 따라 기술 스택 패널 교체
jsx
// 사용 예시
const wrapperRef = useRef(null);
const activeIndex = useScrollStep(wrapperRef, images.length);

<div ref={wrapperRef} style={{ height: `${images.length * 70}vh` }}>
  <div style={{ position: "sticky", top: 0 }}>
    {/* activeIndex에 따라 화면 전환 */}
  </div>
</div>
동작 원리

관찰할 요소(ref)와 단계 수(steps)를 받아서, 스크롤할 때마다 요소를 얼마나 지나갔는지 0~1 비율로 계산하고, 그 비율을 steps개로 나눠 현재 몇 번째 단계인지 정수로 돌려줍니다.

요소 높이가 화면보다 길고, 안쪽 콘텐츠는 sticky로 고정

┌─────────────┐ ← rect.top = 0 progress 0.0 → 단계 0
│ viewport │
└─────────────┘
⋮ 스크롤할수록 rect.top이 음수로 커짐
┌─────────────┐
│ viewport │ progress 0.5 → 단계 2
└─────────────┘
⋮
┌─────────────┐ ← -rect.top = total progress 1.0 → 단계 4 (steps - 1)
│ viewport │
└─────────────┘
js
const rect = el.getBoundingClientRect();
const total = rect.height - window.innerHeight;
const scrolled = Math.min(Math.max(-rect.top, 0), total);
const progress = total > 0 ? scrolled / total : 0;
setIndex(Math.min(steps - 1, Math.floor(progress \* steps)));
값 의미
getBoundingClientRect() 요소의 현재 화면상 위치와 크기 (top, bottom, height 등)를 담은 객체
rect.top 요소 맨 위가 뷰포트 맨 위에서 떨어진 거리. 스크롤할수록 음수가 됨
total 스크롤할 수 있는 전체 거리 (요소 높이 − 화면 높이)
scrolled 지금까지 스크롤한 거리. 0 아래·total 위로 넘지 않도록 clamp
progress 진행 비율 0 ~ 1
Math.min(steps - 1, …) progress가 정확히 1이면 1 × 5 = 5가 되지만 유효한 인덱스는 0 ~ 4이므로 최댓값을 steps - 1로 제한
성능 최적화: requestAnimationFrame throttling

스크롤 이벤트는 1초에 수십~수백 번 발생할 수 있어, 매번 위치를 계산하면 성능이 떨어집니다. ticking 플래그와 requestAnimationFrame을 조합해 한 프레임에 계산이 한 번만 일어나도록 했습니다.

js
let ticking = false;

function handleScroll() {
if (ticking) return; // 이미 예약됐으면 무시
ticking = true;
requestAnimationFrame(update); // 다음 화면 그리기 직전에 1회 실행
}
ticking — 리렌더링과 무관한 일반 변수로, "다음 프레임 계산이 이미 예약됐는지"를 표시합니다.
requestAnimationFrame — 브라우저가 화면을 다시 그리기 직전에 콜백을 실행하는 API입니다. 그 사이 스크롤 이벤트가 100번 와도 update()는 한 번만 실행됩니다.
{ passive: true } — 리스너가 preventDefault()를 호출하지 않는다고 브라우저에 알려, 스크롤을 지연 없이 처리하게 합니다.
setIndex — 값이 이전과 같으면 React가 리렌더링을 건너뛰므로, 단계가 바뀔 때만 화면이 갱신됩니다.
생명주기 처리
js
window.addEventListener("scroll", handleScroll, { passive: true });
update();
return () => window.removeEventListener("scroll", handleScroll);
}, [ref, steps]);
코드 이유
update() 즉시 호출 스크롤 이벤트가 오기 전까지는 계산이 없으므로, 새로고침 직후에도 현재 위치에 맞는 단계를 바로 표시
cleanup 함수 페이지 이동으로 컴포넌트가 사라질 때 리스너를 해제해 메모리 누수 방지
의존성 배열 [ref, steps] 두 값 모두 고정값이라 마운트 시 한 번만 리스너를 등록
🔧 리팩토링하며 수정한 부분

1. 중복 로직 통합 SecondSection.jsx(updateIndex)와 About.jsx(useScrollStep)에 변수명만 다르고 계산식이 같은 코드가 각각 있었습니다. hooks/useScrollStep.js로 분리해 두 컴포넌트가 함께 쓰도록 바꿨고, SecondSection의 스크롤 로직 약 50줄이 한 줄로 줄었습니다.

jsx
// SecondSection.jsx
const [wrapperRef, visible] = useInView(); // 등장 애니메이션
const activeIndex = useScrollStep(wrapperRef, images.length); // 이미지 전환

하나의 ref를 두 훅이 함께 사용합니다. useInView는 "화면에 보였는지", useScrollStep은 "얼마나 지나갔는지"를 담당합니다.

2. ticking 플래그가 풀리지 않을 수 있는 문제 기존에는 ticking = false가 update() 맨 끝에 있었습니다. ref.current가 null이라 중간에 return하면 플래그가 true로 남아, 이후 스크롤 계산이 다시 예약되지 않을 수 있었습니다. 플래그 해제를 함수 맨 앞으로 옮겨 어떤 경로로 종료되든 다음 스크롤에서 계산이 이어지도록 수정했습니다.

js
function update() {
ticking = false; // ✅ 맨 앞에서 먼저 해제
const el = ref.current;
if (!el) return; // 여기서 빠져나가도 플래그는 이미 풀려 있음
...
}
