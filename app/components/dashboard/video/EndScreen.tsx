"use client";

import { Heart, Star } from "lucide-react";
import Card from "../common/Card"; // Assuming Card component exists
import { useState } from "react";
import SaveModal from "../modals/SaveModal"; // Import the SaveModal component

// Define Profile interface (ideally imported from SaveModal.tsx or a types file)
interface Profile {
  id: string | number;
  initial: string;
  name: string;
  age: string;
  avatarColor?: string;
  avatarTextColor?: string;
}

const EndScreen = () => {
  const [userRating, setUserRating] = useState(0);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [isSavedInMyStuff, setIsSavedInMyStuff] = useState(false); // Or some default
  const [savingForProfileId, setSavingForProfileId] = useState<
    string | number | null
  >(null);

  const handleRateStory = (rating: number) => {
    setUserRating(rating);
  };

  // Mock profiles data for the SaveModal
  const mockProfilesData: Profile[] = [
    {
      id: "1",
      initial: "A",
      name: "Anu Raj",
      age: "5 y/o",
      avatarColor: "bg-purple-100",
      avatarTextColor: "text-purple-600",
    },
    {
      id: "2",
      initial: "A",
      name: "Alex Johns",
      age: "6 y/o",
      avatarColor: "bg-purple-100",
      avatarTextColor: "text-purple-600",
    },
    {
      id: "3",
      initial: "J",
      name: "Jhon Doe",
      age: "4 y/o",
      avatarColor: "bg-violet-100",
      avatarTextColor: "text-violet-600",
    },
  ];

  const upNextStories = [
    {
      id: "4",
      title: "How to walk my dog lorem ipsum dolor amet?",
      imageUrl: "/dummyimage.jpg",
      rating: 4.7,
      views: 1.8,
      type: "activity",
    },
    {
      id: "5",
      title: "How to walk my dog lorem ipsum dolor amet?",
      imageUrl: "/dummyimage.jpg",
      rating: 4.6,
      views: 1.3,
      type: "activity",
    },
  ];

  const handleCardClick = (storyId: string) => {
    // Handle navigation or playing the next story
    console.log("Clicked on story:", storyId);
  };

  const openSaveModal = () => {
    setIsSaveModalOpen(true);
  };

  const closeSaveModal = () => {
    setIsSaveModalOpen(false);
  };

  const handleSaveForProfile = (profileId: string | number) => {
    console.log("Saving story for profile ID:", profileId);
    setSavingForProfileId(profileId);
    // You might want to perform an actual save operation here
    // Optionally, close the modal after selection:
    // closeSaveModal();
  };

  const handleSaveInMyStuffChange = (isChecked: boolean) => {
    setIsSavedInMyStuff(isChecked);
    console.log("Save in my stuff:", isChecked);
    // You might want to perform an actual save operation here
  };

  return (
    <>
      <div className="flex-grow flex flex-col items-center justify-center  text-white">
        {" "}
        {/* Added background and text color for visibility */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Let's create a story</h1>
          <p className="text-gray-400 mb-6">Do you like this story?</p>

          {/* Star Rating */}
          <div className="flex justify-center gap-2 mb-6">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => handleRateStory(star)}
                className="transition-all duration-200"
                aria-label={`Rate ${star} star`}
              >
                <Star
                  size={32}
                  className={
                    userRating >= star ? "text-yellow-400" : "text-gray-500"
                  }
                  fill={userRating >= star ? "currentColor" : "none"}
                />
              </button>
            ))}
          </div>

          {/* Save Button */}
          <button
            onClick={openSaveModal}
            className="flex items-center gap-2 mx-auto px-6 py-3 rounded-full  hover:bg-purple-700 transition-colors text-white font-medium"
          >
            <Heart size={20} />
            <span>Save</span>
          </button>
        </div>
        {/* Up Next Section */}
        {upNextStories.length > 0 && (
          <div className="w-full max-w-2xl mt-8">
            <h3 className="font-semibold text-lg mb-4 text-gray-300 uppercase">
              UP NEXT
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {upNextStories.map((story) => (
                <Card
                  key={story.id}
                  id={story.id}
                  title={story.title}
                  author="BCBA" // Example author
                  textColor="text-white" // Make sure Card handles this
                  image={story.imageUrl}
                  rating={story.rating} // Assuming Card shows rating
                  type="story" // Assuming type is always story for these cards
                  category={story.type} // Or if category is more appropriate
                  onClick={() => handleCardClick(story.id)}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Render the SaveModal */}
      <SaveModal
        isOpen={isSaveModalOpen}
        onClose={closeSaveModal}
        profiles={mockProfilesData}
        onSaveForProfile={handleSaveForProfile}
        isSavedInMyStuff={isSavedInMyStuff}
        onSaveInMyStuffChange={handleSaveInMyStuffChange}
        selectedProfileId={savingForProfileId}
      />
    </>
  );
};

export default EndScreen;
