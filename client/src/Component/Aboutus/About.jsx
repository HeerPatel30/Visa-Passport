import React from "react";
import visa from "../../assets/visa-pass.avif";
import { FaMapLocation, FaBookAtlas } from "react-icons/fa6";
import { FaTicketAlt } from "react-icons/fa";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { MdCall } from "react-icons/md";
import Services from "../Services/Services";
import { useLocation } from "react-router-dom";

const About = () => {
  const location = useLocation();
  const isAboutPage = location.pathname === "/about";

  return (
    <div className="px-4 py-8">
      <div className="flex flex-col lg:flex-row flex-wrap justify-center items-center gap-10 lg:gap-[100px]">
        {/* Image Section */}
        <div className="rounded-sm w-full max-w-[500px] p-4 bg-blue-50 flex justify-center">
          <img src={visa} alt="Visa" className="w-full h-auto max-h-[400px] object-cover" />
        </div>

        {/* Text Section */}
        <div className="w-full max-w-2xl">
          {/* Heading */}
          <div className="flex items-center gap-4 my-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">ABOUT US</h1>
            <div className="flex flex-col gap-2">
              <div className="w-10 sm:w-16 h-[2px] bg-red-600" />
              <div className="w-20 sm:w-32 h-[2px] bg-blue-600" />
            </div>
          </div>

          {/* Subheading & Paragraph */}
          <div className="mb-6">
            <h1 className="text-3xl sm:text-5xl font-semibold text-gray-800 leading-snug">
              We’re Trusted Immigration
              <br className="hidden sm:block" />
              Consultant Agency.
            </h1>
            <p className="text-gray-600 py-4 text-sm sm:text-base">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque quod blanditiis at quae
              molestiae vel magnam. Porro, dolores iste recusandae ex delectus eveniet perspiciatis optio.
            </p>
          </div>

          {/* Icons Row */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <FaMapLocation className="text-4xl text-red-600" />
              <span className="font-semibold text-blue-950 text-sm sm:text-lg">
                Best Immigration Resources
              </span>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <FaBookAtlas className="text-4xl text-red-600" />
              <span className="font-semibold text-blue-950 text-sm sm:text-lg">
                Return Visas Available
              </span>
            </div>
          </div>

          {/* Stats & List */}
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            {/* Stat box */}
            <div className="flex flex-col bg-blue-100 w-full sm:w-[150px] h-[180px] px-4 py-6 rounded-xl items-center text-center">
              <div className="text-6xl text-blue-950">
                <FaTicketAlt />
              </div>
              <h1 className="text-3xl font-bold text-blue-950 mt-2">34</h1>
              <p className="text-xs font-semibold text-gray-600">Years of Experiences</p>
            </div>

            {/* Checkmarks */}
            <ul className="text-sm sm:text-base space-y-3">
              <li className="flex items-center gap-2">
                <IoMdCheckmarkCircle className="text-2xl text-red-500" />
                <span className="font-bold text-blue-950">Offer 100% Genuine Assistance</span>
              </li>
              <li className="flex items-center gap-2">
                <IoMdCheckmarkCircle className="text-2xl text-red-500" />
                <span className="font-bold text-blue-950">It’s Faster & Reliable Execution</span>
              </li>
              <li className="flex items-center gap-2">
                <IoMdCheckmarkCircle className="text-2xl text-red-500" />
                <span className="font-bold text-blue-950">Accurate & Expert Advice</span>
              </li>
              <li className="flex items-center gap-3 pt-2">
                <MdCall className="text-4xl sm:text-5xl" />
                <div className="text-blue-950 font-bold">
                  <span>Have any questions?</span>
                  <p className="text-lg text-red-500">Free: +0123 456 7890</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Conditionally render Services */}
      {isAboutPage && <Services />}
    </div>
  );
};

export default About;
