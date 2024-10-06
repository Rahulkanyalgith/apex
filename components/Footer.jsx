import React from 'react'
import Logo from "@/public/LogoBlack.png"
import Link from 'next/link'
import Image from 'next/image'

function Footer() {
  return (
    <div className="flex flex-col items-center justify-center w-full bg-green-200 rounded-br-[12rem] lg:rounded-br-full pt-14 pb-10 md:p-10 lg:p-20">
      <div className="flex flex-col w-11/12 gap-10">
        <div className="flex flex-col items-center justify-between gap-20 xl:flex-row">
          <Link href="/" className="flex items-start w-full xl:w-auto">
            <Image src={Logo} quality={100} width={200} fetchPriority="high" priority={true} loading="eager" alt="Apex Mun" />
          </Link>

          <div className="flex flex-col items-start w-full gap-4 xl:w-auto">
            <h1 className="text-2xl font-black">Our Sitemap</h1>
            <div className="flex flex-col items-start gap-4 xl:gap-10 xl:items-center xl:flex-row">
              <Link className="text-xl font-medium w-fit" href="/">Home</Link>
              <Link className="text-xl font-medium w-fit" href="/Committee">Committees</Link>
              <Link className="text-xl font-medium w-fit" href="/ReachUs">Reach Us</Link>
              <Link className="text-xl font-medium w-fit" href="/Register">Register</Link>
            </div>
          </div>
        </div>

        <div className="w-full h-1 border-b border-black"></div>
        <div className="flex flex-col items-center justify-between gap-2 lg:flex-row">
          <div className="font-semibold md:text-xl">Copyright © 2024 · All Rights Reserved</div>
        </div>
      </div>
    </div>
  )
}

export default Footer