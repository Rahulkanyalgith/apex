import Image from 'next/image';
import React from 'react'
import { ReviewData } from '@/data/Review';

function Review() {

    const year = new Date().getFullYear();

    return (
        <div className="flex items-center justify-center w-full py-40">
            <div className="flex flex-col justify-center w-11/12 gap-20">
                <div className="flex flex-col items-center gap-6 leading-none">
                    <p className="text-2xl">TESTIMONIALS</p>
                    <h1 className="text-[3.5rem] text-center sm:text-[5rem] md:text-[7rem] lg:text-[9rem] font-black">What People Say</h1>
                    <p className="text-2xl">Hear From Our ApexMun'{year} Participants</p>
                    <div className="h-1 border-b-4 border-white rounded-full w-60"></div>
                </div>
                <div className="grid w-full h-full grid-cols-1 gap-10 lg:grid-cols-2 2xl:grid-cols-3">
                    {ReviewData.map((data, index) => (
                        <div key={index} className="flex flex-col gap-8 p-10 border border-black rounded-tr-[4rem] rounded-tl-[4rem] rounded-bl-[4rem]">
                            <p className="text-sm md:text-base">{data.review}</p>
                            <div className="flex items-center gap-4">
                                <Image src={data.profileImg} alt="Person" width={80} className="rounded-full" quality={100} loading={"eager"} />
                                <div className="flex flex-col">
                                    <h1 className="text-lg font-semibold md:text-xl">{data.name}</h1>
                                    <p className="text-sm font-medium md:text-base">{data.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Review