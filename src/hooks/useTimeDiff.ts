import { useState, useEffect } from 'react';

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
        `${days.toString().padStart(2, '0')}:${hours
          .toString()
          .padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds
          .toString()
          .padStart(2, '0')}`
      );
    }, 1000);

    return () => clearInterval(intervalId);
  }, [referenceTime]);

  return timeDiff;
};
