import React, { forwardRef, useImperativeHandle, useState, useEffect } from 'react';

const Timer = forwardRef(({ onTimeEnd, isRunning, initialTime = 1800 }, ref) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  
  useImperativeHandle(ref, () => ({
    resetTimer: () => setTimeLeft(initialTime),
    getTimeLeft: () => timeLeft
  }));
  
  useEffect(() => {
    let interval = null;
    
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prevTime => {
          if (prevTime <= 1) {
            clearInterval(interval);
            onTimeEnd();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft, onTimeEnd]);
  
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  return (
    <div className="text-brown font-bold text-xl">
      {formatTime(timeLeft)}
    </div>
  );
});

export default Timer;

