import React from "react";
import { assets } from "../assets/assets";
const Contact = () => {
  return (
    <div>
      {/* Heading */}
      <div className="text-center text-2xl pt-10 text-gray-500 ">
        <p>
          CONTACT <span className="font-medium text-gray-700">US</span>
        </p>
      </div>

      {/* Middle Description Section */}
      <div className="my-10 flex flex-col md:flex-row gap-12">
        <img
          className="w-full md:max-w-[360px]"
          src={assets.contact_image}
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600">
          <b className="text-gray-800">our Office</b>
          <p>411011 Kennedy Road, RTO Pune</p>
          <p>
            Tel : (+91) 9862717654 <br />
            Email : prescripto@gmail.com
          </p>
          <b className="text-gray-800">Career At PreScripto</b>
          <p>Learn more about our teams and Job Openings</p>
          <button className="bg-blue-50 px-12 py-3 text-gray-600 rounded-full mt-10 cursor-pointer">
            Explore Job !
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
