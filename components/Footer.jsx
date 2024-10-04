import React from 'react'
import Logo from "@/public/Logo.png"
import Link from 'next/link'
import Image from 'next/image'
import { Instagram, Linkedin } from 'lucide-react'

function Footer() {
  return (
    <div className="flex flex-col items-center justify-center w-full gap-10 p-6 py-10 bg-green-200 md:p-10">
      <div className="flex flex-col justify-between w-full gap-20 md:flex-row md:w-1/2 md:items-center md:gap-0">
        <div className="flex flex-col gap-10">
          <Link href="/" className="flex items-center">
            <Image src={Logo} quality={100} width={250} alt="Apex Mun" fetchPriority="high" priority={true} />
          </Link>
          <div className="flex flex-col items-start gap-2">
            <p className="font-medium">Providing Platforms, Raising Voices.</p>

            <div className="flex gap-4">
              <Link href="https://www.instagram.com/apex_mun_"><Instagram size={32} /></Link>
              <Link href="https://www.instagram.com/apex_mun_"><Linkedin size={32} /></Link>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="text-lg font-semibold">Our Sitemap</h1>
          <Link className="text-lg w-fit" href="/">Home</Link>
          <Link className="text-lg w-fit" href="/Committee">Committees</Link>
          <Link className="text-lg w-fit" href="/ReachUs">Reach Us</Link>
          <Link className="text-lg w-fit" href="/Register">Register</Link>
        </div>
      </div>

      <div className="w-full h-1 border-b border-black md:w-1/2"></div>
      <div className="flex flex-col items-center gap-2">
        <div className="font-medium">Copyright © 2024 · All Rights Reserved</div>
        <div className="font-medium">Built By Harshit Ostwal</div>
      </div>
    </div>
  )
}

export default Footer