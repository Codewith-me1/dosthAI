"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Or use a prop for navigation
import { ArrowLeft, Star, Trash2, Save, CheckCircle } from "lucide-react";

// Define the props for the component
interface GeneratedContentDisplayProps {
  promptTitle: string;
  imageUrls: string[]; // Should ideally be an array of actual image URLs
  numCards: number;
  onGoBack?: () => void; // Optional: If not provided, router.back() will be used
  onDeleteDraft?: () => void;
  onSaveDraft?: () => void;
  onDone?: () => void;
  // You might want to pass initial rating or checkbox state as props too
}

// Star Rating Component
interface StarRatingProps {
  count: number;
  rating: number;
  onRatingChange: (newRating: number) => void;
  iconSize?: number;
  starColor?: string;
  emptyStarColor?: string;
}

const StarRating: React.FC<StarRatingProps> = ({
  count,
  rating,
  onRatingChange,
  iconSize = 24,
  starColor = "text-yellow-400",
  emptyStarColor = "text-gray-300",
}) => {
  return (
    <div className="flex items-center">
      {[...Array(count)].map((_, i) => {
        const ratingValue = i + 1;
        return (
          <button
            key={i}
            type="button"
            onClick={() => onRatingChange(ratingValue)}
            onMouseEnter={() => {}}
            onMouseLeave={() => {}}
            className="focus:outline-none"
            aria-label={`Rate ${ratingValue} out of ${count} stars`}
          >
            <Star
              size={iconSize}
              className={`${
                ratingValue <= rating ? starColor : emptyStarColor
              } transition-colors duration-150`}
              fill={ratingValue <= rating ? "currentColor" : "none"}
            />
          </button>
        );
      })}
    </div>
  );
};

type DisplayItem =
  | { type: "image"; content: string }
  | { type: "ratingCard"; content: null };

const GeneratedContentDisplay: React.FC<GeneratedContentDisplayProps> = ({
  promptTitle = "Create a pack of cards with cat dressed as karate kid", // Default for demo
  imageUrls = [
    // Default for demo
    "https://placehold.co/400x500/A78BFA/FFFFFF?text=Cat+Karate+1&font=lora",
    "https://placehold.co/400x500/A78BFA/FFFFFF?text=Cat+Karate+2&font=lora",
    "https://placehold.co/400x500/A78BFA/FFFFFF?text=Cat+Karate+3&font=lora",
    "https://placehold.co/400x500/A78BFA/FFFFFF?text=Cat+Karate+4&font=lora",
    "https://placehold.co/400x500/A78BFA/FFFFFF?text=Cat+Karate+5&font=lora",
  ],
  numCards,
  onGoBack,
  onDeleteDraft,
  onSaveDraft,
  onDone,
}) => {
  const router = useRouter();
  const [currentRating, setCurrentRating] = useState(0);
  const [hidePreference, setHidePreference] = useState(false);

  const handleGoBack = () => {
    if (onGoBack) {
      onGoBack();
    } else {
      router.back();
    }
  };

  const displayItems: DisplayItem[] = [];
  if (numCards > 0) {
    const imagesToShow = imageUrls.slice(0, numCards - 1);
    imagesToShow.forEach((url) =>
      displayItems.push({ type: "image", content: url })
    );
    if (displayItems.length < numCards) {
      displayItems.push({ type: "ratingCard", content: null });
    }
  } else if (numCards === 1 && imageUrls.length === 0) {
    displayItems.push({ type: "ratingCard", content: null });
  }

  return (
    <div className="min-h-screen  font-sans flex flex-col">
      {/* Header */}
      <header className="bg-white  sticky top-0 z-10">
        <div className="container  px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={handleGoBack}
              className="flex items-center border-2  border-[#6100FF] text-[#6100FF] hover:text-[#6100FF] transition-colors p-2 -ml-2 rounded-lg"
              aria-label="Go back"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-lg md:text-2xl ml-5 sm:text-xl font-semibold text-gray-800 truncate px-2  flex-1">
              {promptTitle}
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* MODIFIED: Grid classes updated for 1, 2, and 4 column layouts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {displayItems.map((item, index) => {
            if (item.type === "image") {
              return (
                <div
                  key={`img-${index}`} // It's good practice to have stable keys if items can be reordered. Consider using image URL or a unique ID if available.
                  className="aspect-[4/5] bg-gray-200 rounded-xl border-4 border-yellow-400 overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group"
                >
                  <Image
                    src={item.content as string}
                    alt={`${promptTitle} - Image ${index + 1}`}
                    width={400} // Intrinsic width, will be scaled by container
                    height={500} // Intrinsic height
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              );
            } else if (item.type === "ratingCard") {
              return (
                <div
                  key="rating-card"
                  className="bg-white rounded-xl border-2 border-yellow-400 p-4 sm:p-6 shadow-lg flex flex-col justify-center items-center aspect-[4/5] min-h-[250px] sm:min-h-0" // aspect ratio to match images
                >
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3 sm:mb-4 text-center">
                    Do you like it?
                  </h2>
                  <StarRating
                    count={5}
                    rating={currentRating}
                    onRatingChange={setCurrentRating}
                    iconSize={32} // Larger stars
                  />
                  <div className="mt-4 sm:mt-6 w-full max-w-xs">
                    <label className="flex items-center text-sm text-gray-600 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={hidePreference}
                        onChange={(e) => setHidePreference(e.target.checked)}
                        className="h-4 w-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500 accent-purple-600 mr-2"
                      />
                      don&apos;t show me this again
                    </label>
                  </div>
                </div>
              );
            }
            return null;
          })}
        </div>
      </main>

      {/* Footer Actions */}
      <footer className="bg-white shadow-up sticky bottom-0 z-10 py-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
            <button
              onClick={onDeleteDraft}
              className="flex items-center gap-2 text-sm font-medium text-red-600 hover:text-red-700 hover:underline p-2 rounded-md transition-colors"
              aria-label="Delete draft"
            >
              <Trash2 size={18} />
              Delete Draft
            </button>
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={onSaveDraft}
                className="flex items-center gap-2 px-4 sm:px-6 py-2.5 text-sm font-semibold text-purple-600 border-2 border-purple-600 rounded-lg hover:bg-purple-50 transition-colors"
                aria-label="Save draft"
              >
                <Save size={18} />
                Save Draft
              </button>
              <button
                onClick={onDone}
                className="flex items-center gap-2 px-4 sm:px-7 py-2.5 text-sm font-semibold text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors shadow-md hover:shadow-lg"
                aria-label="Done"
              >
                <CheckCircle size={18} />
                Done
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default GeneratedContentDisplay;
