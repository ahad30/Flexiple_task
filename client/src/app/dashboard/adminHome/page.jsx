"use client"
import React from 'react'
import { useGetOrderQuery } from '@/redux/Feature/Admin/order/orderApi';
import { useGetProductQuery } from '@/redux/Feature/Admin/product/productApi';
import { useGetTrialsQuery } from '@/redux/Feature/Admin/trial/trialApi';
import Skeleton from '@/components/Skeleton/Skeleton';
import Link from 'next/link';

const page = () => {

  const { data: trialsData, isLoading } = useGetTrialsQuery();
  const { data: productData } = useGetProductQuery();
  const { data: orderData, error } = useGetOrderQuery();

  const trialData = trialsData?.data?.map((trial, index) => ({
    key: index
  }));

  const productKeyData = productData?.data?.map((product, index) => ({
    key: index,

  }));

  const soldKey = productData?.data?.filter(soldKey => soldKey?.status === 'sold')
  const unsoldKey = productData?.data?.filter(unsoldKey => unsoldKey?.status === 'unsold')

  const clusterKey = productData?.data?.filter(clusterKey =>clusterKey?.name ==='Cluster Antivirus' && clusterKey?.status === 'sold')

  const clusterKey2 = productData?.data?.filter(clusterKey2 =>clusterKey2?.name ==='Cluster Antivirus' && clusterKey2?.status === 'unsold')


  const internetKey = productData?.data?.filter(internetKey => internetKey?.name ==='Cluster Internet Security' && internetKey?.status === 'sold')
  const internetKey2 = productData?.data?.filter(internetKey2 => internetKey2?.name ==='Cluster Internet Security' && internetKey2?.status === 'unsold')



  const securityKey = productData?.data?.filter(securityKey => securityKey?.name ==='Cluster Total Security' && securityKey?.status === 'sold')
  const securityKey2 = productData?.data?.filter(securityKey2 => securityKey2?.name ==='Cluster Total Security' && securityKey2?.status === 'unsold')




  const businessKey = productData?.data?.filter(businessKey =>businessKey?.name ==='Cluster Antivirus Business' && businessKey?.status === 'sold')
  const businessKey2 = productData?.data?.filter(businessKey2 =>businessKey2?.name ==='Cluster Antivirus Business' && businessKey2?.status === 'unsold')






  const orderProductData = orderData?.data?.map((order, index) => ({
    key: index,
  }));



  if (isLoading) {
    return <div><Skeleton/></div>;
  }

  if (error) {
    return <div>Error loading data</div>;
  }

 
  return (

 <div className="mx-auto max-w-screen-xl  py-4 sm:px-6 sm:py-12 lg:px-8">
  <div className="mx-auto max-w-3xl text-center">
    <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
      Welcome to Cluster Antivirus Dashboard
    </h2>

  </div>

  <div className="mt-6 grid grid-cols-1 gap-4 sm:mt-8 sm:grid-cols-2 lg:grid-cols-4">

  <Link href={`/dashboard/order`}>
  <div className=" rounded-lg bg-blue-50  py-4 text-center transition-all duration-300 transform hover:-translate-y-2 hover:shadow-lg border    hover:border-primary cursor-pointer">
      <dt className="order-last text-base font-medium text-gray-500">Total Orders</dt>

      <dd className="text-4xl font-extrabold text-primary md:text-3xl">{orderProductData?.length}</dd>
    </div>
  </Link>

  <Link href={`/dashboard/trial`}>

    <div className=" rounded-lg bg-blue-50  py-4 text-center
    transition-all duration-300 transform hover:-translate-y-2 hover:shadow-lg border    hover:border-primary cursor-pointer">
      <dt className="order-last text-base font-medium text-gray-500">Total Trials</dt>

      <dd className="text-4xl font-extrabold text-primary md:text-3xl">{trialData?.length}</dd>
    </div>
</Link>

<Link href={`/dashboard/product`}>

    <div className=" rounded-lg bg-blue-50  py-4 text-center
    transition-all duration-300 transform hover:-translate-y-2 hover:shadow-lg border    hover:border-primary cursor-pointer">
      <dt className="order-last text-base font-medium text-gray-500">Total Product Keys</dt>

      <dd className="text-4xl font-extrabold text-primary md:text-3xl">{productKeyData?.length}</dd>
    </div>
</Link>

<Link href={`/dashboard/product`}>
    <div className=" rounded-lg bg-blue-50  py-4 text-center transition-all duration-300 transform hover:-translate-y-2 hover:shadow-lg border    hover:border-primary cursor-pointer">
      <dt className="order-last text-base font-medium text-gray-500">Total Key Sold</dt>

      <dd className="text-4xl font-extrabold text-primary md:text-3xl">{soldKey?.length}</dd>
    </div>
</Link>

<Link href={`/dashboard/product`}>
<div className=" rounded-lg bg-blue-50  py-4 text-center transition-all duration-300 transform hover:-translate-y-2 hover:shadow-lg border    hover:border-primary cursor-pointer">
      <dt className="order-last text-base font-medium text-gray-500">Total Key Unsold</dt>

      <dd className="text-4xl font-extrabold text-primary md:text-3xl">{unsoldKey?.length}</dd>
    </div>
  </Link>



  <Link href={`/dashboard/product`}>
    <div className=" rounded-lg bg-blue-50  py-4 text-center
    transition-all duration-300 transform hover:-translate-y-2 hover:shadow-lg border   hover:border-primary cursor-pointer">
      <p className="order-last text-base font-medium text-gray-500">Cluster Antivirus Keys</p>

      <p className="text-xl font-extrabold text-primary  md:text-base ">
      Sold: {clusterKey?.length}
        </p>
      <p className="text-xl font-extrabold text-primary  md:text-base ">
      Unsold: {clusterKey2?.length}
        </p>
    </div>
</Link>

    <Link href={`/dashboard/product`}>
    <div className=" rounded-lg bg-blue-50  py-4 text-center
    transition-all duration-300 transform hover:-translate-y-2 hover:shadow-lg border    hover:border-primary cursor-pointer">
      <dt className="order-last text-base font-medium text-gray-500"> Internet Security Keys</dt>

      <p className="text-xl font-extrabold text-primary  md:text-base ">
      Sold: {internetKey?.length}
        </p>
      <p className="text-xl font-extrabold text-primary  md:text-base ">
      Unsold: {internetKey2?.length}
        </p>
    </div>
</Link>

<Link href={`/dashboard/product`}>
    <div className=" rounded-lg bg-blue-50  py-4 text-center
    transition-all duration-300 transform hover:-translate-y-2 hover:shadow-lg border    hover:border-primary cursor-pointer">
      <dt className="order-last text-base font-medium text-gray-500"> Total Security Keys</dt>

      <p className="text-xl font-extrabold text-primary  md:text-base ">
      Sold: {securityKey?.length}
        </p>
      <p className="text-xl font-extrabold text-primary  md:text-base ">
      Unsold: {securityKey2?.length}
        </p>
    </div>
</Link>

<Link href={`/dashboard/product`}>
    <div className=" rounded-lg bg-blue-50  py-4 text-center
    transition-all duration-300 transform hover:-translate-y-2 hover:shadow-lg border    hover:border-primary cursor-pointer">
      <dt className="order-last text-base font-medium text-gray-500">Cluster Business  Keys</dt>

      <p className="text-xl font-extrabold text-primary  md:text-base ">
      Sold: {businessKey?.length}
        </p>
      <p className="text-xl font-extrabold text-primary  md:text-base ">
      Unsold: {businessKey2?.length}
        </p>
    </div>
</Link>

   


  </div>
</div>
  )
}

export default page;