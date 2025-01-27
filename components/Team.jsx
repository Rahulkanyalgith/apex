"use client";
import { TemaData } from "@/data/Team";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import { BorderBeam } from "./ui/border-beam";
import React, { useState } from "react";

function Team() {
  const year = new Date().getFullYear();
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen gap-20 py-20 overflow-hidden bg-gradient-to-b to-white via-green-50 from-white">
      <div className="flex flex-col justify-end w-11/12 leading-none tracking-tighter">
        <h1 className="text-[4rem] sm:text-[5rem] md:text-[7rem] lg:text-[9rem] font-black text-gray-700">
          Our Team
        </h1>
        <h1 className="text-[1.2rem] md:text-[2rem] font-medium text-gray-600">
          The Futures Of Apex’s {year} 🎀
        </h1>
      </div>

      <div className="w-[90%] lg:w-3/4 overflow-hidden">
        {/* Marquee with dynamic pause */}
        <Marquee loop={0} delay={0} speed={100} pauseOnHover={false} pauseOnClick={false} play={!isPaused}>
          {TemaData.map((data, index) => (
            <div
              key={index}
              className="relative flex flex-col h-full gap-6 p-6 ml-10 overflow-hidden duration-300 border rounded-xl w-fit"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <BorderBeam size={250} duration={12} delay={9} />
              <Image
                src={data.image}
                alt={data.name}
                fetchPriority="high"
                priority={true}
                loading="eager"
                quality={100}
                className="object-cover w-[300px] h-[340px] rounded-xl"
              />
              <h1 className="text-[2rem] font-black text-gray-600">
                {data.name}
              </h1>
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
}

export default Team;