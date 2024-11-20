"use client";

import React, { useEffect, useState } from "react";
import ZFormTwo from "@/components/Form/ZFormTwo";
import ZInputTwo from "@/components/Form/ZInputTwo";
import ZEmail from "@/components/Form/ZEmail";
import { useChangePasswordMutation, useGetAdminQuery, useUpdateAdminMutation } from "@/redux/Feature/auth/authApi";
import Skeleton from "@/components/Skeleton/Skeleton";
import UseLoader from "@/components/UseLoader";
import { toast } from "sonner";

const Setting = () => {
  const [isLoading, setIsLoading] = useState(false); // Tracks loading state for the entire div

  const adminId = 1;
  // Fetch admin profile data
  const {
    data: adminData,
    isLoading: profileLoading,
    isError: profileError,
  } = useGetAdminQuery(adminId);

  // Mutations for updating profile and changing password
  const [updateAdmin, { isLoading: updateLoading, isSuccess: updateSuccess , data: updateAdminData}] =
    useUpdateAdminMutation();
  const [
    changePassword,
    { isLoading: passwordLoading, isSuccess: passwordSuccess },
  ] = useChangePasswordMutation();


  const handleSubmit = (data) => {

    // Update profile data
    const profileUpdateData = {
      email: data.email,
      name: data.name,
    };
    updateAdmin({ id: adminId, data: profileUpdateData });

    // Change password
    if (data.oldPassword && data.newPassword) {
      const passwordData = {
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      };
      changePassword(passwordData);
    }


  };

  if (profileLoading) {
    return <Skeleton />;
  }

  if (profileError) {
    return <div>Error loading profile</div>;
  }

  return (
    <>
      {isLoading ? (
        <UseLoader />
      ) : (
        <div className="bg-white p-6 md:p-10 grid grid-cols-1 lg:grid-cols-[1fr_3fr] gap-10">
          <div className="flex flex-col justify-center items-center">
            <div className="relative w-56 h-[150px] left-5 lg:mt-[-70px]">
              <img
                className="h-[180px] w-[180px] rounded-full absolute object-cover"
                src={`https://ui-avatars.com/api/?name=${adminData?.data?.name?.charAt(0) || "A"}`}
                alt="Admin Avatar"
              />
            </div>

            <div className="flex flex-col justify-center items-center bg-[#bdcef4] px-6 rounded-t-[30px] w-[300px] h-[190px] gap-y-2">
              <h1 className="text-[#042656] mt-3 text-[16px] font-sans font-semibold">
                {adminData?.data?.name || "Cluster Admin"}
              </h1>
              <span className="text-[#555555] mt-1 text-[13px] font-normal font-mono">
                Email: {adminData?.data?.email || "admin@cluster.com"}
              </span>
            </div>
          </div>

          <div>

            <ZFormTwo
              isLoading={updateLoading || passwordLoading}
            isSuccess={updateSuccess || passwordSuccess}
              submit={handleSubmit}
              buttonName={"Submit"}
              data={updateAdminData}
            >
              <div>
                <h1 className="text-2xl mt-2 text-center">Update Profile</h1>
              </div>

              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="relative">
                  <ZInputTwo
                    required={1}
                    name="name"
                    type="text"
                    label="Name"
                    defaultKey={""}
                    placeholder={"Enter your name"}
                    value={adminData?.data?.name}
                  />
                </div>
                <div className="relative">
                  <ZEmail label={"Email"} name={"email"} value={adminData?.data?.email} />
                </div>
                <div className="relative">
                  <ZInputTwo
                    name="oldPassword"
                    type="password"
                    label="Old password"
                    defaultKey={""}
                    placeholder={"Enter your old password"}
                  />
                </div>
                <div className="relative">
                  <ZInputTwo
                    name="newPassword"
                    type="password"
                    label="New password"
                    defaultKey={""}
                    placeholder={"Enter your new password"}
                  />
                </div>
              </div>
            </ZFormTwo>
          </div>
        </div>
      )}
    </>
  );
};

export default Setting;
