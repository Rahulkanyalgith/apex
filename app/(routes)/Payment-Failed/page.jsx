"use client";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

function Page() {
  const router = useRouter();
  const initialTime = 10000;
  const [countdown, setCountdown] = useState(initialTime / 1000);

  useEffect(() => {
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

    const timer = setTimeout(() => {
      router.replace('/');
    }, initialTime);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [router, initialTime]);

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen gap-10 p-10 bg-gradient-to-b from-white via-red-100 to-white">
      <video src="/Payment Failed.mp4" autoPlay muted playsInline width={300} loop className="shadow-lg rounded-xl" />
      <h1 className="text-4xl font-black text-red-600 md:text-6xl">Payment Failed!</h1>
      <p className="text-lg font-medium text-gray-800">Redirecting in {countdown} seconds...</p>
      <Link href="/" className="px-6 py-3 mt-4 text-lg font-semibold text-white transition duration-300 bg-red-600 rounded-md hover:bg-red-700">
        Go to Home
      </Link>
    </div>
  );
}

export default Page;
