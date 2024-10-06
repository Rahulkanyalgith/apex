import React from 'react'

function Coming() {
  return (
    <div className="flex flex-col items-center justify-center gap-10 py-20 text-white bg-black">
      <div className="flex flex-col items-center gap-6">
        <h1 className="text-3xl font-black lg:text-6xl">COMING <span className="text-amber-400">THIS NOVEMBER</span></h1>
        <div className="h-1 border-b-4 border-white rounded-full w-60"></div>
        <p className="text-sm text-center lg:text-lg">Biggest and Finest Conference, Join us on November</p>
      </div>

      <div className="flex justify-center w-full gap-14 md:gap-24">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-4xl font-medium">34</h1>
          <p>DAYS</p>
        </div>
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-4xl font-medium">21</h1>
          <p>HOURS</p>
        </div>
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-4xl font-medium">04</h1>
          <p>MINUTES</p>
        </div>
      </div>
    </div>
  )
}

export default Coming