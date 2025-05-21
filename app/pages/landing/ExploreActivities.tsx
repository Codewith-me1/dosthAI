"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

export default function ExploreActivities() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section
      ref={sectionRef}
      className="w-full flex flex-col md:flex-row items-center justify-between gap-8 p-6 md:p-12 bg-white"
    >
      {/* Left Section */}
      <div className="max-w-xl space-y-6">
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-900">
          Explore <span className="text-black font-bold">Activities</span>
        </h2>
        <p className="text-gray-700 text-base md:text-lg">
          Provides task visuals that offer{" "}
          <span className="text-purple-600 font-medium">step by step</span>{" "}
          guide for daily activities
        </p>
        <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium text-sm px-6 py-3 rounded-md">
          Explore Community Activities
        </button>
      </div>

      <div className="relative flex items-center justify-center  overflow-visible">
        {/* Step */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="absolute -left-10 bottom-5 z-[10] rotate-[-15deg] text-purple-600 font-bold text-xl bg-purple-100 px-4 py-1 rounded-lg shadow-md"
        >
          Step 1
        </motion.div>

        {/* Image 1  */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 * 1 }}
          className={`relative mt-20 z-[5] shadow-lg rounded-lg overflow-hidden w-28 h-40 md:w-36 md:h-52 lg:w-50 lg:h-80`}
        >
          <Image
            src="/act1.jpg"
            alt={`Activity`}
            fill
            className="object-cover"
          />
        </motion.div>

        {/* Image 2 */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 * 1 }}
          className={`relative z-[2] ml-[-30px]  shadow-lg rounded-lg overflow-hidden w-28 h-40 md:w-36 md:h-52 lg:w-50 lg:h-80`}
        >
          <Image
            src="/act2.jpg"
            alt={`Activity`}
            fill
            className="object-cover"
          />
        </motion.div>

        {/* Image 3  */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 * 1 }}
          className={`relative z-[3] mt-40 shadow-lg ml-[-20px] rounded-lg overflow-hidden w-28 h-40 md:w-36 md:h-52 lg:w-50 lg:h-80`}
        >
          <Image
            src="/act3.jpg"
            alt={`Activity`}
            fill
            className="object-cover"
          />
        </motion.div>

        {/* Image 4  */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 * 1 }}
          className={`relative z-[4] shadow-lg rounded-lg ml-[-20px] overflow-hidden w-28 h-40 md:w-36 md:h-52 lg:w-50 lg:h-80`}
        >
          <Image
            src="/act4.jpg"
            alt={`Activity`}
            fill
            className="object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
}
