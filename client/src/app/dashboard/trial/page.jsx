"use client";
import React from "react";
import DashboardTable from "@/components/Table/DashboardTable";
import { useGetTrialsQuery } from "@/redux/Feature/Admin/trial/trialApi"; 
import moment from "moment";

const Trial = () => {
  // Fetch trial data from Redux API
  const { data: trialsData, error, isLoading } = useGetTrialsQuery();

  // Format trial data for the table
  const trialData = trialsData?.data?.map((trial, index) => ({
    key: index,
    name: trial.name,
    email: trial.email,
    address: trial.address,
    mobile: trial.mobile,
    productName: trial.productName,
    createdAt: moment(trial?.createdAt).format("LLL"),
  }));


  // Define columns for the trial table
  const columns = [
    {
      title: " Date",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Mobile",
      dataIndex: "mobile",
      key: "mobile",
    },
    {
      title: "Product Name",
      dataIndex: "productName",
      key: "productName",
    },
  ];



  if (error) {
    return <div>Error loading trials</div>;
  }

  return (
    <>
      
      <div className="flex flex-col font-bold lg:flex-row items-center gap-x-2 justify-start my-5">
       Total Trial : {trialData?.length}
             </div>
         
      {/* Render the table with trial data */}
      <DashboardTable columns={columns} data={trialData} loading={isLoading} />
    </>
  );
};

export default Trial;
