import Image from "next/image";
import React from "react";

const HeroSection = () => {
  return (
    <div className="w-full overflow-hidden flex flex-col   md:flex-row justify-between 3xl:items-center 3xl:justify-around  z-10 pt-12 md:pt-16 md:pl-20  mx-auto">
      {/* Left Section */}

      <div className="space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
          <span className="text-[#6100FF]">Personalized AI - Powered</span>
          <br />
          Learning Tool for <br />
          Neurodivergent Individuals
        </h1>

        <div className="flex space-x-4">
          <button className="px-5 py-2 rounded-md bg-white border border-[#6100FF] text-[#6100FF] hover:bg-purple-100 transition">
            Book a Demo
          </button>
          <button className="px-5 py-2 rounded-md bg-[#6100FF] text-white  transition">
            Sign Up
          </button>
        </div>
      </div>

      {/* Right Section */}
      <div className=" relative">
        <div
          className="absolute overflow-hidden 3xl:w-[400vmin] 3xl:h-[400vmin] left-[80%] w-[200vmin] h-[200vmin] 
             bg-[url('/landingImg/hero-bg.png')] 
             bg-cover bg-center bg-no-repeat 
             opacity-90 -translate-x-1/2 -translate-y-1/2 rounded-full z-[-1]"
        ></div>
        <div className="relative w-100 h-120   -rotate-z-12  md:w-[30rem] md:h-[40rem]">
          <Image
            src="/landingImg/heroimage.png"
            alt="Cool Cat with Tablet"
            layout="fill"
            objectFit="cover"
            className="rounded-lg  mt-15"
          />
        </div>

        {/* Floating Card */}
        <div className="absolute bottom-20 md:-left-0 xl:-left-20 w-72 bg-yellow-100 rounded-2xl p-4 shadow-md rotate-[-6deg]">
          <div className="absolute top-[-50px] left-8  rounded-full flex items-center justify-center text-white font-bold text-lg">
            <Image
              src="/landingImg/kidswithbox.jpg"
              alt="Kids with packages"
              width={100}
              height={60}
              className="rounded-xl flex-shrink-0"
            />
          </div>
          <div className="flex pt-10 items-start space-x-3">
            <div>
              {/* Title */}
              <p className="text-sm font-semibold text-purple-600 leading-snug">
                Learn how to pack stuff?
              </p>
              {/* Description */}
              <p className="text-sm text-gray-700 mt-1">
                Lorum ipsum dolar ismet nej <br />
                ismt. Ipsum dolar
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
