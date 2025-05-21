"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const mainCardImageUrl = "/firefly.jpg";

const SkillTrainingCardsSection: React.FC = () => {
  return (
    <section className="w-full p-6 md:p-12 bg-slate-50 overflow-hidden">
      <div className="px-4">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">
          <div className="lg:w-1/2 text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-5">
              Explore Skill Training Cards
            </h1>
            <p className="text-base sm:text-lg text-gray-600 mb-8 leading-relaxed">
              Create therapy cards to provide, clear and actionable prompts to
              teach skills like emotion regulation, problem-solving and positive
              behaviors.
            </p>
            <button className="bg-yellow-400 text-gray-800 font-semibold px-8 py-3.5 rounded-lg text-md sm:text-lg hover:bg-yellow-500 transition-colors shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50">
              Explore Community Cards
            </button>
          </div>

          <div className="lg:w-1/2 w-full  mt-10 lg:mt-0">
            <div className="relative flex md:ml-50   lg:justify-start items-center h-[500px] group">
              {/* Back Text Card */}
              <div
                className="absolute bg-purple-100 border-4 border-yellow-400 rounded-2xl p-6 sm:p-8 shadow-lg
                w-[120px] h-[20rem]   md:w-[20rem] sm:w-[320px]  md:h-[25rem] min-h-[280px] sm:min-h-[300px]
                transform translate-y-5 opacity-0 group-hover:translate-x-70 group-hover:opacity-100
                transition-all duration-500 ease-in-out flex flex-col justify-center z-0"
              >
                <p className="text-purple-700  md:pl-5 text-sm sm:text-base md:text-lg leading-relaxed">
                  Create therapy cards to provide clear and actionable prompts
                  to teach skills like emotion regulation, problem-solving
                </p>
              </div>

              {/* Front Image Card */}
              <div
                className="absolute bg-white rounded-2xl shadow-2xl overflow-hidden
                w-[300px] sm:w-[280px] md:w-[320px] h-[330px] sm:h-[370px] md:h-[410px]
                border-4 border-yellow-400
                transform -rotate-3 group-hover:rotate-0 group-hover:scale-105 transition-transform duration-500 ease-in-out z-10"
              >
                {mainCardImageUrl && (
                  <Image
                    src={mainCardImageUrl}
                    alt="Skill Training Card Visual"
                    fill
                    style={{ objectFit: "cover" }}
                    priority
                    sizes="(max-width: 700px) 250px, (max-width: 768px) 280px, 320px"
                  />
                )}
              </div>

              {/* Yellow Arrow Button */}
              <div
                className="absolute bg-yellow-400 rounded-full p-2 sm:p-3 shadow-lg
                w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14
                flex items-center justify-center
                transform lg:translate-x-28 xl:translate-x-36 lg:translate-y-28 xl:translate-y-32
                -rotate-3 lg:rotate-0 z-20"
              >
                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-800" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillTrainingCardsSection;
