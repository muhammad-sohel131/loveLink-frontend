import React from 'react'
import Slider from './Slider/Slider'
import ProfileCards from './ProfileCards/ProfileCards'
import HowWorks from './HowWorks/HowWorks'
import SuccessStory from './SuccessStory/SuccessStory'
import SuccessCounter from './SuccessCounter/SuccessCounter'

export default function Home() {
  return (
    <div>
      <Slider></Slider>
      <ProfileCards />
      <HowWorks/>
      <SuccessCounter />
      <SuccessStory />
    </div>
  )
}
