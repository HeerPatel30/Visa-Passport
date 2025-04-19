import React from "react";
import { MdLocationPin } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { PiInstagramLogoFill } from "react-icons/pi";
import { FaSquareFacebook } from "react-icons/fa6";
import { FaSquareWhatsapp } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaCopyright } from "react-icons/fa6";
const Footer = () => {
  return (
    <>
      <div className="w-full bg-blue-800 py-10">
      <div className="flex flex-col md:flex-row flex-wrap justify-evenly items-start gap-8 px-4 md:px-6">

          {/* Contact Info */}
          <div className="text-white max-w-xs">
            <h1 className="text-red-500 text-2xl font-semibold mb-4">
              Contact Info
            </h1>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <MdLocationPin className="text-white text-xl mt-1" />
                <span>123 Main Street, Mumbai, India</span>
              </li>
              <li className="flex items-start gap-2">
                <MdEmail className="text-white text-xl mt-1" />
                <span>example@email.com</span>
              </li>
              <li className="flex items-start gap-2">
                <FaPhone className="text-white text-xl mt-1" />
                <span>+91 9876543210</span>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="text-white max-w-xs">
            <h1 className="text-red-500 text-2xl font-semibold mb-4">
              Opening Timings
            </h1>
            <ul className="space-y-2">
              <li>
                <h1 className="text-gray-500 text-[20px] font-semibold">
                  Mon - Friday: <br />
                  <p className="text-white text-[15px]">09.00 am to 07.00 pm</p>
                </h1>
              </li>
              <li>
                <h1 className="text-gray-500 text-[20px] font-semibold">
                  Saturday <br />
                  <p className="text-white text-[15px]">10.00 am to 05.00 pm</p>
                </h1>
              </li>
            </ul>
          </div>

          {/* Services */}

          <div className="text-white max-w-xs">
            <h1 className="text-red-500 text-2xl font-semibold mb-4">
              Services
            </h1>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <MdKeyboardArrowRight className="text-xl" />
                <span>Visa Process</span>
              </li>
              <li className="flex items-center gap-2">
                <MdKeyboardArrowRight className="text-xl" />
                <span>Passport Process</span>
              </li>
              <li className="flex items-center gap-2">
                <MdKeyboardArrowRight className="text-xl" />
                <span>Consultation</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="text-white max-w-xs">
            <h1 className="text-red-500 text-2xl font-semibold mb-4">
              Follow Us
            </h1>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <FaSquareFacebook className="text-xl" />
                <span>Facebook</span>
              </li>
              <li className="flex items-center gap-2">
                <PiInstagramLogoFill className="text-xl" />
                <span>Instagram</span>
              </li>
              <li className="flex items-center gap-2">
                <FaSquareWhatsapp className="text-xl" />
                <span>Whatsapp</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="w-full bg-red-500 py-2">
        <div className="flex flex-row justify-around flex-wrap text-white">
            <p className="flex flex-row gap-2">
            <FaCopyright className="text-white text-xl mt-1" /> Vistapass
            </p>
            <p>
                Designed by , Heer Patel
            </p>
        </div>
        
      </div>
    </>
  );
};

export default Footer;
