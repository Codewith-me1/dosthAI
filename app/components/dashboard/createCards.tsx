'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation'; // Or use a prop for navigation
import { ArrowLeft, Star, Trash2, Save, CheckCircle } from 'lucide-react';

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
            onMouseEnter={() => {}} // Could add hover effect here
            onMouseLeave={() => {}}
            className="focus:outline-none"
            aria-label={`Rate ${ratingValue} out of ${count} stars`}
          >
            <Star
              size={iconSize}
              className={`${
                ratingValue <= rating ? starColor : emptyStarColor
              } transition-colors duration-150`}
              fill={ratingValue <= rating ? 'currentColor' : 'none'}
            />
          </button>
        );
      })}
    </div>
  );
};

type DisplayItem = 
  | { type: 'image'; content: string }
  | { type: 'ratingCard'; content: null };

const GeneratedContentDisplay: React.FC<GeneratedContentDisplayProps> = ({
  promptTitle = "Create a pack of cards with cat dressed as karate kid", // Default for demo
  imageUrls = [ // Default for demo, parent should provide these
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

  // Combine image URLs and a placeholder for the rating card to map them in the grid
  const gridItems = [
    ...imageUrls.map(url => ({ type: 'image', content: url })),
    { type: 'ratingCard', content: null } // Placeholder for the rating card
  ];
  
  // Ensure there are always 6 items for a consistent 2x3 or 3x2 grid,
  // or adjust grid logic if item count can vary significantly.
  // For this example, if imageUrls has 5 items, plus rating card, it's 6 items.
  // If fewer images, you might want to fill with placeholders or adjust grid.
  const displayItems: DisplayItem[] = imageUrls.slice(0, numCards - 1).map(url => ({ type: 'image', content: url }));
  if (displayItems.length < numCards) {
    displayItems.push({ type: 'ratingCard', content: null });
  }
  while (displayItems.length < numCards && displayItems.length > 0) {
    if (displayItems.filter(item => item.type === 'ratingCard').length === 0) {
      displayItems.push({ type: 'ratingCard', content: null });
    } else {
      // Optionally add image placeholders here if you want to fill up to numCards
      break;
    }
  }


  return (
    <div className="min-h-screen bg-slate-100 font-sans flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={handleGoBack}
              className="flex items-center text-gray-600 hover:text-purple-600 transition-colors p-2 -ml-2 rounded-full"
              aria-label="Go back"
            >
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-lg sm:text-xl font-semibold text-gray-800 truncate px-2 text-center flex-1">
              {promptTitle}
            </h1>
            <div className="w-8"> {/* Spacer to balance the back button */} </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {displayItems.map((item, index) => {
            if (item.type === 'image') {
              return (
                <div
                  key={`img-${index}`}
                  className="aspect-[4/5] bg-gray-200 rounded-xl border-4 border-yellow-400 overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group"
                >
                  <Image
                    src={item.content as string}
                    alt={`${promptTitle} - Image ${index + 1}`}
                    width={400} // Intrinsic width, will be scaled by container
                    height={500} // Intrinsic height
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    // Add placeholder for loading if needed
                    // placeholder="blur" 
                    // blurDataURL="data:image/png;base64,..."
                  />
                </div>
              );
            } else if (item.type === 'ratingCard') {
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
