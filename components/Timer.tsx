import React, { useEffect, useState } from 'react';

interface TimerProps {
  expireTime: number;
  onTimeout: () => void;
}

const TOTAL_DURATION = 15 * 60;

const Timer: React.FC<TimerProps> = ({ expireTime, onTimeout }) => {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (!expireTime) return;

    const update = () => {
      const now = Date.now();
      const secondsLeft = Math.max(Math.floor((expireTime - now) / 1000), 0);
      setTimeLeft(secondsLeft);
      if (secondsLeft <= 0) {
        clearInterval(intervalId);
        onTimeout();
      }
    };

    update(); // محاسبه اولیه
    const intervalId = setInterval(update, 1000);

    return () => clearInterval(intervalId);
  }, [expireTime, onTimeout]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const percentage = (timeLeft / TOTAL_DURATION) * 100;

  let colorClass = 'text-brand-green';
  let bgColorClass = 'bg-brand-green';

  if (percentage < 50 && percentage >= 20) {
    colorClass = 'text-yellow-400';
    bgColorClass = 'bg-yellow-400';
  } else if (percentage < 20) {
    colorClass = 'text-red-500';
    bgColorClass = 'bg-red-500';
  }

  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between items-center text-sm font-mono">
        <span className="text-gray-400">Time remaining</span>
        <span className={`${colorClass} font-bold text-lg`}>
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </span>
      </div>
      <div className="w-full bg-dark-tertiary rounded-full h-2">
        <div
          className={`${bgColorClass} h-2 rounded-full transition-all duration-1000 ease-linear`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default Timer;
