import React, { useContext, useState } from "react";
// import { assets } from "../assets/assets.js";
import { Link, useNavigate } from "react-router-dom";
import { AdminContext } from "../context/adminContext.jsx";
import axios from "axios";
import { toast } from "react-toastify";
import { DoctorContext } from "../context/doctorContext.jsx";

const Login = () => {
  const [state, setState] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { setAToken, backendURL } = useContext(AdminContext);
  const { setDToken } = useContext(DoctorContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (state === "Admin") {
        const { data } = await axios.post(backendURL + "/api/admin/login", {
          email,
          password,
        });
        //console.log(data);
        if (data.success) {
          //console.log(data.token);
          localStorage.setItem("aToken", data.token);
          setAToken(data.token);
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(
          backendURL + "/api/doctor/login-doctor",
          {
            email,
            password,
          }
        );
        //console.log(data);
        if (data.success) {
          //console.log(data.token);
          localStorage.setItem("dToken", data.token);
          setDToken(data.token);
        } else {
          toast.error(data.message);
        }
      }
    } catch (err) {}
  };

  return (
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg">
        <p className="text-2xl m-auto font-semibold ">
          <span className="text-[#5F6FFF]">{state}</span> Login
        </p>

        <div className="w-full">
          <p>Email :</p>
          <input
            type="email"
            required
            className="border rounded border-[#DADADA] w-full mt-1 p-2"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>

        <div className="w-full">
          <p>Password</p>
          <input
            type="password"
            required
            className="border rounded border-[#DADADA] w-full mt-1 p-2"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>

        <button className="bg-[#5F6FFF] text-white w-full py-2 rounded-md text-base cursor-pointer">
          Login
        </button>
        {state === "Admin" ? (
          <p>
            Doctor Login{" "}
            <span
              className="text-[#5F6FFF] underline cursor-pointer"
              onClick={() => setState("Doctor")}
            >
              Click Here
            </span>
          </p>
        ) : (
          <p>
            Admin Login
            <span
              className="text-[#5F6FFF] underline cursor-pointer"
              onClick={() => setState("Admin")}
            >
              Click Here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
