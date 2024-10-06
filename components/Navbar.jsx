"use client"
import Image from 'next/image'
import React from 'react'
import Logo from "@/public/LogoBlack.png"
import Link from 'next/link'
import { MenuIcon } from 'lucide-react'
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from './ui/sheet'

function Navbar() {
  return (
    <div className="flex items-center justify-center w-full p-6 bg-white">
      <div className="flex items-center justify-between w-full">
        <Link href="/">
          <Image src={Logo} quality={100} width={200} alt="Apex Mun" fetchPriority="high" priority={true} loading="eager" />
        </Link>

        <div className="flex items-center gap-4 shrink-0 lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <MenuIcon size={20} />
            </SheetTrigger>
            <SheetContent side="left">
              <SheetTitle></SheetTitle>
              <SheetDescription></SheetDescription>
              <SheetClose asChild>
                <Link href={"/"}>
                  <Image src={Logo} quality={100} width={200} alt="Apex Mun" fetchPriority="high" priority={true} loading="eager" />
                </Link>
              </SheetClose>
            </SheetContent>
          </Sheet>
        </div >
      </div>

      <div className="items-center hidden gap-10 shrink-0 lg:flex">
        <Link className="text-xl font-medium duration-300 hover:text-green-500" href="/">Home</Link>
        <Link className="text-xl font-medium duration-300 hover:text-green-500" href="/Committee">Committees</Link>
        <Link className="text-xl font-medium duration-300 hover:text-green-500" href="/ReachUs">Reach Us</Link>
        <Link href="/Register" className="px-8 py-3 text-xl font-medium text-black duration-300 bg-green-200 border border-green-200 active:bg-green-200 active:border-green-200 hover:bg-white hover:border-green-400 rounded-tl-3xl rounded-bl-3xl rounded-tr-3xl">Register</Link>
      </div>
    </div >
  )
}

export default Navbar