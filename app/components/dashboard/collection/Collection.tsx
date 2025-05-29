"use client";

import React, { useEffect, useState } from "react";
import { Search, Plus, Star } from "lucide-react";
import Card from "../common/Card";
import { Button } from "../../ui/button";
import StoryPopup from "../video/VideoPopup";

interface CollectionSidebar {
  category: string;
}
interface StoryItem {
  id: string;
  title: string;
  imageUrl: string;
  rating: number;
  views: number;
  type: string;
}

type UserRole = "student" | "bcba";

const Collection = ({ category }: CollectionSidebar) => {
  const [userRole, setUserRole] = useState<UserRole>("student");

  // Video popup state
  const [videoOpen, setVideoOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [videoTitle, setVideoTitle] = useState("");
  const [videoDescription, setVideoDescription] = useState("");

  const items: StoryItem[] = [
    {
      id: "1",
      title: "How to walk my dog?",
      imageUrl: "/dummyimage.jpg",
      rating: 4.5,
      views: 1.2,
      type: "story",
    },
    {
      id: "2",
      title: "Dog training basics",
      imageUrl: "/dummyimage.jpg",
      rating: 4.8,
      views: 2.1,
      type: "story",
    },
    {
      id: "3",
      title: "Dog walking tips",
      imageUrl: "/dummyimage.jpg",
      rating: 4.3,
      views: 1.5,
      type: "story",
    },
    {
      id: "4",
      title: "Interactive play",
      imageUrl: "/dummyimage.jpg",
      rating: 4.7,
      views: 1.8,
      type: "activity",
    },
    {
      id: "5",
      title: "Mental stimulation",
      imageUrl: "/dummyimage.jpg",
      rating: 4.6,
      views: 1.3,
      type: "activity",
    },
    {
      id: "6",
      title: "Card game one",
      imageUrl: "/dummyimage.jpg",
      rating: 4.6,
      views: 1.3,
      type: "cards-pack",
    },
    {
      id: "7",
      title: "Card game two",
      imageUrl: "/dummyimage.jpg",
      rating: 4.6,
      views: 1.3,
      type: "cards-pack",
    },
    {
      id: "8",
      title: "Card game three",
      imageUrl: "/dummyimage.jpg",
      rating: 4.6,
      views: 1.3,
      type: "cards-pack",
    },
  ];

  const filteredItems =
    category === "all" ? items : items.filter((item) => item.type === category);

  const assessmentTypes = [
    "Motor Imitation",
    "Tacting",
    "Listener Responding",
    "Intraverbal",
  ];

  const groupedItems: { [key: string]: StoryItem[] } = items.reduce(
    (acc, item) => {
      if (!acc[item.type]) acc[item.type] = [];
      acc[item.type].push(item);
      return acc;
    },
    {} as { [key: string]: StoryItem[] }
  );

  const formatTypeTitle = (type: string) =>
    type.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase());

  // Handler for card click
  const handleCardClick = (item: StoryItem) => {
    // Replace with actual video URL and description as needed
    setVideoUrl("/sampleVideo.mp4");
    setVideoTitle(item.title);
    setVideoDescription("This is a sample description for the video.");
    setVideoOpen(true);
  };

  return (
    <div className="w-full max-w-[120rem]  px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-none">
            <input
              type="text"
              placeholder="Search"
              className="w-full sm:w-[280px] pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6100FF] focus:border-transparent"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
          <Button className="w-full sm:w-auto bg-[#6100FF] hover:bg-[#5000D5] text-white">
            <Plus className="h-4 w-4 mr-2" />
            Create
          </Button>
        </div>
      </div>

      {/* Stories Section */}

      {category === "all" ? (
        Object.entries(groupedItems).map(([type, items]) => (
          <div key={type} className="mb-10 w-full">
            <h2 className="text-2xl mt-10 font-poppins font-bold text-black-900 mb-4">
              {formatTypeTitle(type)}
            </h2>
            <div className=" flex flex-wrap w-full gap-6 sm:gap-6">
              {items.map((item) => (
                <Card
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  author="BCBA"
                  image={item.imageUrl}
                  rating={item.rating}
                  category={item.type}
                  type={item.type}
                  onClick={() => handleCardClick(item)}
                />
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className="mb-8">
          <h2 className="text-2xl mt-10 font-poppins font-bold text-black-900 mb-4">
            {formatTypeTitle(category)}
          </h2>
          <div className="flex flex-wrap gap-4 sm:gap-6">
            {items
              .filter((item) => item.type === category)
              .map((item) => (
                <Card
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  author="BCBA"
                  image={item.imageUrl}
                  rating={item.rating}
                  category={item.type}
                  type={item.type}
                  onClick={() => handleCardClick(item)}
                />
              ))}
          </div>
        </div>
      )}

      {/* Activities Section */}

      {/* Cognition Assessments Section - Only visible for BCBA */}
    </div>
  );
};

export default Collection;
