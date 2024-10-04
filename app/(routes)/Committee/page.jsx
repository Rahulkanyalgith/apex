import { Committees } from '@/data/Committee'
import Image from 'next/image'
import React from 'react'

function page() {
    return (
        <div className="flex flex-col items-center justify-center w-full min-h-screen gap-20 py-20">
            <h1 className="text-5xl text-center md:text-6xl">Committees <br className="md:hidden" />& Agendas</h1>

            <div className="grid grid-cols-1 gap-10 md:grid-cols-2 2xl:grid-cols-3 w-fit">
                {Committees.map((data, index) => (
                    <div className="relative flex flex-col h-full gap-10 p-8 duration-300 border hover:border-green-500 hover:scale-95 rounded-xl w-[300px] md:w-[360px] lg:w-[400px]" key={index}>
                        <Image src={data.image} quality={100} alt={data.title} fetchPriority="high" priority={true} className="rounded-xl w-[300px] md:w-[360px] lg:w-[400px]" />

                        <div className="flex flex-col gap-2">
                            <h1 className="text-lg font-semibold">{data.title}</h1>
                            <p className="text-sm">{data.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default page