import React from "react";

// Importing flags (used inside the circle)
import indialogo from "../../assets/india-flag.png";
import auslogo from "../../assets/aus.png";
import irelandlogo from "../../assets/Flag_of_Ireland.svg.png";
import brazillogo from "../../assets/Flag_of_Brazil.svg.png";

// Importing country backgrounds
import india from "../../assets/india.webp";
import aus from "../../assets/aus-1.avif";
import ireland from "../../assets/ireland.jpg";
import brazil from "../../assets/brazil.avif";

const countries = [
  {
    name: "India",
    logo: indialogo,
    background: india,
  },
  {
    name: "Australia",
    logo: auslogo,
    background: aus,
  },
  {
    name: "Ireland",
    logo: irelandlogo,
    background: ireland,
  },
  {
    name: "Brazil",
    logo: brazillogo,
    background: brazil,
  },
];

const Country = () => {
  return (
    <div className="my-[50px]">
           {/* Section Title */}
      <div className="flex items-center justify-center gap-2 my-6 leading-none">
        <div className="flex flex-col items-end justify-center gap-[16px]">
          <div className="w-16 h-[2px] bg-red-600" />
          <div className="w-32 h-[2px] bg-blue-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 whitespace-nowrap leading-none m-0 p-0">
            COUNTRY WE OFFER
        </h1>
        <div className="flex flex-col items-start justify-center gap-[16px]">
          <div className="w-16 h-[2px] bg-red-600" />
          <div className="w-32 h-[2px] bg-blue-600" />
        </div>
      </div>    

      {/* Subheading & Paragraph */}
      <div>
        <h1 className="text-5xl text-center text-gray-800">
        Immigration & visa services 
          <br />
          following Countries
        </h1>
        <p className="text-gray-600 text-center py-6">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. <br />
          Atque quod blanditiis at quae molestiae vel magnam. Porro, dolores
          iste recusandae ex delectus eveniet perspiciatis optio.
        </p>
      </div>
      <div className="flex flex-wrap  gap-8 justify-center">
        {countries.map((country, index) => (
          <div
            key={index}
            className="group relative w-[280px] h-[300px] bg-slate-50 flex flex-col items-center justify-center gap-2 text-center rounded-2xl overflow-hidden before:content-[''] before:absolute before:top-0 before:left-0 before:w-80 before:h-24 before:rounded-t-2xl before:bg-cover before:bg-center before:transition-all before:duration-500 before:hover:scale-95 before:hover:h-72 before:hover:w-80 before:hover:rounded-b-2xl"
            style={{
              // Setting background image
              backgroundImage: `url(${country.background})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Circle with logo */}
            <div className="w-28 h-28 bg-white mt-8 rounded-full border-4 border-slate-50 z-10 overflow-hidden flex items-center justify-center transition-all duration-500 group-hover:scale-150 group-hover:-translate-x-24 group-hover:-translate-y-20">
              <img
                src={country.logo}
                alt={`${country.name} flag`}
                className="w-16 h-16 object-contain"
              />
            </div>

            {/* Country name */}
            <div className="z-10 transition-all duration-500 group-hover:-translate-y-10 bg-white/70 px-4 py-1 rounded-lg">
              <span className="text-2xl font-semibold">{country.name}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center my-14">
        <button
          type="submit"
          className="relative z-10 w-[200px] py-2 font-sans text-gray-50 rounded-xl bg-red-600 overflow-hidden
             before:content-[''] before:absolute before:inset-0 before:bg-transparent before:z-0
             hover:before:bg-blue-400 transition duration-300"
        >
          <span className="relative z-10 text-2xl">Apply For Service</span>
        </button>
      </div>
    </div>
  );
};

export default Country;
