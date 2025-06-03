import { ArrowUpToLine } from "lucide-react";
import Image from "next/image";
import React from "react";

const PromptSection = () => {
  return (
    <section className="w-full 3xl:max-w-[200rem] 3xl:flex 3xl:justify-center 3xl:gap-[40rem] justify-between z-10 pt-12 md:pt-16 md:px-20 lg:px-20 xl:px-30  mx-auto mt-32 md:mt-48 flex flex-col md:flex-row items-center gap-12 md:gap-8 px-2">
      {" "}
      <div className="flex-1 flex max-w-3xl space-y-2 flex-col items-start tracking-wide justify-center text-center md:text-left">
        <h2 className="text-2xl sm:text-3xl leading-10 md:leading-12  mb-3">
          <span className="text-[#6100FF] font-bold">Create</span> engaging,
          customized social stories , task visuals, & therapy cards with a{" "}
          <span className="italic font-semibold text-black">simple prompt</span>
        </h2>
        <p className="text-gray-600 mb-6 tracking-wide leading-8 text-sm sm:text-base max-w-lg mx-auto md:mx-0">
          An AI-Assistant that empowers parents, behavioral analysts supporting
          neurodivergent community, built on AI-models trained using Applied
          Behavioral Analysis (ABA) Methodology
        </p>
        <a
          href="/explore"
          className="flex items-center gap-2 px-10 py-2.5 rounded-md border-3 border-[#6100FF] text-[#6100FF] font-semibold bg-white hover:bg-[#f3f0ff] transition mb-2 mx-auto md:mx-0"
        >
          Create Now <span className="text-lg font-bold">+</span>
        </a>
      </div>
      {/* Prompt Card with Floating Prompt */}
      <div className=" flex flex-col items-center mt-5 md:mt-0   sm:max-w-sm">
        <div className="relative w-full   ">
          <Image
            src="/landingImg/kidswithbox.jpg"
            alt="Prompt Card showing astronaut kids"
            width={380}
            height={220}
            className="rounded-2xl shadow-xl  -rotate-z-20 w-80 md:w-full object-cover"
          />
          {/* Floating Prompt */}
          <div className="absolute -bottom-0 md:left-1/3 md:-translate-x-1/2 w-[90%] md:w-[120%] bg-[#F3F8FF] rounded-xl shadow-lg flex items-center px-2 md:px-5 md:py-2.5 sm:px-4 sm:py-3 gap-2 border border-[#E0E0E0]">
            <span className="flex-1 text-xs sm:text-sm text-[#6100FF]  leading-tight">
              Create a story for 3 year old, about how to pack stuff?
            </span>
            <span className="bg-[#6100FF] text-[#FFF4CC] rounded-full  m-3 p-1 sm:w-7 sm:h-7 flex items-center justify-center font-bold text-lg">
              <ArrowUpToLine className="w-8 h-8 md:w-10 md:h-10" />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromptSection;
