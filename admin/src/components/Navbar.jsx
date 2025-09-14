import React, { useContext } from "react";
import { assets } from "../assets/assets.js";
import { AdminContext } from "../context/adminContext";
import { useNavigate } from "react-router-dom";
import { DoctorContext } from "../context/doctorContext.jsx";
const Navbar = () => {
  const { aToken, setAToken } = useContext(AdminContext);
  const { dToken, setDToken } = useContext(DoctorContext);

  const navigate = useNavigate();

  const logOut = () => {
    navigate("/");
    aToken && setAToken("");
    aToken && localStorage.removeItem("aToken");
    dToken && setDToken("");
    dToken && localStorage.removeItem("dToken");
  };

  return (
    <div className="flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white">
      <div className="flex items-center gap-2 text-xs ">
        <img
          src={assets.admin_logo}
          alt=""
          className="w-36 cursor-pointer sm:w-40"
        />
        <p className="border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600">
          {" "}
          {aToken ? "Admin" : "Doctor"}
        </p>
      </div>
      <button
        onClick={logOut}
        className="bg-[#5F6FFF] text-white text-sm px-10 py-2 rounded-full cursor-pointer"
      >
        LogOut
      </button>
    </div>
  );
};

export default Navbar;
