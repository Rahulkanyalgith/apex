import Image from 'next/image'
import React from 'react'
import Logo from "@/public/Logo.png"
import Link from 'next/link'
import { Menu } from 'lucide-react'

function Navbar() {
  return (
    <div className="flex items-center justify-between p-6 md:justify-around">
      <Link href="/">
        <Image src={Logo} quality={100} width={200} alt="Apex Mun" fetchPriority="high" priority={true} />
      </Link>

      <div className="block md:hidden">
        <Menu size={32}/>
      </div>

      <div className="items-center hidden gap-10 md:flex">
        <Link className="text-lg" href="/">Home</Link>
        <Link className="text-lg" href="/Committee">Committees</Link>
        <Link className="text-lg" href="/ReachUs">Reach Us</Link>
        <Link href="/Register" className="px-8 py-3 text-lg font-medium text-black duration-300 bg-green-200 border border-green-200 active:bg-green-200 active:border-green-200 hover:bg-white hover:border-green-400 rounded-tl-3xl rounded-bl-3xl rounded-tr-3xl">Register</Link>
      </div>
    </div>
  )
}

export default Navbar