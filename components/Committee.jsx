import { HomeCommittee } from '@/data/Committee'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { BorderBeam } from './ui/border-beam'

function Committee() {
    return (
        <div className="flex flex-col items-center justify-center w-full min-h-screen py-20 overflow-hidden bg-gradient-to-b to-white via-green-50 from-white">
            <div className="flex flex-col w-11/12 gap-20">
                <div className="flex flex-col gap-2 leading-none tracking-tighter ">
                    <h1 className="text-[4rem] sm:text-[5rem] md:text-[7rem] lg:text-[9rem] font-black text-gray-700">Our Committees</h1>
                    <h1 className="text-[1.2rem] md:text-[2rem] font-medium shrink-0 text-gray-600">Shaping Tomorrow's Leaders 🤟</h1>
                </div>

                <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 2xl:grid-cols-3">
                    {HomeCommittee.map((data, index) => (
                        <div className="relative flex flex-col h-full gap-10 p-8 duration-300 border hover:border-neutral-500 hover:scale-95 rounded-xl" key={index}>
                            <BorderBeam size={250} duration={12} delay={9} />
                            <Image src={data.image} quality={100} alt={data.title} fetchPriority="high" priority={true} loading="eager" className="object-cover rounded-xl" />

                            <div className="flex flex-col gap-2">
                                <h1 className="text-[2rem] font-black text-gray-700">{data.title}</h1>
                                <p className="font-mono font-medium text-gray-600">{data.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-center md:justify-start">
                    <Link href="/Committee" className="px-10 py-4 font-mono font-black duration-300 border border-black rounded-xl w-fit hover:border-green-200 hover:bg-green-200">Know More</Link>
                </div>
            </div>
        </div>
    )
}

export default Committee