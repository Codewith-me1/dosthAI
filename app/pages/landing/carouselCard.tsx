"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ChevronRight, Sun, Sunset } from "lucide-react";
import Image from "next/image";
import React from "react";

const CarouselCard = () => {
  return (
    <section className="w-full mt-32 md:mt-40 px-4 md:px-6">
      <Swiper
        modules={[]}
        spaceBetween={10}
        slidesPerView={1}
        pagination={{ clickable: true }}
        breakpoints={{
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 2.5,
          },
        }}
        className="!pb-10 md:!pl-16 lg:!pl-[15rem]"
      >
        {/* Slide 1 */}
        <SwiperSlide>
          <div className="bg-[#FBFDFF] max-w-full md:max-w-[40rem] h-auto md:h-[36rem] rounded-2xl p-6 md:p-10 flex flex-col gap-4 border border-[#C099FF]">
            <h3 className="text-2xl md:text-3xl mb-1">
              Create{" "}
              <span className="text-[#3A3A3A] font-extrabold">Routines</span>
            </h3>
            <p className="text-gray-600 text-md mb-2">
              set <span className="text-[#7B2FF2]">Routines</span>, for your
              kids to help them <br className="hidden md:block" /> categories
            </p>
            <div className="flex flex-col gap-4">
              {/* Morning Routine */}
              <div className="flex items-center justify-between w-full max-w-[50%] px-5 py-3 bg-[#FBFDFF] border border-gray-300 rounded-md hover:shadow-sm transition">
                <div className="flex items-center gap-2">
                  <Sun className="w-4 h-4 text-[#7B2FF2]" />
                  <span className="text-sm font-medium text-gray-800">
                    Morning Routine
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>

              {/* Routine Cards */}
              <div className="relative flex items-center space-x-4 ml-10 sm:ml-20">
                <div className="absolute -left-10 top-0 hidden sm:flex flex-col items-center">
                  <Image src="/Arrow1.svg" width={25} height={10} alt="arrow" />
                </div>

                {/* Back Card */}
                <div className="w-36 sm:w-40 h-36 sm:h-40 bg-[#F8FAFF] border border-gray-200 rounded-xl p-3 absolute left-6 top-2 z-0">
                  <div className="bg-[#FFF4CC] h-16 rounded-lg mb-2"></div>
                  <div className="bg-[#FFE580] h-2 w-3/4 rounded-full mb-1 mt-2"></div>
                  <div className="bg-[#FFE580] h-2 w-2/3 rounded-full mb-4"></div>
                  <div className="text-right text-[#B088F9]">
                    <span className="text-sm">→</span>
                  </div>
                </div>

                {/* Front Card */}
                <div className="w-36 sm:w-40 h-36 sm:h-40 bg-white border border-gray-200 rounded-xl p-3 z-10">
                  <div className="bg-[#FFF4CC] h-16 rounded-lg mb-2"></div>
                  <div className="bg-[#FFE580] h-2 w-3/4 rounded-full mb-1 mt-2"></div>
                  <div className="bg-[#FFE580] h-2 w-2/3 rounded-full mb-4"></div>
                  <div className="text-right text-[#B088F9]">
                    <span className="text-sm">→</span>
                  </div>
                </div>
              </div>

              {/* Evening Routine */}
              <div className="flex items-center justify-between w-full max-w-[50%]  px-5 py-3 bg-[#FBFDFF] border border-gray-300 rounded-md hover:shadow-sm transition ml-5 sm:ml-10">
                <div className="flex items-center gap-2">
                  <Sunset className="w-5 h-5 text-[#7B2FF2]" />
                  <span className="text-sm font-medium text-gray-800">
                    Evening Routine
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>

              {/* Add New Button */}
              <div className="flex items-center gap-2 mt-[-10px] ml-10 sm:ml-20">
                <Image alt="Arrow" src="/Arrow2.svg" width={30} height={10} />
                <button className="flex items-center border-[#D5D5D5] border px-5 py-2 rounded-md gap-1 text-md mt-2 hover:underline">
                  <span className="text-2xl text-[#7B2FF2]">+</span> Add new
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2 - Multiple Profiles */}
        <SwiperSlide>
          <div className="bg-[#FBFDFF] max-w-full md:max-w-[40rem] h-auto md:h-[36rem] rounded-2xl p-6 md:p-10 flex flex-col gap-4 border border-[#C099FF]">
            <h3 className="text-2xl md:text-3xl mb-1">
              Create{" "}
              <span className="text-[#3A3A3A] font-extrabold">
                Multiple Profiles
              </span>
            </h3>
            <p className="text-gray-600 text-md mb-2">
              BCBA can add kids and manage them in one place
            </p>
            <div className="relative">
              <Image alt="Alex" src="/AlexGrp.png" width={300} height={50} />
              <div className="absolute top-[10rem] left-0 md:left-10 flex items-center space-x-4">
                <div className="w-36 sm:w-40 h-36 sm:h-40 bg-[#F8FAFF] border border-gray-200 rounded-xl p-3 absolute left-6 top-2 z-0">
                  <div className="bg-[#FFF4CC] h-16 rounded-lg mb-2"></div>
                  <div className="bg-[#FFE580] h-2 w-3/4 rounded-full mb-1 mt-2"></div>
                  <div className="bg-[#FFE580] h-2 w-2/3 rounded-full mb-4"></div>
                  <div className="text-right text-[#B088F9]">
                    <span className="text-sm">→</span>
                  </div>
                </div>
                <div className="w-36 sm:w-40 h-36 sm:h-40 bg-white border border-gray-200 rounded-xl p-3 z-10">
                  <div className="bg-[#FFF4CC] h-16 rounded-lg mb-2"></div>
                  <div className="bg-[#FFE580] h-2 w-3/4 rounded-full mb-1 mt-2"></div>
                  <div className="bg-[#FFE580] h-2 w-2/3 rounded-full mb-4"></div>
                  <div className="text-right text-[#B088F9]">
                    <span className="text-sm">→</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 3 - Assessment Plans */}
        <SwiperSlide>
          <div className="bg-[#FBFDFF] max-w-full md:max-w-[40rem] h-auto md:h-[36rem]  rounded-2xl p-6 md:p-8 flex flex-col gap-4 border border-[#C099FF] shadow-lg">
            <h3 className="text-3xl md:text-4xl mb-1 text-[#3A3A3A]">
              Create<span className="text-[#B088F9]">*</span>{" "}
              <span className="font-extrabold">Assessment Plans</span>
            </h3>
            <p className="text-gray-500 text-base mb-3">
              BCBA can create assessments for levels, and types!
            </p>
            <div className="flex gap-3 flex-wrap mb-6">
              <p className="bg-[#E6D9FF] text-[#6D28D9] px-5 py-1.5 rounded-full text-sm font-medium">
                Level 2
              </p>
              <p className="bg-[#E6D9FF] text-[#6D28D9] px-5 py-1.5 rounded-full text-sm font-medium">
                Imitation Skills
              </p>
            </div>

            <div className="flex items-center justify-start h-[150px] md:h-[180px] relative mb-6 md:mb-8 pl-4">
              <div className="relative w-[240px] h-[150px] md:w-[280px] md:h-[170px]">
                <div className="w-[130px] h-[130px] md:w-[150px] md:h-[150px] bg-white border border-gray-200 rounded-xl p-3 absolute left-10 top-2 md:left-12 md:top-3 shadow-md">
                  <div className="bg-[#FFF9E6] h-14 md:h-16 rounded-lg mb-2"></div>
                  <div className="bg-[#FFE580] h-2 w-10/12 rounded-full mb-1.5 mt-3"></div>
                  <div className="bg-[#FFE580] h-2 w-8/12 rounded-full mb-3"></div>
                  <div className="text-right text-[#B088F9] pr-1">
                    <span className="text-xl font-semibold">&#8594;</span>
                  </div>
                </div>
                <div className="w-[130px] h-[130px] md:w-[150px] md:h-[150px] bg-white border border-gray-200 rounded-xl p-3 absolute left-0 top-0 z-10 shadow-lg">
                  <div className="bg-[#FFF9E6] h-14 md:h-16 rounded-lg mb-2"></div>
                  <div className="bg-[#FFE580] h-2 w-10/12 rounded-full mb-1.5 mt-3"></div>
                  <div className="bg-[#FFE580] h-2 w-8/12 rounded-full mb-3"></div>
                  <div className="text-right text-[#B088F9] pr-1">
                    <span className="text-xl font-semibold">&#8594;</span>
                  </div>
                </div>
              </div>

              <div className="w-[100px] h-[100px] md:w-[120px] md:h-[120px] border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center ml-[-20px] md:ml-[-10px] z-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 md:h-12 md:w-12 text-[#B088F9]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </div>
            </div>

            <p className="text-gray-500 text-xs text-center md:text-left mt-auto">
              *or can choose from BCBA's certified created assessments for all
              levels, and skills
            </p>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default CarouselCard;
