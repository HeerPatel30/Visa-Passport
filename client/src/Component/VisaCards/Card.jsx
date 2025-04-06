import React from "react";
import { motion } from "framer-motion";

import card1 from "../../assets/card1.jpeg";
import card2 from "../../assets/card2.avif";
import card3 from "../../assets/card3.avif";
import card4 from "../../assets/card4.avif";
import card5 from "../../assets/card5.avif";
import card6 from "../../assets/card6.avif";

const cardData = [
  { img: card1, title: "Job Visa" },
  { img: card2, title: "Travel Visa" },
  { img: card3, title: "Work Permit" },
  { img: card4, title: "Student Visa" },
  { img: card5, title: "Permanent Residency" },
  { img: card6, title: "Tourist Visa" },
];

const Card = () => {
  return (
    <>
      <div className="flex items-center justify-center gap-2 my-6 leading-none">
        {/* Left lines */}
        <div className="flex flex-col items-end justify-center gap-[16px]">
        <div className="w-16 h-[2px] bg-red-600" />
        <div className="w-32 h-[2px] bg-blue-600" />
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-bold text-gray-800 whitespace-nowrap leading-none m-0 p-0">
          VISA CATEGORIES
        </h1>

        {/* Right lines */}
        <div className="flex flex-col items-start justify-center gap-[16px]">
          <div className="w-16 h-[2px] bg-red-600" />
          <div className="w-32 h-[2px] bg-blue-600" />
        </div>
      </div>
      <div className="flex flex-col  items-center justify-center">
        <h1 className="text-5xl text-center"> Enabling Your Immigration  <br /> <h1 className="text-4xl text-center py-2">Successfully</h1> </h1>
        <p className="text-center text-gray-500 py-6 ">Lorem ipsum dolor, sit amet consectetur adipisicing elit.<br/> Alias sed deserunt animi reiciendis et quia, adipisci veniam, aperiam voluptates vel rem quidem eum omnis officia suscipit. Rem eum perferendis corporis!</p>
      </div>
      <div className="flex flex-wrap justify-center gap-6 py-11">
        {cardData.map((card, index) => (
          <motion.div
            key={index}
            className="rounded-2xl w-[350px] overflow-hidden shadow-xl bg-white"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
          >
            <img
              src={card.img}
              alt={card.title}
              className="rounded-t-2xl h-60 w-full object-cover"
            />

            <div className="p-5 text-xl">
              <h1 className="font-extrabold text-gray-700 py-2">
                {card.title}
              </h1>

              <p className="text-gray-700 text-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel
                explicabo reiciendis, ex aliquam nobis.
              </p>

              <button className="mt-4 px-4 py-1 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 transition">
                Explore More
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default Card;
