import React from 'react'

const Services = () => {
  return (
    <div>
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

    </div>
  )
}

export default Services