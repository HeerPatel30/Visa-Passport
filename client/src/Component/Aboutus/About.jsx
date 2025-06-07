import React from "react";
import visa from "../../assets/visa-pass.avif";
import { FaMapLocation } from "react-icons/fa6";
import { FaBookAtlas } from "react-icons/fa6";
import { FaTicketAlt } from "react-icons/fa";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { MdCall } from "react-icons/md";
import Services from "../Services/Services";
import { useLocation } from "react-router-dom";
const About = () => {
  const location = useLocation();
  const isAboutPage = location.pathname === "/about";
  return (
    <div>
      <div className="flex flex-row  flex-wrap  gap-[100px] items-center my-11 ">
        <div className="rounded-sm w-[500px] p-4 bg-blue-50 flex items-center">
          <img src={visa} alt="" srcset="" className="w-[450px] h-[400px]" />
        </div>
        <div>
          <div className="flex items-center  gap-2 my-6 leading-none">
            {/* Heading */}
            <h1 className="text-3xl font-bold text-gray-800 whitespace-nowrap leading-none ">
              ABOUT US
            </h1>

            {/* Right lines */}
            <div className="flex flex-col items-start justify-center gap-[16px]">
              <div className="w-16 h-[2px] bg-red-600" />
              <div className="w-32 h-[2px] bg-blue-600" />
            </div>
          </div>

          {/* Subheading & Paragraph */}
          <div>
            <h1 className="text-5xl  text-gray-800">
              We’re Trusted Immigration
              <br />
              Consultant Agency.
            </h1>
            <p className="text-gray-600  py-6">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. <br />
              Atque quod blanditiis at quae molestiae vel magnam. Porro, dolores
              iste recusandae ex delectus eveniet perspiciatis optio.
            </p>
          </div>
          <div className="flex flex-row flex-wrap gap-5">
            <h1 className="flex flex-row gap-2 text-xl">
              <FaMapLocation className="text-5xl text-red-600" />
              <span className="font-semibold text-blue-950">
                Best Immigration
                <br />
                Resources
              </span>
            </h1>
            <h1 className="flex flex-row gap-2 text-xl">
              <FaBookAtlas className="text-5xl text-red-600" />
              <span className="font-semibold text-blue-950">
                Return Visas Availabile
              </span>
            </h1>
          </div>
          <div className="flex flex-r gap-16 my-5 place-items-center ">
            <div className=" flex flex-col bg-blue-100 w-[150px] h-[180px] rounded-xl items-center">
              <div className="text-7xl text-blue-950">
                <FaTicketAlt />
              </div>
              <div>
                <h1 className="text-4xl  text-blue-950 font-bold">
                  34 <br />
                  <p className=" text-xs my-2 font-semibold text-gray-600">
                    Years of <br /> Expriences
                  </p>
                </h1>
              </div>
            </div>
            <div>
              <ul>
                <li className="my-2 flex flex-row items-center gap-2">
                  <IoMdCheckmarkCircle className="text-2xl text-red-500" />
                  <span className="text-blue-950 font-bold">
                    Offer 100 % Genuine Assistance
                  </span>
                </li>
                <li className="my-2 flex flex-row items-center gap-2">
                  <IoMdCheckmarkCircle className="text-2xl text-red-500" />
                  <span className="text-blue-950 font-bold">
                    It’s Faster & Reliable Execution
                  </span>
                </li>
                <li className="my-2 flex flex-row items-center gap-2">
                  <IoMdCheckmarkCircle className="text-2xl text-red-500" />
                  <span className="text-blue-950 font-bold">
                    Accurate & Expert Advice
                  </span>
                </li>
                <li className="my-5 flex flex-row items-center gap-2">
                  <MdCall className="text-6xl" />
                  <span className="gap-2 text-blue-950 font-bold">
                    Have any questions?
                    <br />
                    <p className="text-2xl text-red-500">
                      Free: +0123 456 7890
                    </p>
                  </span>
                </li>
              </ul>
            </div>

            <div></div>
          </div>
        </div>
      </div>
       {isAboutPage && <Services />}
    </div>
  );
};

export default About;
