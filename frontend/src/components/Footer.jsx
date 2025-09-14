import React from "react";
import { assets } from "../assets/assets";
const Footer = () => {
  return (
    <div className="        md:mx-10">
      <div className="flex  flex-col sm:grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 gap-14 my-10 text-sm">
        {/* Logo and Description Section */}
        <div>
          <img className="mb-5 w-44 cursor-pointer" src={assets.logo} alt="" />
          <p className="text-gray-600 text-sm leading-relaxed">
            Lorem ipsum is simply dummy text of the printing and typesetting
            industry. Lorem ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
        </div>

        {/* Company Section */}
        <div className="space-y-4">
          <h3 className="text-gray-800 font-semibold uppercase tracking-wide text-sm">
            Company
          </h3>
          <ul className=" flex flex-col gap-2 text-gray-600 space-y-3">
            <li>
              <a
                href="/about"
                className="text-gray-600 text-sm hover:text-gray-900 transition-colors"
              >
                About us
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="text-gray-600 text-sm hover:text-gray-900 transition-colors"
              >
                Contact us
              </a>
            </li>
            <li>
              <a
                href="/privacy"
                className="text-gray-600 text-sm hover:text-gray-900 transition-colors"
              >
                Privacy policy
              </a>
            </li>
          </ul>
        </div>

        {/* Get in Touch Section */}
        <div className="space-y-4">
          <h3 className="text-gray-800 font-semibold uppercase tracking-wide text-sm">
            Get in Touch
          </h3>
          <div className="space-y-3">
            <p className="text-gray-600 text-sm">
              Phone:{" "}
              <a
                href="tel:+12124567890"
                className="hover:text-gray-900 transition-colors"
              >
                +1 212 456 7890
              </a>
            </p>
            <p className="text-gray-600 text-sm">
              Email:{" "}
              <a
                href="mailto:greatfuture@gmail.com"
                className="hover:text-gray-900 transition-colors"
              >
                greatfuture@gmail.com
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="mt-12 pt-8 border-t border-gray-200">
        <p className="text-center text-gray-600 text-sm">
          Copyright ©2024 Prescripto - All Right Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
