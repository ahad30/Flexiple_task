import React from "react";
import { useGetUsersQuery } from "@/redux/Feature/userApi";
import UseLoader from "@/components/UseLoader";

const AllUser = () => {
  const { data, error, isLoading } = useGetUsersQuery();

  if (isLoading) return <p><UseLoader/></p>;
  if (error) return <p>Failed to load users.</p>;

  return (
    <section className="py-16 bg-black">
      <div className="max-w-7xl lg:px-10 mx-auto">
        <h1 className="text-4xl font-bold mb-12 text-center text-[#9B9B9C]">Engineers to hire</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-8">
          {data?.map((user, index) => (
            <div
              key={index}
              className="bg-[#0E0C10] text-white border border-white rounded-lg shadow-lg p-6"
            >
              <h2 className="text-2xl font-bold mb-2">{user.name}</h2>
              <p className="text-gray-400 mb-4">
                <span className="font-semibold">Experience:</span> {user.experience}
              </p>
              <p className="text-gray-400 mb-4">
                <span className="font-semibold">Notice:</span> {user.notice}
              </p>
              <p className="text-gray-400 mb-4">
                <span className="font-semibold">Current CTC:</span> {user.currentCTC}
              </p>
              <p className="mb-4 flex items-center gap-2">
                <span className="font-semibold">Worked at:</span>
                <span className="flex flex-wrap gap-2 ">
                  {user.workedAt.split(", ").map((company, i) => (
                    <span
                      key={i}
                      className="bg-white text-black px-3 py-1 rounded-full text-sm"
                    >
                      {company}
                    </span>
                  ))}
                </span>
              </p>
              <p className="text-gray-300 mb-4 text-[20px] line-clamp-3">
                {user.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {user.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              <div className="flex justify-end">
              <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md">
                Get a Quote →
              </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AllUser;
