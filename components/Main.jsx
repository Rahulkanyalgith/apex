import React from 'react'
import Image from 'next/image'
import Img from "@/public/Main.png"
import Link from 'next/link'

function Main() {
    return (
        <div className="relative flex flex-col items-center justify-center w-full min-h-screen gap-10">
            <div className="absolute left-0 top-0 inset-0 bg-[url('/Team/Group.jpg')] blur-sm bg-cover"></div>
            <Image src={Img} alt="Apex Mun" quality={100} loading={"eager"} width={400} draggable={false} className="z-10" />
            <Link href="/Register" className="z-10 px-8 py-3 text-xl font-medium duration-300 bg-green-200 rounded-tl-3xl rounded-bl-3xl rounded-tr-3xl">
                Register Now
            </Link>
        </div>

    )
}

export default Main