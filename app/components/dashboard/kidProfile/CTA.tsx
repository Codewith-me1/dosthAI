import React from "react";

const CreateStoryCta: React.FC = () => {
  return (
    <div className="flex flex-col border-t-2 border-[#D5D5D5] mt-5 items-center justify-center text-center py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl sm:text-5xl md:text-6xl  text-gray-800 ">
        create new <span className="text-[#C099FF]">story</span>
      </h1>
      <p className="mt-3 text-base text-[#3A3A3A] sm:mt-4 sm:text-lg md:text-xl">
        Upgrade to create more stories and activities
      </p>
      <p className="mt-1 text-sm text-[#3A3A3A] sm:text-base md:text-lg">
        Starting <span className="text-[#C099FF]"> $4.99 /month</span>
      </p>
      <button
        className="mt-8 px-8 py-3 font-bold bg-[#6100FF] text-white text-base sm:text-lg  rounded-lg shadow-md  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6100FF] flex items-center group"
        aria-label="Explore plans for creating more stories and activities"
      >
        Explore Plans
      </button>
    </div>
  );
};

export default CreateStoryCta;
