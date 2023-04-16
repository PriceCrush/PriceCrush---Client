import { useState, useEffect } from 'react';

/**
 * @description 기준시간으로부터 현재시간까지의 차이를 구해 리턴
 * @param referenceTime 현재로부터 차이를 구할 시간
 * @returns timeDiff 현재로부터 차이를 구한 시간
 */
export const useTimeDiff = (referenceTime: string): string => {
  const [timeDiff, setTimeDiff] = useState('');

  useEffect(() => {
    const intervalId = setInterval(() => {
      const diff = new Date(referenceTime).getTime() - new Date().getTime();
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeDiff(
        `${days.toString().padStart(2, '0')}일 ${hours
          .toString()
          .padStart(2, '0')}시 ${minutes
          .toString()
          .padStart(2, '0')}분 ${seconds.toString().padStart(2, '0')}초`
      );
    }, 1000);

    return () => clearInterval(intervalId);
  }, [referenceTime]);

  return timeDiff;
};
