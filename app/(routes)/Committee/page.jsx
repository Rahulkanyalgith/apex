import { Committees } from '@/data/Committee'
import Image from 'next/image'
import React from 'react'

function page() {
    return (
        <div className="flex flex-col items-center justify-center w-full min-h-screen py-20">
            <div className="flex flex-col w-11/12 gap-20">
                <div className="flex flex-col justify-end w-11/12 leading-none tracking-tighter">
                    <h1 className="text-[3.5rem] sm:text-[5rem] md:text-[7rem] lg:text-[9rem] font-black">Our Committees</h1>
                    <h1 className="text-[1.3rem] md:text-[2rem] font-medium">Shaping Tomorrow's Leaders 🤟</h1>
                </div>

                <div className="grid grid-cols-1 gap-10 md:grid-cols-2 2xl:grid-cols-3 w-fit">
                    {Committees.map((data, index) => (
                        <div className="relative flex flex-col h-full gap-10 p-8 duration-300 border hover:border-green-500 hover:scale-95 rounded-xl" key={index}>
                            <Image src={data.image} quality={100} alt={data.title} fetchPriority="high" priority={true} loading="eager" className="rounded-xl" />

                            <div className="flex flex-col gap-2">
                                <h1 className="text-[2rem] font-black">{data.title}</h1>
                                <p className="font-mono font-medium">{data.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default page