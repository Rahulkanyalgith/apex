import React from 'react';
import Logo from "@/public/LogoBlack.png";
import Link from 'next/link';
import Image from 'next/image';

function Footer() {
  return (
    <div className="flex flex-col items-center justify-center w-full pb-10 bg-gradient-to-b from-white via-green-50 to-green-200 pt-14 md:p-10 lg:p-20">
      <div className="flex flex-col w-11/12 gap-10">
        <div className="flex flex-col items-center justify-between gap-20 xl:flex-row">
          <Link href="/" className="flex items-start w-full xl:w-auto">
            <Image
              src={Logo}
              quality={100}
              width={200}
              fetchPriority="high"
              priority={true}
              loading="eager"
              alt="Apex Mun"
              className="transition-transform transform hover:scale-105"
            />
          </Link>

          <div className="flex flex-col items-start w-full gap-4 xl:w-auto">
            <h1 className="text-2xl font-black text-gray-800">Our Sitemap</h1>
            <div className="flex flex-col items-start gap-4 xl:gap-10 xl:items-center xl:flex-row">
              <Link className="text-xl font-medium text-gray-600 transition-colors hover:text-gray-900" href="/">Home</Link>
              <Link className="text-xl font-medium text-gray-600 transition-colors hover:text-gray-900" href="/Committee">Committees</Link>
              <Link className="text-xl font-medium text-gray-600 transition-colors hover:text-gray-900" href="/ReachUs">Reach Us</Link>
              <Link className="text-xl font-medium text-gray-600 transition-colors hover:text-gray-900" href="/Register">Register</Link>
            </div>
          </div>
        </div>

        <div className="w-full h-1 my-6 border-b border-gray-500"></div>
        <div className="flex flex-col items-center justify-between gap-2 lg:flex-row">
          <div className="font-semibold text-gray-600 md:text-xl">Copyright ©  · All Rights Reserved</div>
          <div className="font-semibold text-gray-600 md:text-xl">Built By Apex MUN.co</div>
        </div>
      </div>
    </div>
  );
}

export default Footer;