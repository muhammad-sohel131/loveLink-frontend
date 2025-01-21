import React from 'react'
import Slider from './Slider/Slider'
import ProfileCards from './ProfileCards/ProfileCards'
import HowWorks from './HowWorks/HowWorks'

export default function Home() {
  return (
    <div>
      <Slider></Slider>
      <ProfileCards />
      <HowWorks/>
    </div>
  )
}
