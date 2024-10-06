"use client";
import { TemaData } from '@/data/Team';
import Image from 'next/image';
import Marquee from 'react-fast-marquee';
import { BorderBeam } from './ui/border-beam';
import React from 'react';

function Team() {

    const year = new Date().getFullYear();

    return (
        <div className="flex flex-col items-center justify-center w-full min-h-screen gap-20 py-20 overflow-hidden">
            <div className="flex flex-col justify-end w-11/12 leading-none tracking-tighter">
                <h1 className="text-[3.5rem] sm:text-[5rem] md:text-[7rem] lg:text-[9rem] font-black">Our Team</h1>
                <h1 className="text-[1rem] md:text-[2rem] font-medium">The Futures Of Apex’s {year} 🎀</h1>
            </div>

            <div className="w-[90%] lg:w-3/4 overflow-hidden">
                <Marquee loop={0} delay={0} speed={20} gradient={true} gradientColor={"white"} gradientWidth={100}>
                    {TemaData.map((data, index) => (
                        <div className="relative flex flex-col gap-10 p-5 ml-10 overflow-hidden duration-300 border md:p-8 h-fit rounded-xl w-fit" key={index}>
                            <BorderBeam size={250} duration={12} delay={9} />
                            <Image src={data.image} alt={data.name} fetchPriority="high" priority={true} loading="eager" quality={100} width={300} className="rounded-xl" />
                            <div className="flex flex-col gap-2 leading-none">
                                <h1 className="text-[1rem] md:text-[2rem] font-black">{data.name}</h1>
                            </div>
                        </div>
                    ))}
                </Marquee>
            </div>
        </div>
    )
}

export default Team