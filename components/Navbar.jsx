"use client"
import Image from 'next/image'
import React from 'react'
import Logo from "@/public/LogoBlack.png"
import Link from 'next/link'
import { MenuIcon } from 'lucide-react'
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from './ui/sheet'

function Navbar() {
  return (
    <div className="flex items-center justify-center w-full p-6 bg-gradient-to-b to-white from-green-50">
      <div className="flex items-center justify-between w-full">
        <Link href="/">
          <Image src={Logo} quality={100} width={200} alt="Apex Mun" fetchPriority="high" priority={true} loading="eager" />
        </Link>

        <div className="flex items-center gap-4 shrink-0 lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <MenuIcon />
            </SheetTrigger>
            <SheetContent side="left" className="bg-gradient-to-b from-white via-green-50 to-white">
              <SheetTitle></SheetTitle>
              <SheetDescription></SheetDescription>
              <div className="flex flex-col items-center justify-center gap-4 h-96">
                <SheetClose asChild>
                  <Link className="text-xl font-medium text-gray-600 duration-300 hover:text-gray-900" href="/">Home</Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link className="text-xl font-medium text-gray-600 duration-300 hover:text-gray-900" href="/Committee">Committees</Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link className="text-xl font-medium text-gray-600 duration-300 hover:text-gray-900" href="/ReachUs">Reach Us</Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link className="text-xl font-medium text-gray-600 duration-300 hover:text-gray-900" href="/Register">Register</Link>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div >
      </div>

      <div className="items-center hidden gap-10 shrink-0 lg:flex">
        <Link className="text-xl font-medium text-gray-600 duration-300 hover:text-gray-900" href="/">Home</Link>
        <Link className="text-xl font-medium text-gray-600 duration-300 hover:text-gray-900" href="/Committee">Committees</Link>
        <Link className="text-xl font-medium text-gray-600 duration-300 hover:text-gray-900" href="/ReachUs">Reach Us</Link>
        <Link href="/Register" className="px-8 py-3 text-xl font-medium text-black duration-300 bg-green-400 border border-green-400 active:bg-green-400 active:border-green-400 hover:bg-transparent hover:border-green-400 rounded-tl-3xl rounded-bl-3xl rounded-tr-3xl">Register</Link>
      </div>
    </div >
  )
}

export default Navbar