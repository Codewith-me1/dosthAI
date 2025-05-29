"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";
import {
  X,
  Image as ImageIcon,
  RefreshCw,
  Info,
  Plus,
  ArrowLeft,
  Pen,
} from "lucide-react";

interface Storyline {
  id: string; 
  title: string;
  makePublic: boolean;
  mainImage: string;
  generatedImages: string[];
  isLoadingImages: boolean;
}

const initialStorylinesData: Omit<
  Storyline,
  "generatedImages" | "isLoadingImages" | "mainImage" | "id"
>[] = [
  {
    title: "How to pack my stuff for short camping trip in the woods?",
    makePublic: true,
  },
  {
    title: "Weekend getaway: Exploring the city's hidden gems.",
    makePublic: true,
  },
  {
    title: "A culinary adventure: Trying out new recipes.",
    makePublic: true,
  },
];

// Function to generate a unique ID
const generateId = () => Math.random().toString(36).substr(2, 9);

const Test: React.FC = () => {
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [deleteConfirmed, setDeleteConfirmed] = useState(false);
  const [showEditTitleModal, setShowEditTitleModal] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editMakePublic, setEditMakePublic] = useState(true);

  const [showAddTitlePopup, setShowAddTitlePopup] = useState(false);
  const [storyTitle, setStoryTitle] = useState("");
  const [requestPublic, setRequestPublic] = useState(true);

  const [storylines, setStorylines] = useState<Storyline[]>(
    initialStorylinesData.map((story, index) => ({
      ...story,
      id: generateId(), // Assign a unique ID
      mainImage: `/dummyimage.jpg`,
      generatedImages: [],
      isLoadingImages: false,
    }))
  );

  // State to track the currently active/selected storyline
  const [activeStorylineIndex, setActiveStorylineIndex] = useState<number>(0);
  const storylineRefs = useRef<(HTMLDivElement | null)[]>([]);

  const router = useRouter();

  useEffect(() => {
    // Ensure storylineRefs array is up-to-date with storylines
    storylineRefs.current = storylineRefs.current.slice(0, storylines.length);
  }, [storylines.length]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (deleteConfirmed) {
      timer = setTimeout(() => {
        setShowDeletePopup(false);
        setDeleteConfirmed(false);
        // Add logic here if you need to remove a storyline and reset active index
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [deleteConfirmed]);

  const handleGenerateImages = async (storylineIndex: number) => {
    setStorylines((prev) =>
      prev.map((story, index) =>
        index === storylineIndex
          ? { ...story, isLoadingImages: true, generatedImages: [] }
          : story
      )
    );

    await new Promise((resolve) => setTimeout(resolve, 1500)); // Shorter delay

    const newGeneratedImages = [
      `/Kids.jpg?gen=${Math.random()}`,
      `/dummyimage.jpg?gen=${Math.random()}`,
      `/Kids.jpg?gen=${Math.random()}`,
    ];

    setStorylines((prev) =>
      prev.map((story, index) =>
        index === storylineIndex
          ? {
              ...story,
              generatedImages: newGeneratedImages,
              isLoadingImages: false,
            }
          : story
      )
    );
  };

  const handleChangeMainImage = (
    storylineIndex: number,
    newImageSrc: string
  ) => {
    setStorylines((prev) =>
      prev.map((story, index) =>
        index === storylineIndex ? { ...story, mainImage: newImageSrc } : story
      )
    );
  };

  const handleOpenAddTitlePopup = () => {
    setStoryTitle(
      storylines[activeStorylineIndex]?.title || "My Awesome Story"
    );
    setRequestPublic(storylines[activeStorylineIndex]?.makePublic || true);
    setShowAddTitlePopup(true);
  };

  const handleSaveStoryTitle = () => {
    console.log("Overall Story Title:", storyTitle);
    console.log("Overall Request Public:", requestPublic);
    // Here you would typically save the overall story settings
    setShowAddTitlePopup(false);
  };

  const handleThumbnailClick = (index: number) => {
    setActiveStorylineIndex(index);
    // Scroll to the storyline element
    const storylineElement = storylineRefs.current[index];
    if (storylineElement) {
      storylineElement.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  };

  const handleAddNewStoryline = () => {
    const newStoryline: Storyline = {
      id: generateId(),
      title: `New Storyline ${storylines.length + 1}`,
      makePublic: false,
      mainImage: `/dummyimage${(storylines.length % 3) + 1}.jpg`, // Cycle through dummy images
      generatedImages: [],
      isLoadingImages: false,
    };
    setStorylines((prev) => [...prev, newStoryline]);
    setActiveStorylineIndex(storylines.length); // Activate the new storyline
    // Scroll to the new storyline after a brief delay to allow rendering
    setTimeout(() => {
      const newStorylineElement = storylineRefs.current[storylines.length];
      if (newStorylineElement) {
        newStorylineElement.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
    }, 100);
  };

  return (
    <div className=" font-sans">
      {/* Top bar */}
      <h1 className="px-5 text-gray-500">Explore/Create Story</h1>

      <div className="flex justify-between items-center px-1 md:px-4 py-3 sticky top-0 bg-white z-20">
        <div className="flex items-center gap-2">
          <button className="p-2 rounded " onClick={() => router.back()}>
            <span className="text-xl flex text-[#6100FF] border-2 hover:bg-[#6100FF] hover:text-white border-[#6100FF] p-2 rounded-lg">
              <ArrowLeft size={20} />
            </span>
          </button>
          <h1 className="text-1xl md:text-3xl font-semibold text-gray-800 ">
            {storylines[activeStorylineIndex]?.title || "Create Your Story"}
          </h1>
        </div>
        <div>
          <a
            href="/createStory"
            className="text-sm text-[#2E74FF] flex items-center hover:underline"
          >
            <Pen className="inline mr-1" size={16} />
            Edit Prompt?
          </a>
        </div>
      </div>

      <div className="flex mx-auto flex-col md:flex-row max-w-7xl  w-full">
        {/* Sidebar Thumbnails */}
        <h1 className="font-semibold block md:hidden text-gray-800 text-center">
          Storyline
        </h1>
        <div className="md:sticky overflow-hidden md:top-[61px] md:h-[calc(100vh-61px)]  flex md:flex-col gap-2 p-4 md:w-24 w-full justify-center md:justify-start items-center md:items-start border-r border-gray-200 md:border-r-0 md:border-b-0 bg-white md:bg-transparent">
          <h1 className="font-semibold hidden md:block text-gray-800">
            Storyline
          </h1>
          {storylines.map((story, idx) => (
            <div
              key={story.id}
              onClick={() => handleThumbnailClick(idx)}
              className={`w-16 h-16 rounded-lg border-2 ${
                idx === activeStorylineIndex
                  ? "border-[#6100FF] ring-2 ring-[#6100FF] ring-offset-1"
                  : "border-gray-300 hover:border-gray-400 opacity-75"
              } overflow-hidden cursor-pointer transition-all duration-150 ease-in-out flex-shrink-0`}
            >
              <Image
                src={story.mainImage}
                alt={`Storyline ${idx + 1} Thumbnail`}
                width={64}
                height={64}
                className="object-cover w-full h-full"
                priority={idx < 3} // Prioritize first few images
              />
            </div>
          ))}
          <button
            onClick={handleAddNewStoryline}
            title="Add new storyline"
            className="w-16 h-16 rounded-lg border-2 border-dashed border-gray-400 flex items-center justify-center bg-gray-50 hover:bg-gray-100 text-2xl font-semibold text-gray-500 hover:text-[#A259FF] hover:border-[#A259FF] transition-colors mt-2 flex-shrink-0"
          >
            <Plus size={28} />
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 md:ml-5  bg-white space-y-8">
          {storylines.map((story, idx) => (
            <div
              key={story.id}
              id={`storyline-${idx}`} // Added ID for scrolling
              className={`flex flex-col md:flex-row items-start gap-6 pt-6 pb-8 border-b border-gray-200 last:border-b-0 transition-opacity duration-300 ${
                idx === activeStorylineIndex
                  ? "opacity-100"
                  : "opacity-100 hover:opacity-100"
              }`}
            >
              <div className="w-full md:w-[400px] h-[400px] rounded-xl overflow-hidden flex-shrink-0 bg-gray-100 shadow-md">
                <Image
                  src={story.mainImage}
                  alt={`Storyline ${idx + 1} Main Image`}
                  width={300}
                  height={300}
                  className="object-cover w-full h-full"
                  priority={idx === activeStorylineIndex}
                />
              </div>
              <div className="flex-1 space-y-3 p-5">
                <p className="text-lg font-bold text-gray-700">
                  Storyline ({idx + 1}/{storylines.length})
                </p>
                <div className="p-3">
                  <p className="text-lg text-gray-700 leading-relaxed min-h-[40px]">
                    {story.title}
                  </p>
                  <button
                    className="text-[#2E74FF] text-sm font-medium flex items-center gap-1.5 hover:underline"
                    onClick={() => {
                      setEditTitle(story.title);
                      setEditMakePublic(story.makePublic);
                      setEditingIndex(idx);
                      setShowEditTitleModal(true);
                    }}
                  >
                    <span>✎</span> Edit Storyline
                  </button>

                  {/* "Change Image?" section - now conditional on activeStorylineIndex */}
                  {idx === activeStorylineIndex && (
                    <div className="mt-4 pt-4 ">
                      <div className="flex items-center gap-5">
                        <span className="text-lg text-black font-medium">
                          Change Image?
                        </span>

                        <button
                          onClick={() => handleGenerateImages(idx)}
                          className="text-xs text-[#2E74FF] font-semibold hover:underline disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                          disabled={story.isLoadingImages}
                        >
                          {story.isLoadingImages ? (
                            <>
                              <RefreshCw className="w-3 h-3 animate-spin" />
                              Generating...
                            </>
                          ) : (
                            "✨ Generate Images"
                          )}
                        </button>
                      </div>
                      <p className="text-sm mb-3 text-gray-600">
                        10 coins/images
                      </p>

                      <div className="grid w-full max-w-[20rem] grid-cols-3 gap-2 md:gap-3">
                        {story.isLoadingImages
                          ? [...Array(3)].map((_, i) => (
                              <div
                                key={`loading-gen-${i}`}
                                className="aspect-square bg-gray-200 rounded-lg border border-gray-300 flex items-center justify-center animate-pulse"
                              >
                                <RefreshCw className="w-6 h-6 text-gray-400 " />
                              </div>
                            ))
                          : (story.generatedImages.length > 0
                              ? story.generatedImages
                              : [...Array(3)].map(() => null)
                            ) // Ensure 3 placeholders if no images
                              .map((imgSrc, imgIdx) =>
                                imgSrc ? (
                                  <button
                                    key={`gen-${imgIdx}-${story.id}`}
                                    onClick={() =>
                                      handleChangeMainImage(idx, imgSrc)
                                    }
                                    className="aspect-square rounded-lg border-2 border-gray-200 hover:border-[#A259FF] focus:outline-none focus:border-[#A259FF] overflow-hidden transition-all"
                                  >
                                    <Image
                                      src={imgSrc}
                                      alt={`Generated Image ${imgIdx + 1}`}
                                      width={100}
                                      height={100}
                                      className="object-cover w-full h-full"
                                    />
                                  </button>
                                ) : (
                                  <div
                                    key={`placeholder-gen-${imgIdx}-${story.id}`}
                                    className="aspect-square bg-gray-100 rounded-lg border border-gray-300 flex items-center justify-center"
                                  >
                                    <ImageIcon className="w-6 h-6 text-gray-400" />
                                  </div>
                                )
                              )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 mt-4">
            <div>
              <button
                className="text-red-600 hover:underline text-sm font-medium"
                onClick={() => setShowDeletePopup(true)} // Consider which draft to delete
              >
                Delete Story
              </button>
            </div>
            <div className="flex gap-3">
              <button
                className="px-6 py-2.5 font-semibold border-[#A259FF] border-2 text-[#A259FF] rounded-lg hover:bg-[#A259FF] hover:text-white transition-colors text-sm"
                onClick={() =>
                  console.log("Save All Storylines as Draft:", storylines)
                }
              >
                Save Draft
              </button>
              <button
                onClick={handleOpenAddTitlePopup}
                className="px-8 py-2.5 bg-[#A259FF] text-white font-semibold rounded-lg hover:bg-[#8e4de6] transition-colors text-sm"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Popup */}
      {showDeletePopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-sm mx-auto relative animate-fadeIn">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
              onClick={() => {
                setShowDeletePopup(false);
                setDeleteConfirmed(false);
              }}
              aria-label="Close"
            >
              <X size={20} />
            </button>
            <h2 className="text-xl font-semibold mb-2 text-gray-800">
              Delete Storyline?
            </h2>
            <p className="text-gray-500 mb-6 text-sm">
              Are you sure you want to delete storyline{" "}
              {activeStorylineIndex + 1}? This action cannot be undone.
            </p>
            {!deleteConfirmed ? (
              <div className="flex justify-end items-center gap-3 mt-4">
                <button
                  className="px-4 py-2 text-gray-700 font-medium hover:bg-gray-100 rounded-md text-sm"
                  onClick={() => setShowDeletePopup(false)}
                >
                  No, Keep it
                </button>
                <button
                  className="px-4 py-2 bg-red-500 text-white font-semibold hover:bg-red-600 rounded-md text-sm"
                  onClick={() => {
                    // Implement actual deletion logic
                    setStorylines((prev) =>
                      prev.filter((_, i) => i !== activeStorylineIndex)
                    );
                    if (
                      activeStorylineIndex >= storylines.length - 1 &&
                      storylines.length > 1
                    ) {
                      setActiveStorylineIndex((prev) => Math.max(0, prev - 1));
                    } else if (storylines.length === 1) {
                      // if it was the last one
                      // Handle case where all storylines are deleted, perhaps add a default one or show empty state
                      setActiveStorylineIndex(0); // Or -1 if you have an empty state
                    }
                    setDeleteConfirmed(true);
                  }}
                >
                  Yes, Delete
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-3 mt-4 p-4 bg-green-50 rounded-md">
                <span className="text-4xl text-green-500">✔</span>
                <span className="text-green-700 font-medium">
                  Storyline Deleted!
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Edit Storyline Title Modal */}
      {showEditTitleModal && editingIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md mx-auto relative animate-fadeIn">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
              onClick={() => setShowEditTitleModal(false)}
              aria-label="Close"
            >
              <X size={20} />
            </button>
            <h2 className="text-xl font-semibold mb-1 text-gray-800">
              Edit Storyline {editingIndex + 1}
            </h2>
            <p className="text-gray-500 mb-5 text-sm">
              Update the title and publicity for this part of your story.
            </p>
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              placeholder="Enter storyline title"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 mb-4 text-base focus:outline-none focus:ring-2 focus:ring-[#A259FF] focus:border-[#A259FF]"
            />
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                checked={editMakePublic}
                onChange={(e) => setEditMakePublic(e.target.checked)}
                id={`editMakePublic-${editingIndex}`}
                className="accent-[#A259FF] w-4 h-4 mr-2 cursor-pointer"
              />
              <label
                htmlFor={`editMakePublic-${editingIndex}`}
                className="text-sm text-gray-600 cursor-pointer"
              >
                Make this storyline segment public
              </label>
            </div>

            <div className="flex justify-end gap-3 mt-4">
              <button
                className="px-5 py-2.5 font-semibold border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors text-sm"
                onClick={() => setShowEditTitleModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-6 py-2.5 bg-[#A259FF] text-white rounded-lg font-semibold hover:bg-[#8e4de6] transition-colors text-sm"
                onClick={() => {
                  setStorylines((prev) =>
                    prev.map((s, i) =>
                      i === editingIndex
                        ? { ...s, title: editTitle, makePublic: editMakePublic }
                        : s
                    )
                  );
                  setShowEditTitleModal(false);
                }}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add a title Popup (Overall Story) */}
      {showAddTitlePopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md mx-auto relative animate-fadeIn">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              onClick={() => setShowAddTitlePopup(false)}
              aria-label="Close"
            >
              <X size={24} />
            </button>
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">
                Finalize Your Story
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Add an overall title and set publishing options.
              </p>
            </div>

            <input
              type="text"
              value={storyTitle}
              onChange={(e) => setStoryTitle(e.target.value)}
              placeholder="Overall Story Title"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-5 text-base focus:outline-none focus:ring-2 focus:ring-[#A259FF] focus:border-transparent"
            />

            <div className="mb-6">
              <label
                htmlFor="requestPublicStory"
                className="flex items-center cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={requestPublic}
                  onChange={(e) => setRequestPublic(e.target.checked)}
                  id="requestPublicStory"
                  className="accent-[#A259FF] w-5 h-5 mr-3 border-gray-400 rounded focus:ring-offset-0 focus:ring-2 focus:ring-[#A259FF]"
                />
                <span className="text-sm text-gray-700 font-medium">
                  Request DosthAI to make your entire story public
                </span>
              </label>
            </div>

            <div className="mb-8">
              <a
                href="#" // Replace with actual link
                className="flex items-center text-sm text-blue-600 hover:text-blue-700 hover:underline"
              >
                <Info size={16} className="mr-1.5" />
                Read rules about making a story public
              </a>
            </div>

            <div className="flex flex-col sm:flex-row justify-end gap-3">
              <button
                className="w-full sm:w-auto px-6 py-2.5 font-semibold border-[#A259FF] border-2 text-[#A259FF] rounded-lg hover:bg-[#A259FF] hover:text-white transition-colors text-sm order-2 sm:order-1"
                onClick={() => {
                  console.log(
                    "Save Overall Story as Draft:",
                    storyTitle,
                    requestPublic
                  );
                  setShowAddTitlePopup(false);
                }}
              >
                Save Draft
              </button>
              <button
                className="w-full sm:w-auto px-8 py-2.5 bg-[#A259FF] text-white font-semibold rounded-lg hover:bg-[#8e4de6] transition-colors text-sm order-1 sm:order-2"
                onClick={handleSaveStoryTitle}
              >
                Publish Story
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Test;
