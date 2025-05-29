import React from "react";
import dollar from "../../assets/dollar_9731012.png";
import visa from "../../assets/visa_5968248.png";
import time from "../../assets/time_8465102.png";
import speech from "../../assets/speech_795232.png";
import Country from "../Country/Country";
import { useLocation } from "react-router-dom";

// Array of services
const servicedata = [
  { img: dollar, title: "Cost-Effective", desc: "Dolor, sit amet consectetur adipisicing elit. Soluta inventore cum accusamus," },
  { img: visa, title: "Visa Assistance", desc: "Helping clients with all visa-related processes seamlessly." },
  { img: time, title: "Quick Processing", desc: "We value your time. Get things done efficiently and fast!" },
  { img: speech, title: "24/7 Support", desc: "We’re available round-the-clock to help you out anytime." }
];

const Services = () => {
  const location = useLocation();
  const isServicePage = location.pathname === "/services";

  return (
    <div>
      {/* Heading */}
      <div className="flex items-center justify-center gap-2 my-6 leading-none">
        <div className="flex flex-col items-end justify-center gap-[16px]">
          <div className="w-16 h-[2px] bg-red-600" />
          <div className="w-32 h-[2px] bg-blue-600" />
        </div>

        <h1 className="text-3xl font-bold text-gray-800 whitespace-nowrap leading-none m-0 p-0">
          WHY CHOOSE US
        </h1>

        <div className="flex flex-col items-start justify-center gap-[16px]">
          <div className="w-16 h-[2px] bg-red-600" />
          <div className="w-32 h-[2px] bg-blue-600" />
        </div>
      </div>

      {/* Subheading & Description */}
      <div>
        <h1 className="text-5xl text-center text-gray-800">
          Offer Tailor Made Services That
          <br />
          Our Client Requires
        </h1>
        <p className="text-gray-600 text-center py-6">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. <br />
          Atque quod blanditiis at quae molestiae vel magnam. Porro, dolores
          iste recusandae ex delectus eveniet perspiciatis optio.
        </p>
      </div>

      {/* Service Cards */}
      <div className="flex flex-wrap justify-center gap-10 px-4 py-10">
        {servicedata.map((service, index) => (
          <div key={index} className="flex flex-col gap-5 group cursor-pointer w-44 sm:w-52 shadow-2xl">
            <div className="bg-gradient-to-r aspect-square flex items-center justify-center m-1 from-gray-100 to-gray-300">
              <img
                src={service.img}
                alt={`${service.title} Icon`}
                className="group-hover:ease-in-out transition duration-700 group-hover:duration-1000 object-center object-cover group-hover:scale-110 sm:group-hover:scale-150 w-16 sm:w-28 aspect-square rotate-0 group-hover:-rotate-[360deg] group-hover:-translate-y-12 group-hover:-skew-y-12 group-hover:skew-x-12"
              />
            </div>

            <div className="flex flex-row place-items-center m-1 gap-3">
              <div className="flex flex-col gap-1">
                <p className="font-semibold text-lg sm:text-xl relative after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:absolute after:origin-bottom-left after:transform after:ease-in-out after:duration-500 w-full after:w-full group-hover:after:scale-x-100 group-hover:after:origin-bottom-left after:bg-lime-600 text-gray-600">
                  {service.title}
                </p>
                <p className="text-sm text-gray-500">{service.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Button */}
      <div className="flex justify-center">
        <button
          type="submit"
          className="relative z-10 w-[200px] py-2 font-sans text-gray-50 rounded-xl bg-red-600 overflow-hidden
             before:content-[''] before:absolute before:inset-0 before:bg-transparent before:z-0
             hover:before:bg-blue-400 transition duration-300"
        >
          <span className="relative z-10 text-2xl">Apply For Service</span>
        </button>
      </div>

      {/* Show Country only on /service route */}
      {isServicePage && <Country />}
    </div>
  );
};

export default Services;
<<<<<<< HEAD
=======
      {/* Heading */}
>>>>>>> 6f37cdb (basic routing)
