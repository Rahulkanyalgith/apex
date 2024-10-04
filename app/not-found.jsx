import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-4">
            <p className="text-lg font-light">Sorry, This Page Was Not Found</p>
            <h1 className="text-9xl">404</h1>
            <Link href={"/"} className="py-2 px-6 border border-black rounded-full hover:bg-green-200 hover:text-black duration-300 flex items-centert text-lg justify-center gap-1">Back To Home <div className="-rotate-45"><ArrowRight /></div></Link>
        </div>
    )
}

export default NotFound