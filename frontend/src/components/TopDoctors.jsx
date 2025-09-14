import React, { useContext } from "react";
//import { doctors } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);
  return (
    <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">
      <h1 className="text-3xl font-medium ">Top Doctors To Book</h1>
      <p className="sm:w-1/3 text-center text-sm">
        Simply Browse through our extensive list of doctors .
      </p>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-5 gap-y-6 px-3 sm:px-0">
        {doctors.slice(0, 10).map((item, index) => (
          <div
            key={index}
            onClick={() => {
              navigate(`/appointment/${item._id}`);
              scrollTo(0, 0);
            }}
            className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
          >
            <img src={item.image} alt="" className="bg-blue-50 " />
            <div className="p-4">
              <div
                className={`flex items-center text-center ${
                  item.available ? "text-green-500" : "text-gray-500"
                }  gap-2 text-sm`}
              >
                <p
                  className={`${
                    item.available ? "bg-green-500" : "bg-gray-500"
                  } rounded-full w-2 h-2`}
                ></p>
                <p>{item.available ? "Available" : "Not Available"}</p>
              </div>
              <p className="text-gray-900 text-lg font-medium">{item.name}</p>
              <p className="text-gray-600 text-sm">{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() => {
          navigate(`/doctors`);
          scrollTo(0, 0);
        }}
        className="bg-blue-50 px-12 py-3 text-gray-600 rounded-full mt-10 cursor-pointer"
      >
        More
      </button>
    </div>
  );
};

export default TopDoctors;
