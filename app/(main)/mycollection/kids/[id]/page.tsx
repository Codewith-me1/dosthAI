'use client';

import React, { useState, useEffect } from 'react';
import { notFound, useParams } from 'next/navigation';

// --- Component Imports ---
import Sidebar from '@/app/components/dashboard/Sidebar';
import KidProfile from '@/app/components/dashboard/KidProfile';
import Card from '@/app/components/dashboard/Card';
import CreateAssessment from '@/app/components/dashboard/CreateAssessment';

// Import the new StoryPopup and its related types
import StoryPopup from '@/app/components/dashboard/VideoPopup'; 

// --- Data Import ---
// Directly import the JSON data. Make sure tsconfig allows json imports
// and the file path is correct.
import storyJson from "@/public/story_json.json" // Adjust path to your JSON file


// --- Interfaces ---


interface KidInfo {
  id: string;
  name: string;
  age: string;
  role: string;
}

interface CardInfo {
    id: string;
    title: string;
    image: string;
    rating: number;
    category: string;
    type: 'story' | 'activity'; // Make type more specific
    // Optional: Add a field to link specific story data if needed later
    // storyDataId?: string;
}


// --- Mock Data/Functions (Keep or replace with real logic) ---
function getKidById(id: string | string[]): KidInfo | null {
  const kids: KidInfo[] = [
    { id: '1', name: 'John Doe', age: '8', role: 'student' },
    { id: '2', name: 'Alex Jones', age: '10', role: 'client' },
  ];
  return kids.find(kid => kid.id === id) || null;
}

// Updated dummy cards - Ensure type is correctly assigned
const dummyCards: CardInfo[] = [
  {
    id: 'c1',
    title: 'Coping Skills: Sad', // Match title from JSON for clarity
    image: '/dummyimage.jpg', // Or use storyJson.story[0].image
    rating: 4.5,
    category: 'Coping Strategies', // Match category
    type: 'story',
  },
  {
    id: 'c2',
    title: 'Getting Ready for School',
    image: '/dummyimage.jpg',
    rating: 4.8,
    category: 'routine',
    type: 'activity',
  },
  {
    id: 'c3',
    title: 'Bedtime Preparation',
    image: '/dummyimage.jpg',
    rating: 4.2,
    category: 'routine',
    type: 'story',
  },
];


interface StoryStep {
  audio: string;
  image: string;
  step: string; 
  prompt?: string; 
}

interface StoryData {
  title: string;
  story: StoryStep[];
  thumbnailUrl?: string;
}

export default function KidPage() {
  const {id} = useParams()
  const kid = getKidById(id??"")
  const [storyPopupOpen, setStoryPopupOpen] = useState(false);
  const [currentStoryData, setCurrentStoryData] = useState<StoryData | null>(null);
  const [loadedStoryJson, setLoadedStoryJson] = useState<StoryData | null>(null);
  const [showCreateAssessment, setShowCreateAssessment] = useState(false);

  useEffect(() => {
    // If you were fetching, you'd do it here.
    if (storyJson && storyJson.story) {
        const formattedData: StoryData = {
            title: storyJson.title,
            story: storyJson.story,
        };
        setLoadedStoryJson(formattedData);
    } else {
        console.error("Failed to load or parse story JSON.");
        // Handle error state if necessary
    }
  }, []); // Empty array ensures this runs only once on mount

  const handleCardClick = (card: CardInfo) => {
    if (card.type === 'story' && loadedStoryJson) {
       console.log("Opening story:", loadedStoryJson.title);
       setCurrentStoryData(loadedStoryJson); // Set the data for the popup
       setStoryPopupOpen(true);             // Open the popup
    } else if (card.type === 'activity') {
        console.log("Clicked an activity card (no popup defined yet):", card.title);
    } else {
        console.warn("Story data not loaded or card type is not 'story'.");
    }
  };

  // If kid data is not found
  if (!kid) {
    return notFound();
  }

  return (
    <div className="min-h-screen">
      <Sidebar />
      <main className="lg:pl-64">
        <div className="max-w-7xl mx-20  px-4 sm:px-6 lg:px-8 py-8">
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
            }}
            storyData={currentStoryData}
          />
        )}
      </main>
    </div>
  );
}