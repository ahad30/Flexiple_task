// BecomePartner.js
import React, { useContext } from 'react';
import Icon6 from "../../../../public/Homepage/Elements/Icon-6.png";
import Icon8 from "../../../../public/Homepage/Elements/Icon-8.png";
import Icon9 from "../../../../public/Homepage/Elements/Icon-9.png";
import Image from 'next/image';
import { PartnerContext } from '@/components/PartnerProvider';
import Link from 'next/link';


const BecomePartner = () => {
  const { setActiveTab } = useContext(PartnerContext);

  const partners = [
    {
      title: "Reseller",
      description: "Become our official reseller in your country",
      image: Icon6,
      tabIndex: 1, // Tab index for "Cluster! Reseller"
    },
    {
      title: "Distributorship",
      description: "Become our official distributor in your country",
      image: Icon8,
      tabIndex: 0, // Tab index for "Cluster! Distributor"
    },
    {
      title: "Affiliate",
      description: "Become our official affiliate in your country",
      image: Icon9,
      tabIndex: 2, // Tab index for "Cluster! Affiliate"
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl lg:px-10 mx-auto text-center">
        <h2 className="text-4xl font-bold mb-8">BECOME OUR PARTNER!</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {partners.map((partner, index) => (

        <>
          <Link href={'/PartnerProgram'}>
            <div
              key={index}
              className="border rounded-lg shadow-md p-6 text-center transition-all duration-300 transform hover:-translate-y-3 hover:shadow-lg hover:border-primary cursor-pointer"
              onClick={() => setActiveTab(partner.tabIndex)}            >
              <div className="flex flex-col lg:flex-row items-center gap-5">
                <Image
                  src={partner.image}
                  alt={partner.title}
                  className="w-[53px] h-[50px] mb-4 bg-green-400 p-3 rounded-full"
                />
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-center lg:text-left">{partner.title}</h3>
                  <p className="text-gray-700 mb-4 text-center text-sm lg:text-left">{partner.description}</p>
                </div>
              </div>
            </div>
          </Link></>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BecomePartner;
