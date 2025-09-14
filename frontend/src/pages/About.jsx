import React from "react";
import { assets } from "../assets/assets";
import Footer from "../components/Footer";
const About = () => {
  return (
    <div>
      {/* Heading */}
      <div className="text-center text-2xl pt-10 text-gray-500 ">
        <p>
          ABOUT <span className="font-medium text-gray-700">US</span>
        </p>
      </div>

      {/* Middle Description Section */}
      <div className="my-10 flex flex-col md:flex-row gap-12">
        <img
          className="w-full md:max-w-[360px]"
          src={assets.about_image}
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
            delectus laborum possimus corporis modi accusantium amet non
            inventore voluptates omnis, quae veniam unde cumque magni odio at
            facere illum alias!
          </p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Distinctio
            voluptates, maiores adipisci ea maxime reiciendis rem possimus ut
            illum a quisquam, tempora, optio ex saepe cupiditate voluptatibus
            reprehenderit eligendi alias.
          </p>
          <b className="text-gray-800">Our Vision</b>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptates
            iusto velit ipsa ullam soluta, suscipit quaerat pariatur ipsum
            sapiente fugit aperiam autem expedita, incidunt mollitia numquam
            asperiores necessitatibus deserunt reprehenderit!
          </p>
        </div>
      </div>

      {/* Third Section */}
      <div className="text-xl my-4">
        <p>
          WHY <span className="text-gray-700 font-semibold ">CHOOSE US </span>{" "}
        </p>
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-[#5f6fff] hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>EFFICIENCY</b>
          <p>
            Streamlined Appointment Scheduling Thats Fits Into Your Busy
            Lifestyle.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-[#5f6fff] hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>CONVINIENCE</b>
          <p>
            Access To A Network Of Trusted HealthCare Professional In Your Area.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-[#5f6fff] hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>PERSONALIZATION</b>
          <p>
            Tailored Recommendations And Reminders To Help You Stay On Top Of
            Your Health.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
