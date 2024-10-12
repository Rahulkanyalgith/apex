import React from 'react'
import Image from 'next/image'
import Img from "@/public/1APEX.png"
import Link from 'next/link'

function Main() {
    return (
        <div className="relative flex flex-col items-center justify-center w-full min-h-screen gap-10">
            <div className="absolute left-0 top-0 inset-0 bg-[url('/Team/Group.jpg')] blur bg-fill bg-center"></div>
            <Image src={Img} alt="Apex Mun" quality={100} loading={"eager"} draggable={false} className="z-10 w-3/4 md:w-1/3 invert" />
            <Link href="/Register" className="z-10 px-8 py-3 text-xl font-medium duration-300 bg-green-400 border border-green-400 active:bg-green-400 active:border-green-400 hover:bg-white hover:border-white rounded-tl-3xl rounded-bl-3xl rounded-tr-3xl">
                Register Now
            </Link>
        </div>

    )
}

export default Main