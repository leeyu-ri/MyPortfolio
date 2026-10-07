import { useEffect, useState } from "react";

/**
 * 요소를 스크롤하며 지나간 비율(0~1)을 steps개의 단계로 나눠서
 * 현재 단계 번호(0 ~ steps-1)를 돌려주는 훅
 *
 * @param {React.RefObject<HTMLElement>} ref - 관찰할 요소
 * @param {number} steps - 나눌 단계 수
 * @returns {number} 현재 단계 번호
 */

function useScrollStep(ref, steps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // 다음 프레임 계산이 이미 예약됐는지 표시 (rAF throttling)
    let ticking = false;

    function update() {
      ticking = false;

      const el = ref.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight; // 스크롤 가능한 전체 거리
      const scrolled = Math.min(Math.max(-rect.top, 0), total); // 0 ~ total로 clamp
      const progress = total > 0 ? scrolled / total : 0;

      // progress가 1일 때 steps가 되지 않도록 steps - 1로 clamp
      setIndex(Math.min(steps - 1, Math.floor(progress * steps)));
    }

    function handleScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    update(); // 스크롤 전에도 현재 위치 기준 초기값 계산

    return () => window.removeEventListener("scroll", handleScroll);
  }, [ref, steps]);

  return index;
}

export default useScrollStep;
