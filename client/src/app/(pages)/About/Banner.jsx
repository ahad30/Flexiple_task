import React from 'react';
import BackImage from '../../../../public/About us/About us Elements/map.png'; 
import Flag1 from '../../../../public/About us/About us Elements/Flag-1.png';
import Flag2 from '../../../../public/About us/About us Elements/Flag-2.png';
import Flag3 from '../../../../public/About us/About us Elements/Flag-3.png';
import Flag4 from '../../../../public/About us/About us Elements/Flag-4.png';
import Flag5 from '../../../../public/About us/About us Elements/Flag-5.png';
import Flag6 from '../../../../public/About us/About us Elements/Flag-6.png';
import Flag7 from '../../../../public/About us/About us Elements/Flag-7.png';
import Flag8 from '../../../../public/About us/About us Elements/Flag-8.png';
import Flag9 from '../../../../public/About us/About us Elements/Flag-9.png';

import Image from 'next/image';
import { Button } from 'antd';
import { FaArrowRight } from 'react-icons/fa6';

const Banner = () => {
    // const flags = [Flag1, Flag2, Flag3, Flag4, Flag5, Flag6, Flag7, Flag8, Flag9];

  return (
    <section className="bg-[#282EA2] text-white py-16 space-y-8 relative -z-40">
      <div className="container mx-auto text-center">
        <h1 className="text-5xl  mb-4">Hire .NET Developers: Affordable, <br/>Dedicated .NET Experts in 72 hours</h1>
        <h2 className="lg:text-xl w-[80%] mx-auto font-semibold mt-5 mb-6">

     Hire .NET developers to enhance your project's efficiency and productivity. Build dynamic web applications using ASP.NET, C#, Entity Framework, and MVC.</h2>
        <p className="text-[20px]  mb-6 lg:px-[190px]">
        Access 100+ expert NET developers, engineers and architects from Flexiple, handpicked through a 5-hour evaluation process.
        </p>
       <div>
       <Button className={`bg-white font-semibold text-[20px] text-black py-7 px-7 rounded-lg`}>
       Hire dream developers <FaArrowRight className="text-black ms-1" size={15}/></Button>
       </div>
        
      </div>

    </section>
  );
};

export default Banner;
