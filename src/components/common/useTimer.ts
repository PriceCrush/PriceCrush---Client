import { useState, useEffect } from 'react';

interface TimeProps {
  timeLimit: number;
}

function formatTime(timeInSeconds: number) {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds % 60;
  return {
    minutes,
    seconds,
  };
}

const useTimer = (timeLimit: number) => {
  // const { timeLimit } = props;
  const [minutes, setMinutes] = useState(formatTime(timeLimit).minutes);
  const [seconds, setSeconds] = useState(formatTime(timeLimit).seconds);
  const [timeOver, setTimeOver] = useState(false);

  const resetTimer = () => {
    setMinutes(formatTime(timeLimit).minutes);
    setSeconds(formatTime(timeLimit).seconds);
    setTimeOver(false);
  };

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(myInterval);
          setTimeOver(true);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);

    return () => {
      clearInterval(myInterval);
    };
  });
  const remainingTime = `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  return {
    remainingTime,
    timeOver,
    resetTimer,
  };
};

export default useTimer;
