'use client';

import React, { useState, useEffect } from 'react';
import { notFound, useParams } from 'next/navigation';

// --- Component Imports ---
import Sidebar from '@/app/components/dashboard/Sidebar';
import KidProfile from '@/app/components/dashboard/KidProfile';
import Card from '@/app/components/dashboard/Card';
import CreateAssessment from '@/app/components/dashboard/CreateAssessment';
import StoryPopup from '@/app/components/dashboard/VideoPopup';

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
  type: 'story' | 'activity';
  dataKey?: 'storyJson' | 'paintStoryJson'; // Helps identify which JSON to use
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
function getKidById(id: string | string[]): KidInfo | null {
  const kids: KidInfo[] = [
    { id: '1', name: 'John Doe', age: '8', role: 'student' },
    { id: '2', name: 'Alex Jones', age: '10', role: 'client' },
  ];
  return kids.find(kid => kid.id === id) || null;
}

// Updated dummy cards - Assign dataKey and update activity card
const dummyCards: CardInfo[] = [
  {
    id: 'c1',
    title: 'Coping Skills: Sad', // Example title from storyJson
    image: '/dummyimage.jpg', // Use thumbnail from JSON if available
    rating: 4.5,
    category: 'Coping Strategies',
    type: 'story',
    dataKey: 'storyJson',
  },
  {
    id: 'c2',
    title: paintStory.title || 'Creative Painting Fun', // Use title from paintStory.json
    image: '/dummyimage.jpg', // Use specific image or thumbnail
    rating: 4.8,
    category: 'Creative Activity', // Updated category
    type: 'activity',
    dataKey: 'paintStoryJson', // Link this card to paintStory data
  },
  {
    id: 'c3',
    title: 'Bedtime Preparation', // Another story example
    image: '/dummyimage.jpg',
    rating: 4.2,
    category: 'routine',
    type: 'story',
    // Assuming this might use a different story JSON or the same one based on title match later
    // For now, if it's meant to use 'storyJson' and has a different title, handleCardClick would need logic
    // to find the specific story within storyJson if it contained multiple stories.
    // Or, it might be a different JSON altogether. For this example, let's assume it's a placeholder.
  },
];


export default function KidPage() {
  const { id } = useParams();
  const kid = getKidById(id ?? "");
  const [storyPopupOpen, setStoryPopupOpen] = useState(false);
  const [currentStoryData, setCurrentStoryData] = useState<StoryData | null>(null);
  const [loadedStoryJson, setLoadedStoryJson] = useState<StoryData | null>(null);
  const [loadedPaintStoryJson, setLoadedPaintStoryJson] = useState<StoryData | null>(null); // State for paintStory
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
  }, []); // Empty array ensures this runs only once on mount

  const handleCardClick = (card: CardInfo) => {
    if (card.type === 'story' && card.dataKey === 'storyJson' && loadedStoryJson) {
      console.log("Opening story:", loadedStoryJson.title);
      setCurrentStoryData(loadedStoryJson);
      setStoryPopupOpen(true);
    } else if (card.type === 'activity' && card.dataKey === 'paintStoryJson' && loadedPaintStoryJson) {
      console.log("Opening paint activity:", loadedPaintStoryJson.title);
      setCurrentStoryData(loadedPaintStoryJson); // Set paintStory data for the popup
      setStoryPopupOpen(true);
    } else if (card.type === 'story' && !card.dataKey && loadedStoryJson) {
      // Fallback for generic story cards if needed, or cards that might use a different mechanism
      // For card 'c3' if it doesn't have a dataKey but is a story, it would use loadedStoryJson by default
      // This part depends on how you want to handle cards without explicit dataKeys
      console.log("Opening generic story (fallback):", loadedStoryJson.title);
      setCurrentStoryData(loadedStoryJson);
      setStoryPopupOpen(true);
    }
    else {
      console.warn("Story/Activity data not loaded, card type/dataKey mismatch, or no action defined for:", card.title, card.type, card.dataKey);
    }
  };

  if (!kid) {
    return notFound();
  }

  return (
    <div className="min-h-screen">
      <Sidebar />
      <main className="lg:pl-64">
        <div className="max-w-7xl mx-20 px-4 sm:px-6 lg:px-8 py-8">
          {showCreateAssessment ? (
            <CreateAssessment kidName={kid.name} onBack={() => setShowCreateAssessment(false)} />
          ) : (
            <>
              <KidProfile name={kid.name} age={kid.age} role={kid.role} />
              {/* Cards Section */}
              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">My Cards</h2>
                <div className="flex flex-wrap gap-6">
                  {dummyCards.map(card => (
                    <Card key={card.id} {...card} onClick={() => handleCardClick(card)} />
                  ))}
                </div>
              </div>
              {/* Assessment Section */}
              <div className="mt-12">
                <div className="flex justify-end mb-4">
                  <button
                    className="px-6 py-2 border-2 border-purple-600 text-purple-700 font-bold rounded-lg hover:bg-purple-50 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-300"
                    onClick={() => setShowCreateAssessment(true)}
                  >
                    Create Assessment
                  </button>
                </div>
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
              // Optionally reset currentStoryData to null if you want fresh state next time
              // setCurrentStoryData(null);
            }}
            storyData={currentStoryData}
          />
        )}
      </main>
    </div>
  );
}