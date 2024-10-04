import { HomeCommittee } from '@/data/Committee'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { BorderBeam } from './ui/border-beam'

function Committee() {
    return (
        <div className="flex flex-col items-center justify-center w-full min-h-screen gap-20 py-20 overflow-hidden">
            <h1 className="text-5xl text-center md:text-6xl">Committees <br className="md:hidden" />& Agendas</h1>

            <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 2xl:grid-cols-3 w-fit">
                {HomeCommittee.map((data, index) => (
                    <div className="relative flex flex-col h-full gap-10 p-8 duration-300 border hover:border-green-500 hover:scale-95 w-[280px] md:w-[360px] lg:w-[400px] rounded-xl" key={index}>
                        <Image src={data.image} quality={100} alt={data.title} fetchPriority="high" priority={true} className="rounded-xl" />
                        <BorderBeam size={250} duration={12} delay={9} />

                        <div className="flex flex-col gap-2">
                            <h1 className="text-2xl font-black">{data.title}</h1>
                            <p>{data.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
            <Link href="/Committee" className="px-10 py-3 duration-300 border border-black rounded-xl w-fit hover:border-green-200 hover:bg-green-200">Know More</Link>
        </div>
    )
}

export default Committee