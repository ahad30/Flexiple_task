"use client"
import React from 'react'
import Dropdown from './Dropdown';




const Navbar = () => {

  return (
    
    <div className='bg-[#001529] text-sm p-3  sticky top-0 z-[15] text-white'>
    <div className='flex justify-end'>
    <Dropdown/>
    </div>
   </div>

  )
}

export default Navbar