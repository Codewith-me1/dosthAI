"use client";

import React, { useState, useEffect } from "react";
import { notFound, useParams } from "next/navigation";

// --- Component Imports ---
import Sidebar from "@/app/components/dashboard/Sidebar";
import KidProfile from "@/app/components/dashboard/KidProfile";
import Card from "@/app/components/dashboard/Card";
import CreateAssessment from "@/app/components/dashboard/CreateAssessment";
import StoryPopup from "@/app/components/dashboard/VideoPopup";

// --- Data Import ---
import storyJson from "@/public/story_json.json";
import paintStory from "@/public/paintStory.json"; // Import paintStory

// --- Interfaces ---
interface KidInfo {
  id: string;
  name: string;
  age: string;
  role: string;
}

// Updated CardInfo to potentially include a dataKey
interface CardInfo {
  id: string;
  title: string;
  image: string;
  rating: number;
  category: string;
  type: "story" | "activity";
  dataKey?: "storyJson" | "paintStoryJson"; // Helps identify which JSON to use
}

interface StoryStep {
  audio: string;
  image: string;
  step: string;
  prompt?: string;
}

interface StoryData {
  title: string;
  story: StoryStep[];
  thumbnailUrl?: string; // Optional thumbnail for card image
}

// --- Mock Data/Functions ---
function getKidById(id: string | string[]): KidInfo {
  const kids: KidInfo[] = [
    { id: "1", name: "John Doe", age: "8", role: "student" },
    { id: "2", name: "Alex Jones", age: "10", role: "client" },
  ];
  const kid = kids.find((kid) => kid.id === id);
  return kid || { id: "1", name: "John Doe", age: "8", role: "student" };
}

// Updated dummy cards - Assign dataKey and update activity card
const dummyCards: CardInfo[] = [
  {
    id: "c1",
    title: "Coping Skills: Sad", // Example title from storyJson
    image: "/dummyimage.jpg", // Use thumbnail from JSON if available
    rating: 4.5,
    category: "Coping Strategies",
    type: "story",
    dataKey: "storyJson",
  },
  {
    id: "c2",
    title: paintStory.title || "Creative Painting Fun", // Use title from paintStory.json
    image: "/dummyimage.jpg", // Use specific image or thumbnail
    rating: 4.8,
    category: "Creative Activity", // Updated category
    type: "activity",
    dataKey: "paintStoryJson", // Link this card to paintStory data
  },
  {
    id: "c3",
    title: "Bedtime Preparation", // Another story example
    image: "/dummyimage.jpg",
    rating: 4.2,
    category: "routine",
    type: "story",
  },
];

export default function KidPage() {
  const { id } = useParams();
  const kid = getKidById(id ?? "");
  const [storyPopupOpen, setStoryPopupOpen] = useState(false);
  const [currentStoryData, setCurrentStoryData] = useState<StoryData | null>(
    null
  );
  const [loadedStoryJson, setLoadedStoryJson] = useState<StoryData | null>(
    null
  );
  const [loadedPaintStoryJson, setLoadedPaintStoryJson] =
    useState<StoryData | null>(null);
  const [showCreateAssessment, setShowCreateAssessment] = useState(false);

  useEffect(() => {
    // Load and format storyJson
    if (storyJson && storyJson.story) {
      const formattedData: StoryData = {
        title: storyJson.title,
        story: storyJson.story,
      };
      setLoadedStoryJson(formattedData);
    } else {
      console.error("Failed to load or parse storyJson.");
    }

    // Load and format paintStory
    if (paintStory && paintStory.story) {
      const formattedPaintData: StoryData = {
        title: paintStory.title,
        story: paintStory.story,
      };
      setLoadedPaintStoryJson(formattedPaintData);
    } else {
      console.error("Failed to load or parse paintStory.json.");
    }
  }, []);

  const handleCardClick = (card: CardInfo) => {
    if (
      card.type === "story" &&
      card.dataKey === "storyJson" &&
      loadedStoryJson
    ) {
      console.log("Opening story:", loadedStoryJson.title);
      setCurrentStoryData(loadedStoryJson);
      setStoryPopupOpen(true);
    } else if (
      card.type === "activity" &&
      card.dataKey === "paintStoryJson" &&
      loadedPaintStoryJson
    ) {
      console.log("Opening paint activity:", loadedPaintStoryJson.title);
      setCurrentStoryData(loadedPaintStoryJson);
      setStoryPopupOpen(true);
    } else if (card.type === "story" && !card.dataKey && loadedStoryJson) {
      console.log("Opening generic story (fallback):", loadedStoryJson.title);
      setCurrentStoryData(loadedStoryJson);
      setStoryPopupOpen(true);
    } else {
      console.warn(
        "Story/Activity data not loaded, card type/dataKey mismatch, or no action defined for:",
        card.title,
        card.type,
        card.dataKey
      );
    }
  };

  if (!kid) {
    return notFound();
  }

  return (
    <div className="min-h-screen">
      <Sidebar />
      <main className="lg:pl-64">
        <div className="md:max-w-7xl md:mx-20 px-4 sm:px-6 lg:px-8 py-8">
          {showCreateAssessment ? (
            <CreateAssessment
              kidName={kid.name}
              onBack={() => setShowCreateAssessment(false)}
            />
          ) : (
            <>
              <KidProfile name={kid.name} age={kid.age} role={kid.role} />

              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Stories</h2>
                <div className="flex flex-wrap gap-6">
                  {dummyCards
                    .filter((card) => card.type === "story")
                    .map((card) => (
                      <Card
                        key={card.id}
                        {...card}
                        author="BCBA"
                        onClick={() => handleCardClick(card)}
                      />
                    ))}
                </div>
              </div>

              <h2 className="text-xl font-semibold mt-12 mb-4">Activities</h2>
              <div className="flex flex-wrap gap-6">
                {dummyCards
                  .filter((card) => card.type === "activity")
                  .map((card) => (
                    <Card
                      key={card.id}
                      {...card}
                      author="BCBA"
                      onClick={() => handleCardClick(card)}
                    />
                  ))}
              </div>
              {/* Assessment Section */}
              <div className="mt-12">
                <div className="flex justify-end mb-4"></div>
                {/* You can add AssessmentCard(s) here if needed */}
              </div>
            </>
          )}
        </div>
        {/* Render the Story Popup */}
        {currentStoryData && (
          <StoryPopup
            open={storyPopupOpen}
            onClose={() => {
              setStoryPopupOpen(false);
              setCurrentStoryData(null);
            }}
            storyData={currentStoryData}
          />
        )}
      </main>
    </div>
  );
}
