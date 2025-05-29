import React from "react";
import { FaMapLocation } from "react-icons/fa6";
import { IoTimerOutline } from "react-icons/io5";
import { IoIosCall } from "react-icons/io";
const ContactUs = () => {
  return (
    <div className="px-4 md:px-20 py-12 bg-white">
      <div className="grid md:grid-cols-2 gap-12">
        {/* Left Column */}
        <div>
          <h4 className="text-red-600 font-bold uppercase tracking-wide text-sm">Quick Contact</h4>
          <h1 className="text-4xl font-extrabold text-blue-900 leading-snug mb-4">
            Have Questions? Don't <br /> Hesitate to Contact Us
          </h1>
          <p className="text-gray-500 mb-8">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat totam deserunt
            tempora. Tempore neque necessitatibus corporis error earum sint quae?
          </p>

          <div className="mb-6 flex gap-4 items-start">
            <div className="bg-gray-100 p-4 rounded-xl">
              <i className="FaMapLocation text-blue-900 text-2xl"></i>
              <FaMapLocation className=" text-blue-900 text-2xl"/>
            </div>
            <div>
              <h3 className="text-blue-900 font-bold text-lg">Location</h3>
              <p className="text-gray-500">
                123, First Floor, 123 St Roots Terrace, Los Angeles 90010 Unitd States of America.
              </p>
            </div>
          </div>

          <div className="mb-6 grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-blue-900 font-bold flex items-center gap-2">
                   <IoIosCall  className=" text-blue-900 text-2xl"/>Quick Contact
              </h3>
              <p className="text-gray-500 mt-1">
                Phone: <a href="tel:+01234567890">+012 3456 7890</a>
              </p>
              <p className="text-gray-500">Email: travisa@example.com</p>
            </div>
            <div>
              <h3 className="text-blue-900 font-bold flex items-center gap-2">
                  <IoTimerOutline  className=" text-blue-900 text-2xl"/> Opening Hrs
              </h3>
              <p className="text-gray-500 mt-1">Mon – Friday: 09.00 am to 07.00 pm</p>
              <p className="text-gray-500">Saturday: 10.00 am to 05.00 pm</p>
            </div>
          </div>
        </div>

        {/* Right Column - Contact Form */}
        <div>
          <h4 className="text-red-600 font-bold uppercase tracking-wide text-sm">Let’s Connect</h4>
          <h1 className="text-4xl font-extrabold text-blue-900 leading-snug mb-4">
            Send Your Message
          </h1>
          <p className="text-gray-500 mb-6">
            The contact form is currently inactive. Get a functional and working contact form
            with Ajax & PHP in a few minutes. Just copy and paste the files, add a little code and
            you're done. <a href="#" className="text-blue-700 font-bold">Download Now.</a>
          </p>

          <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Your Name"
              className="border rounded-lg px-4 py-3 text-gray-600"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="border rounded-lg px-4 py-3 text-gray-600"
            />
            <input
              type="tel"
              placeholder="Your Phone"
              className="border rounded-lg px-4 py-3 text-gray-600"
            />
            <input
              type="text"
              placeholder="Your Project"
              className="border rounded-lg px-4 py-3 text-gray-600"
            />
            <input
              type="text"
              placeholder="Subject"
              className="border rounded-lg px-4 py-3 text-gray-600 col-span-2"
            />
            <textarea
              rows="4"
              placeholder="Message"
              className="border rounded-lg px-4 py-3 text-gray-600 col-span-2"
            ></textarea>
            <button
              type="submit"
              className="bg-red-600 text-white text-lg font-semibold py-3 rounded-lg col-span-2 hover:bg-blue-600 transition duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;