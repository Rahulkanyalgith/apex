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
    <div className="flex flex-col items-center justify-center w-full min-h-screen gap-10">
      <p>Redirecting In {countdown} Seconds...</p>
      <video src="/Successful Payment.mp4" autoPlay muted playsInline width={300} loop></video>
      <h1 className="text-6xl font-black">Payment Successful!</h1>
      <Link href="/" className="p-4 text-lg font-medium bg-green-200 rounded-xl">Download Invoice</Link>
    </div>
  );
}

export default Page;
