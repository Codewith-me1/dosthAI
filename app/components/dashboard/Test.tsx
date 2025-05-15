'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { X } from "lucide-react";

const dummyThumbnails = [
  "/Kids.jpg",
  "/Kids.jpg",
  "/Kids.jpg",
  "/Kids.jpg",
  "/Kids.jpg",
  "/Kids.jpg",
];

const Test: React.FC = () => {
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [deleteConfirmed, setDeleteConfirmed] = useState(false);
  const [showEditTitleModal, setShowEditTitleModal] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editMakePublic, setEditMakePublic] = useState(true);
  const [storylines, setStorylines] = useState([
    { title: "How to pack my stuff for short camping trip in the woods?", makePublic: true },
    { title: "How to pack my stuff for short camping trip in the woods?", makePublic: true },
    { title: "How to pack my stuff for short camping trip in the woods?", makePublic: true },
  ]);

  // Auto-close after 5 seconds if confirmed
  const router = useRouter(); 
  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    if (deleteConfirmed) {
      timer = setTimeout(() => {
        setShowDeletePopup(false);
        setDeleteConfirmed(false);
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [deleteConfirmed]);

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans">
      {/* Top bar */}
      <div className="flex justify-between items-center px-4 py-3 border-b bg-white">
        <div className="flex items-center gap-2">
          <button className="p-2 rounded hover:bg-gray-100">
            <span onClick={() => router.back()} className="text-xl">←</span>
          </button>
          <span className="text-xs text-gray-400">Explore / Create Story</span>
        </div>
        <div>
          <Image
            src="/kids.jpg"
            alt="Profile"
            width={40}
            height={40}
            className="rounded-full border"
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row max-w-6xl mx-auto w-full">
        {/* Sidebar Thumbnails */}
        <div className="flex md:flex-col gap-2 p-4 md:w-20 w-full justify-center md:justify-start">
          {dummyThumbnails.map((src, idx) => (
            <div
              key={idx}
              className={`w-12 h-12 rounded-lg border-2 ${
                idx === 0
                  ? "border-[#A259FF] ring-2 ring-[#A259FF]"
                  : "border-gray-200"
              } overflow-hidden`}
            >
              <Image
                src={src}
                alt={`Thumb ${idx + 1}`}
                width={48}
                height={48}
                className="object-cover w-full h-full"
              />
            </div>
          ))}
          <button className="w-12 h-12 rounded-lg border-2 border-gray-200 flex items-center justify-center bg-[#FFF4CC] text-2xl font-bold mt-2">
            +
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 space-y-8">
          {/* Title */}
          <h1 className="text-2xl md:text-3xl font-semibold mb-4">
            {storylines[0].title}
          </h1>

          {/* Storylines */}
          {storylines.map((story, idx) => (
            <div
              key={idx}
              className="flex flex-col md:flex-row items-start gap-6  rounded-2xl p-4"
            >
              {/* Image */}
              <div className="w-full md:w-72 h-60 rounded-xl overflow-hidden">
                <Image
                  src="/Kids.jpg"
                  alt="Story"
                  width={288}
                  height={240}
                  className="object-cover w-full h-full"
                />
              </div>

              {/* Text Content */}
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-lg font-medium">
                    Storyline ({idx + 1}/6)
                  </p>
                  {idx === 0 && (
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">Change Image?</span>
                      <button className="text-xs text-[#A259FF] font-medium hover:underline">
                        Generate Images
                      </button>
                    </div>
                  )}
                </div>
                <p className="text-base text-gray-700">
                  {story.title}
                </p>
                <button className="text-[#A259FF] text-sm font-medium flex items-center gap-1 hover:underline"
                  onClick={() => {
                    setEditTitle(story.title);
                    setEditMakePublic(story.makePublic);
                    setEditingIndex(idx);
                    setShowEditTitleModal(true);
                  }}
                >
                  <span>✎</span> Edit Storyline
                </button>
                {idx === 0 && (
                  <div className="flex gap-2 mt-2">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg border" />
                    <div className="w-12 h-12 bg-gray-100 rounded-lg border" />
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Bottom Buttons */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 pt-6 ">
            <div className="delete">
              <button
                className="text-red-500 hover:underline text-sm"
                onClick={() => setShowDeletePopup(true)}
              >
                Delete Draft
              </button>
            </div>
            <div className="save flex gap-2">
              <button className="px-5 py-2 font-semibold border-[#6100FF] border-2 text-[#6100FF] rounded-lg hover:bg-[#6100FF] hover:text-white text-sm">
                Save Draft
              </button>
              <button className="px-7 py-2 bg-[#6100FF] text-white rounded-lg  text-sm">
                Done
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Popup */}
      {showDeletePopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-xs sm:max-w-sm mx-2 relative animate-fadeIn">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
              onClick={() => {
                setShowDeletePopup(false);
                setDeleteConfirmed(false);
              }}
              aria-label="Close"
            >
              ×
            </button>
            <h2 className="text-lg font-semibold mb-1">Are you sure?</h2>
            <p className="text-gray-500 mb-6 text-sm">Are you sure, you want to delete the draft?</p>
            {!deleteConfirmed ? (
              <div className="flex justify-between items-center mt-4">
                <button
                  className="text-gray-500 font-medium hover:underline"
                  onClick={() => setShowDeletePopup(false)}
                >
                  No, Keep it
                </button>
                <button
                  className="text-red-500 font-semibold hover:underline"
                  onClick={() => setDeleteConfirmed(true)}
                >
                  Yes, Delete Draft
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2 mt-4">
                <span className="text-3xl text-green-500">✔</span>
                <span className="text-gray-700 font-medium">Routine Deleted</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Edit Title Modal */}
      {showEditTitleModal && editingIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-lg mx-2 relative animate-fadeIn">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
              onClick={() => setShowEditTitleModal(false)}
              aria-label="Close"
            >
              <X />
            </button>
            <h2 className="text-lg font-semibold mb-1">Add a title</h2>
            <p className="text-gray-500 mb-4 text-sm">add a title for your story</p>
            <input
              type="text"
              value={editTitle}
              onChange={e => setEditTitle(e.target.value)}
              placeholder="Title"
              className="w-full border border-gray-200 rounded-lg px-4 py-2 mb-4 text-base focus:outline-none focus:ring-2 focus:ring-[#7B2FF2]"
            />
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                checked={editMakePublic}
                onChange={e => setEditMakePublic(e.target.checked)}
                id="makePublic"
                className="accent-[#7B2FF2] w-4 h-4 mr-2"
              />
              <label htmlFor="makePublic" className="text-sm text-gray-700">Request DosthAI to make your story public</label>
            </div>
            <a href="#" className="text-xs text-[#7B2FF2] underline mb-6 inline-block">read rules about make a story public</a>
            <div className="flex justify-end gap-2 mt-4">
              <button
                className="px-5 py-2 font-semibold border-[#7B2FF2] border-2 text-[#7B2FF2] rounded-lg hover:bg-[#F3F0FF] text-sm"
                onClick={() => {
                  setStorylines((prev) => prev.map((s, i) => i === editingIndex ? { ...s, title: editTitle, makePublic: editMakePublic } : s));
                  setShowEditTitleModal(false);
                }}
              >
                Save Draft
              </button>
              <button
                className="px-7 py-2 bg-[#7B2FF2] text-white rounded-lg hover:bg-[#6100FF] text-sm"
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
