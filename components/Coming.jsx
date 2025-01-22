'use client';
import React, { useState, useEffect } from "react";

function Coming() {
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0, // Added seconds
  });

  useEffect(() => {
    const targetDate = new Date("2025-02-28T00:00:00");
    const updateTimer = () => {
      const now = new Date();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const seconds = Math.floor((difference / 1000) % 60); // Calculate seconds

        setTimeRemaining({ days, hours, minutes, seconds });
      } else {
        setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 }); // Timer ends
      }
    };

    updateTimer();
    const intervalId = setInterval(updateTimer, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-10 py-20 text-gray-200 bg-black">
      <div className="flex flex-col items-center gap-6">
        <h1 className="text-3xl font-black lg:text-6xl">
          COMING <span className="text-amber-400">THIS FEBRUARY</span>
        </h1>
        <div className="h-1 border-b-4 border-white rounded-full w-60"></div>
        <p className="text-sm text-center lg:text-lg">
          Biggest and Finest Conference, Join us on February
        </p>
      </div>

      <div className="flex justify-center w-full gap-14 md:gap-24">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-4xl font-medium">{timeRemaining.days}</h1>
          <p>DAYS</p>
        </div>
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-4xl font-medium">{timeRemaining.hours}</h1>
          <p>HOURS</p>
        </div>
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-4xl font-medium">{timeRemaining.minutes}</h1>
          <p>MINUTES</p>
        </div>
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-4xl font-medium">{timeRemaining.seconds}</h1>
          <p>SECONDS</p>
        </div>
      </div>
    </div>
  );
}

export default Coming;
