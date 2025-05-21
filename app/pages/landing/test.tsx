"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";

// Define the structure for an image item
interface StoryImage {
  id: number;
  thumbnailUrl: string; // Path to the thumbnail image
  fullUrl: string; // Path to the full-size image
  alt: string;
}

// Sample data for the images - replace with your actual image data
const storyImagesData: StoryImage[] = [
  {
    id: 1,
    thumbnailUrl: "/img1.jpg",
    fullUrl: "/img1.jpg",
    alt: "Social Story Scene 1",
  },
  {
    id: 2,
    thumbnailUrl: "/img2.jpg",
    fullUrl: "/img2.jpg",
    alt: "Social Story Scene 2",
  },
  {
    id: 3,
    thumbnailUrl: "/img3.jpg",
    fullUrl: "/img3.jpg",
    alt: "Social Story Scene 3",
  },
  {
    id: 4,
    thumbnailUrl: "/img4.jpg",
    fullUrl: "/img4.jpg",
    alt: "Social Story Scene 4",
  },
  {
    id: 5,
    thumbnailUrl: "/img5.jpg",
    fullUrl: "/img5.jpg",
    alt: "Social Story Scene 5",
  },
];

const IMAGE_CYCLE_DURATION = 5000; // 5 seconds

const SocialStoriesSection: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(true);

  const selectedImage = storyImagesData[currentImageIndex];

  // Function to go to the next image
  const nextImage = useCallback(() => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex + 1) % storyImagesData.length
    );
  }, []);

  // Handle thumbnail click
  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index);
    setIsTimerActive(false); // Stop timer on manual click
    // Optionally, restart timer after a delay if desired
    setTimeout(() => setIsTimerActive(true), IMAGE_CYCLE_DURATION * 2);
  };

  // Effect for automatic image cycling
  useEffect(() => {
    if (!isTimerActive) return;

    const timer = setInterval(() => {
      nextImage();
    }, IMAGE_CYCLE_DURATION);

    return () => clearInterval(timer); // Cleanup timer on component unmount or when isTimerActive changes
  }, [isTimerActive, nextImage]);

  return (
    <section className="w-full my-10  p-6 md:p-12 bg-slate-50">
      <div className="px-4">
        <div className=" lg:w-8/12 text-center lg:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Explore Social Stories
          </h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 md:gap-16 justify-between ">
          {/* Left Text Content */}
          <div className="flex-1 text-center lg:text-left">
            <p className="text-lg text-gray-600 mb-8">
              Personalized{" "}
              <span className="text-purple-600 font-semibold">
                social stories
              </span>
              , help individuals prepare for real world situations.
            </p>
            <button className="bg-yellow-400 text-gray-800 font-semibold px-8 py-3 rounded-lg text-lg hover:bg-yellow-500 transition-colors shadow-md hover:shadow-lg">
              Explore Community Stories
            </button>
          </div>

          {/* Right Image Gallery */}
          <div className="flex-1  w-full md:ml-100">
            <div className="relative mb-4">
              {/* "Plan a trip for us!" overlay text */}
              <div className="absolute top-0  -translate-x-1/3 -mt-6 md:-mt-8 z-20">
                <div className="bg-[#DFCCFF] text-[#6100FF] text-xl md:text-3xl font-bold px-6 py-3 rounded-lg shadow-lg whitespace-nowrap">
                  Plan a trip for us!
                </div>
              </div>

              {/* Main Displayed Image */}
              <div className="relative rounded-lg w-full md:flex md:align-middle overflow-hidden ">
                {selectedImage && (
                  <img
                    src={selectedImage.fullUrl}
                    alt={selectedImage.alt}
                    style={{ objectFit: "cover" }}
                    className="rounded-lg w-[50rem] md:h-[40rem] md:w-[80%] shadow-2xl "
                  />
                )}
              </div>
            </div>

            {/* Thumbnails */}
          </div>
        </div>
        <div className="grid md:mt-[-12rem] w-full  lg:max-w-3xl mx-auto grid-cols-3 sm:grid-cols-5 gap-2 md:gap-3">
          {storyImagesData.map((image, index) => (
            <div
              key={image.id}
              className={`relative aspect-square rounded-md overflow-hidden cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105
                              ${
                                index === currentImageIndex
                                  ? "ring-4 ring-purple-500 ring-offset-2 shadow-lg"
                                  : "ring-1 ring-gray-300 hover:ring-purple-400"
                              }`}
              onClick={() => handleThumbnailClick(index)}
            >
              <Image
                src={image.thumbnailUrl}
                alt={`Thumbnail: ${image.alt}`}
                fill
                style={{ objectFit: "cover" }}
                sizes="20vw"
              />
              {index === currentImageIndex && (
                <div className="absolute  inset-0  bg-opacity-20"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialStoriesSection;
