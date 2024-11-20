"use client"
import React from 'react'

import About from '../About/page';
import AllUser from './AllUser';
import Slider from './Slider';

const HomePage = () => {
  return (
    <div>
     <About/>
     <AllUser/>
     <Slider/>
   
    </div>
  )
}

export default HomePage;