import { useState, useEffect } from 'react';

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
