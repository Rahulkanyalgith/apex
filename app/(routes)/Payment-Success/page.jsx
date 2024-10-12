"use client";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import confetti from "canvas-confetti";
import React, { useEffect, useState } from 'react';

function Page() {
  const router = useRouter();
  const initialTime = 10000; // Redirect after 10 seconds
  const [countdown, setCountdown] = useState(initialTime / 1000);

  useEffect(() => {
    // Countdown timer
    const interval = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown > 1) {
          return prevCountdown - 1;
        } else {
          clearInterval(interval);
          return 0;
        }
      });
    }, 1000);

    // Redirect after countdown
    const timer = setTimeout(() => {
      router.replace('/');
    }, initialTime);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [router, initialTime]);

  const handleClick = () => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min, max) =>
      Math.random() * (max - min) + min;

    const interval = window.setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) {
        return clearInterval(interval);
      }
      const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];
      const particleCount = 500 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        colors,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        colors,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);
  };

  const handleClick2 = () => {
    const end = Date.now() + 5 * 1000;

    const frame = () => {
      if (Date.now() > end) return;
      const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];

      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        startVelocity: 60,
        colors,
        origin: { x: 0, y: 0.5 },
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        colors,
        startVelocity: 60,
        origin: { x: 1, y: 0.5 },
      });

      requestAnimationFrame(frame);
    };

    frame();
  };

  useEffect(() => {
    handleClick2();
    const timer = setTimeout(() => {
      handleClick();
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen gap-10 p-10 bg-gradient-to-b from-white via-green-100 to-white">
      <h1 className="text-6xl font-black text-green-600">Payment Successful!</h1>
      <p className="text-lg font-medium text-gray-800">Redirecting in {countdown} seconds...</p>
      <video src="/Successful Payment.mp4" autoPlay muted playsInline width={300} loop className="shadow-lg rounded-xl" />
      <Link href="/" className="px-6 py-3 mt-4 text-lg font-medium text-white transition duration-300 bg-green-600 rounded-xl hover:bg-green-700">
        Download Invoice
      </Link>
    </div>
  );
}

export default Page;
