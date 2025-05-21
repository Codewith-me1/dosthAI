'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { X, Image as ImageIcon, RefreshCw } from "lucide-react"; // Added ImageIcon for placeholder

const dummyThumbnails = [
  "/Kids.jpg",
  "/dummyimage.jpg",
  "/Kids.jpg",
  "/Kids.jpg",
  "/Kids.jpg",
  "/Kids.jpg",
];

interface Storyline {
  title: string;
  makePublic: boolean;
  mainImage: string;
  generatedImages: string[];
  isLoadingImages: boolean;
}

const initialStorylinesData: Omit<Storyline, 'generatedImages' | 'isLoadingImages' | 'mainImage'>[] = [
  { title: "How to pack my stuff for short camping trip in the woods?", makePublic: true },
  { title: "How to pack my stuff for short camping trip in the woods?", makePublic: true },
  { title: "How to pack my stuff for short camping trip in the woods?", makePublic: true },
];

const Test: React.FC = () => {
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [deleteConfirmed, setDeleteConfirmed] = useState(false);
  const [showEditTitleModal, setShowEditTitleModal] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editMakePublic, setEditMakePublic] = useState(true);

  const [storylines, setStorylines] = useState<Storyline[]>(
    initialStorylinesData.map(story => ({
      ...story,
      mainImage: "/Kids.jpg", // Default main image for all storylines
      generatedImages: [],
      isLoadingImages: false,
    }))
  );

  const router = useRouter();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (deleteConfirmed) {
      timer = setTimeout(() => {
        setShowDeletePopup(false);
        setDeleteConfirmed(false);
        // Potentially navigate or reset storylines after deletion
      }, 2000); // Shortened for demo, was 5000
    }
    return () => clearTimeout(timer);
  }, [deleteConfirmed]);

  const handleGenerateImages = async (storylineIndex: number) => {
    setStorylines(prev =>
      prev.map((story, index) =>
        index === storylineIndex ? { ...story, isLoadingImages: true, generatedImages: [] } : story
      )
    );

    // Simulate API call for image generation
    await new Promise(resolve => setTimeout(resolve, 2500));

    
    const newGeneratedImages = [
      "/Kids.jpg?gen=1", // Using query params to simulate different images if source is same
      "/dummyimage.jpg", // Or use actual different image paths like "/generated-image-2.jpg"
      "/Kids.jpg?gen=3",
    ];

    setStorylines(prev =>
      prev.map((story, index) =>
        index === storylineIndex
          ? { ...story, generatedImages: newGeneratedImages, isLoadingImages: false }
          : story
      )
    );
  };

  const handleChangeMainImage = (storylineIndex: number, newImageSrc: string) => {
    setStorylines(prev =>
      prev.map((story, index) =>
        index === storylineIndex ? { ...story, mainImage: newImageSrc } : story
      )
    );
  };


  return (
    <div className="min-h-screen  font-sans">
      {/* Top bar */}
      <div className="flex justify-between items-center px-4 py-3 border-b ">
        <div className="flex items-center gap-2">
          <button className="p-2 rounded hover:bg-gray-100" onClick={() => router.back()}>
            <span className="text-xl">←</span>
          </button>
          <span className="text-xs text-gray-500">Explore / Create Story</span> {/* Adjusted text color for closer match */}
        </div>
        <div>
          <Image
            src="/Kids.jpg" // Placeholder, image in screenshot is different
            alt="Profile"
            width={36} // Slightly smaller to match screenshot
            height={36}
            className="rounded-full border"
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row max-w-6xl mx-auto w-full">
        {/* Sidebar Thumbnails */}
        <div className="flex md:flex-col gap-2 p-4 md:w-20 w-full justify-center md:justify-start items-center md:items-start border-r border-gray-200 md:border-r-0 md:border-b-0 bg-white md:bg-transparent">
          {dummyThumbnails.map((src, idx) => (
            <div
              key={idx}
              className={`w-14 h-14 rounded-lg border-2 ${ // Slightly larger thumbnails
                idx === 0 // Assuming first storyline's thumbnail is active
                  ? "border-[#A259FF] ring-1 ring-[#A259FF]" // Adjusted ring for subtlety
                  : "border-gray-300" // Slightly darker border for inactive
              } overflow-hidden cursor-pointer hover:opacity-80 transition-opacity`}
              // Add onClick here if these thumbnails should control active storyline view
            >
              <Image
                src={src}
                alt={`Thumb ${idx + 1}`}
                width={56}
                height={56}
                className="object-cover w-full h-full"
              />
            </div>
          ))}
          <button className="w-14 h-14 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50 hover:bg-gray-100 text-2xl font-semibold text-gray-500 mt-2">
            +
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 md:p-8 bg-white space-y-8"> {/* Added bg-white here */}
          {/* Title for the whole story */}
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">
            {storylines[0]?.title || "My Awesome Story"} {/* Display title of the first storyline or a general title */}
          </h1>

          {/* Storylines */}
          {storylines.map((story, idx) => (
            <div
              key={idx}
              className="flex flex-col md:flex-row items-start gap-6 pt-6 pb-8 border-b border-gray-200 last:border-b-0" // Styling to match sections
            >
              {/* Image */}
              <div className="w-full md:w-[300px] h-[300px] rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
                <Image
                  src={story.mainImage}
                  alt={`Storyline ${idx + 1} Image`}
                  width={300}
                  height={300}
                  className="object-cover w-full h-full"
                  priority={idx === 0} // Prioritize loading the first main image
                />
              </div>

              {/* Text Content */}
              <div className="flex-1 space-y-3">
                <p className="text-lg font-semibold text-gray-700">
                  Storyline ({idx + 1}/{storylines.length}) {/* Assuming 6 is total, or use storylines.length */}
                </p>
                <p className="text-base text-gray-600 leading-relaxed">
                  {story.title}
                </p>
                <button
                  className="text-[#A259FF] text-sm font-medium flex items-center gap-1.5 hover:underline"
                  onClick={() => {
                    setEditTitle(story.title);
                    setEditMakePublic(story.makePublic);
                    setEditingIndex(idx);
                    setShowEditTitleModal(true);
                  }}
                >
                  <span>✎</span> Edit Storyline
                </button>

                {/* Image Generation Section - Conditional as per image (shown for first storyline) */}
                {idx === 0 && (
                  <div className="mt-4 pt-3 border-t border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600 font-medium">Change Image?</span>
                        <button
                            onClick={() => handleGenerateImages(idx)}
                            className="text-xs text-[#A259FF] font-semibold hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={story.isLoadingImages}
                        >
                            {story.isLoadingImages ? "Generating..." : "Generate Images"}
                        </button>
                    </div>
                    <div className="flex gap-3 mt-2">
                      {story.isLoadingImages ? (
                        [...Array(3)].map((_, i) => (
                          <div
                            key={`loading-gen-${i}`}
                            className="w-20 h-20 bg-gray-200 rounded-lg border border-gray-300 flex items-center justify-center animate-pulse"
                          >
                            <RefreshCw className="w-6 h-6 text-gray-400 animate-spin" />
                          </div>
                        ))
                      ) : (story.generatedImages.length > 0 ? story.generatedImages : [...Array(3)].map(() => null))
                        .map((imgSrc, imgIdx) => (
                          imgSrc ? (
                            <button
                              key={`gen-${imgIdx}`}
                              onClick={() => handleChangeMainImage(idx, imgSrc)}
                              className="w-20 h-20 rounded-lg border-2 border-gray-200 hover:border-[#A259FF] focus:outline-none focus:border-[#A259FF] overflow-hidden transition-all"
                            >
                              <Image
                                src={imgSrc}
                                alt={`Generated Image ${imgIdx + 1}`}
                                width={80}
                                height={80}
                                className="object-cover w-full h-full"
                              />
                            </button>
                          ) : (
                            // Placeholder for empty slots if less than 3 images are generated
                            <div
                              key={`placeholder-gen-${imgIdx}`}
                              className="w-20 h-20 bg-gray-100 rounded-lg border border-gray-300 flex items-center justify-center"
                            >
                                <ImageIcon className="w-6 h-6 text-gray-400" />
                            </div>
                          )
                        ))
                      }
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Bottom Buttons */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 mt-4">
            <div>
              <button
                className="text-red-600 hover:underline text-sm font-medium"
                onClick={() => setShowDeletePopup(true)}
              >
                Delete Draft
              </button>
            </div>
            <div className="flex gap-3">
              <button className="px-6 py-2.5 font-semibold border-[#A259FF] border-2 text-[#A259FF] rounded-lg hover:bg-[#A259FF] hover:text-white transition-colors text-sm">
                Save Draft
              </button>
              <button className="px-8 py-2.5 bg-[#A259FF] text-white font-semibold rounded-lg hover:bg-[#8e4de6] transition-colors text-sm">
                Done
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Popup */}
      {showDeletePopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-sm mx-4 relative animate-fadeIn">
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
            <h2 className="text-xl font-semibold mb-2 text-gray-800">Are you sure?</h2>
            <p className="text-gray-500 mb-6 text-sm">Do you really want to delete this draft? This action cannot be undone.</p>
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
                  onClick={() => setDeleteConfirmed(true)}
                >
                  Yes, Delete Draft
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-3 mt-4 p-4 bg-green-50 rounded-md">
                <span className="text-4xl text-green-500">✔</span>
                <span className="text-green-700 font-medium">Draft Deleted Successfully!</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Edit Title Modal */}
      {showEditTitleModal && editingIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md mx-4 relative animate-fadeIn">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
              onClick={() => setShowEditTitleModal(false)}
              aria-label="Close"
            >
              <X size={20} />
            </button>
            <h2 className="text-xl font-semibold mb-1 text-gray-800">Edit Storyline Title</h2>
            <p className="text-gray-500 mb-5 text-sm">Update the title and publicity settings for this storyline.</p>
            <input
              type="text"
              value={editTitle}
              onChange={e => setEditTitle(e.target.value)}
              placeholder="Enter storyline title"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 mb-4 text-base focus:outline-none focus:ring-2 focus:ring-[#A259FF] focus:border-[#A259FF]"
            />
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                checked={editMakePublic}
                onChange={e => setEditMakePublic(e.target.checked)}
                id="editMakePublic"
                className="accent-[#A259FF] w-4 h-4 mr-2 cursor-pointer"
              />
              <label htmlFor="editMakePublic" className="text-sm text-gray-700 select-none cursor-pointer">
                Request DosthAI to make this storyline public
              </label>
            </div>
            <a href="#" className="text-xs text-[#A259FF] hover:underline mb-6 inline-block">
              Read rules about making content public
            </a>
            <div className="flex justify-end gap-3 mt-4">
              <button
                className="px-5 py-2.5 font-semibold border-[#A259FF] border-2 text-[#A259FF] rounded-lg hover:bg-[#A259FF] hover:text-white transition-colors text-sm"
                onClick={() => {
                  setStorylines((prev) => prev.map((s, i) => i === editingIndex ? { ...s, title: editTitle, makePublic: editMakePublic } : s));
                  setShowEditTitleModal(false);
                }}
              >
                Save Changes
              </button>
              <button
                className="px-6 py-2.5 bg-[#A259FF] text-white rounded-lg font-semibold hover:bg-[#8e4de6] transition-colors text-sm"
                onClick={() => {
                  setStorylines((prev) => prev.map((s, i) => i === editingIndex ? { ...s, title: editTitle, makePublic: editMakePublic } : s));
                  setShowEditTitleModal(false);
                }}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Test;