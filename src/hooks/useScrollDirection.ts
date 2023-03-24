import { useState, useEffect } from 'react';

/**
 * @description 스크롤 액션 감지 훅입니다. window객체에 scroll 이벤트 리스너를 사용합니다. 훅을 사용하는 컴포넌트가 unmount되면 이벤트를 제거합니다.
 * @returns isScrollDown {boolean} - 스크롤을 아래로 내리면 true
 */
const useScrollDirection = () => {
  const [isScrollDown, setIsScrollDown] = useState(false);

  useEffect(() => {
    let previousScrollPosition = 0;
    let currentScrollPosition = 0;

    function handleScroll() {
      currentScrollPosition = window.pageYOffset;
      if (previousScrollPosition - currentScrollPosition < 0) {
        setIsScrollDown(true);
      } else if (
        previousScrollPosition - currentScrollPosition > 0 ||
        currentScrollPosition === 0
      ) {
        setIsScrollDown(false);
      }
      previousScrollPosition = currentScrollPosition;
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return isScrollDown;
};

export default useScrollDirection;
