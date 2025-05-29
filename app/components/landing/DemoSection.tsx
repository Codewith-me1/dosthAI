import React from "react";

const DemoSection = () => {
  return (
    <section className="w-full 3xl:max-w-[170rem]   mx-auto mt-24 mb-16 md:pt-16 md:px-20 lg:px-20 xl:px-30  px-2">
      <div className=" rounded-2xl   p-8 flex flex-col md:flex-row items-center justify-between gap-6 ">
        {" "}
        <div className="flex-1 flex flex-col md:items-start text-center md:text-left">
          <h3 className="text-4xl  md:text-5xl font-bold text-[#3A3A3A] mb-2">
            Request a <span className="text-[#6100FF]">Demo!</span>
          </h3>
          <p className="text-gray-600 text-lg mb-4 max-w-md">
            Get a detailed walk-thru of the features and possibilities for BCBA!
          </p>{" "}
        </div>
        <div className="flex items-center justify-center md:mt-4 ">
          <button className="px-20 md:px-60 py-3 rounded-lg bg-[#6100FF] text-white font-semibold shadow hover:bg-[#6100FF] transition mx-auto md:mx-0">
            Request
          </button>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;
