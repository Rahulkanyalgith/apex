import About from '@/components/About'
import Coming from '@/components/Coming'
import Committee from '@/components/Committee'
import Main from '@/components/Main'
import Review from '@/components/Review'
import Team from '@/components/Team'
import React from 'react'

function page() {
  return (
    <div className="flex flex-col gap-10">
      <Main />
      <About />
      <Committee />
      <Coming />
      <Team />
      {/* <Review /> */}
    </div>
  )
}

export default page