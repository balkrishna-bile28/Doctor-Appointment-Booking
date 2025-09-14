import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/doctorContext";
import { AppContext } from "../../context/appContext";
import { assets } from "../../assets/assets.js";

const DoctorAppointments = () => {
  const {
    dToken,
    appointments,
    getAppointments,
    cancleAppointment,
    completeAppointment,
  } = useContext(DoctorContext);
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken]);

  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 font-medium text-lg">ALL APPOINTMENTS</p>
      <div className="bg-white border rounded text-sm max-h-[90vh] min-h-[50vh] overflow-y-scroll ">
        <div className="max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] border-b gap-1 py-3 px-6">
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>
        {appointments.reverse().map((item, index) => (
          <div
            key={index}
            className="flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 items-center py-3 px-6 border-b text-gray-500 hover:bg-gray-100"
          >
            <p className="max-sm:hidden">{index + 1}</p>

            <div className="flex items-center gap-2">
              <img src={item.userData.image} className="w-8 rounded-full" />
              <p>{item.userData.fullName}</p>
            </div>

            <div>
              <p className="text-sm inline border border-[#5f6fff] px-2 rounded-full">
                {item.payment ? "ONLINE" : "CASH"}
              </p>
            </div>

            <p className="max-sm:hidden">{calculateAge(item.userData.dob)}</p>
            <p>
              {slotDateFormat(item.slotDate)} , {item.slotTime}
            </p>
            <p>
              {currency}
              {item.amount}
            </p>

            {item.cancelled ? (
              <p className="text-red-500 text-xs font-medium">Cancelled</p>
            ) : item.isCompleted ? (
              <p className="text-green-500 text-xs font-medium">Completed</p>
            ) : (
              <div className="flex">
                <img
                  onClick={() => cancleAppointment(item._id)}
                  src={assets.cancel_icon}
                  className="w-10 cursor-pointer "
                />
                <img
                  onClick={() => completeAppointment(item._id)}
                  src={assets.tick_icon}
                  className="w-10 cursor-pointer "
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorAppointments;
