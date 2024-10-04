import Committee from '@/components/Committee'
import Team from '@/components/Team'
import React from 'react'

function page() {
  return (
    <div className="flex flex-col">
      
      <Committee />
      <Team />
    </div>
  )
}

export default page