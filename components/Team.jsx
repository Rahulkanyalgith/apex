"use client";
import React from 'react';
import { TemaData } from '@/data/Team';
import Image from 'next/image';
import Marquee from 'react-fast-marquee';
import { BorderBeam } from './ui/border-beam';

function Team() {

    const year = new Date().getFullYear();

    return (
        <div className="flex flex-col items-center justify-center w-full min-h-screen gap-20 py-20 overflow-hidden">
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-5xl md:text-6xl">Meet Our Team</h1>
                <p>The Futures Of Apex’s {year} 🎀</p>
            </div>

            <div className="w-[90%] lg:w-3/4 overflow-hidden">
                <Marquee loop={0} delay={0} speed={20} gradient gradientColor='white' gradientWidth={100}>
                    {TemaData.map((data, index) => (
                        <div className="relative flex flex-col gap-10 p-8 mr-10 overflow-hidden duration-300 border h-fit hover:border-green-500 rounded-xl" key={index}>
                            <BorderBeam size={250} duration={12} delay={9} />
                            <Image src={data.image} alt={data.name} fetchPriority="high" priority={true} quality={100} width={300} className="rounded-xl" />
                            <div className="flex flex-col gap-2">
                                <h1 className="text-2xl font-black">{data.name}</h1>
                                <p className="text-lg font-medium">{data.role}</p>
                            </div>
                        </div>
                    ))}
                </Marquee>
            </div>
        </div>
    )
}

export default Team