"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { TabsList, Tabs, TabsContent, TabsTrigger } from '../ui/tabs';
import { Search } from 'lucide-react';

interface CarouselItem {
  id: number;
  title: string;
  image: string;
  rating: number;
  category: string;
}

const samplePrompts = [
  "The Magic Show & Joy",
  "Wizard School",
  "An Unexpected Day",
  "The Submarine Tale",
  "Virtual School",
  "An Unexpected Hero"
];

const dummyCarousels: CarouselItem[] = [
  // Stories
  {
    id: 1,
    title: "The Magic Garden Adventure",
    image: "/dummyimage.jpg",
    rating: 4.8,
    category: "Most Popular"
  },
  {
    id: 2,
    title: "A Day at the Zoo",
    image: "/dummyimage.jpg",
    rating: 4.6,
    category: "Most Popular"
  },
  {
    id: 3,
    title: "The Friendly Dragon",
    image: "/dummyimage.jpg",
    rating: 4.7,
    category: "Story Books"
  },
  {
    id: 4,
    title: "Space Adventures",
    image: "/dummyimage.jpg",
    rating: 4.5,
    category: "Story Books"
  },
  {
    id: 5,
    title: "Making New Friends",
    image: "/dummyimage.jpg",
    rating: 4.9,
    category: "Social Skills"
  },
  {
    id: 6,
    title: "Sharing is Caring",
    image: "/dummyimage.jpg",
    rating: 4.7,
    category: "Social Skills"
  },
  // Activities
  {
    id: 7,
    title: "Paint with Your Hands",
    image: "/dummyimage.jpg",
    rating: 4.8,
    category: "Popular Activities"
  },
  {
    id: 8,
    title: "Build a Mini Garden",
    image: "/dummyimage.jpg",
    rating: 4.6,
    category: "Popular Activities"
  },
  {
    id: 9,
    title: "Count the Stars",
    image: "/dummyimage.jpg",
    rating: 4.7,
    category: "Educational"
  },
  {
    id: 10,
    title: "Learn the Alphabet",
    image: "/dummyimage.jpg",
    rating: 4.9,
    category: "Educational"
  },
  {
    id: 11,
    title: "Make Paper Animals",
    image: "/dummyimage.jpg",
    rating: 4.5,
    category: "Creative"
  },
  {
    id: 12,
    title: "Draw Your Family",
    image: "/dummyimage.jpg",
    rating: 4.6,
    category: "Creative"
  },
  // Cards
  {
    id: 13,
    title: "Animal Kingdom Cards",
    image: "/dummyimage.jpg",
    rating: 4.8,
    category: "Popular Cards"
  },
  {
    id: 14,
    title: "Color Match Cards",
    image: "/dummyimage.jpg",
    rating: 4.7,
    category: "Popular Cards"
  },
  {
    id: 15,
    title: "Math Fun Cards",
    image: "/dummyimage.jpg",
    rating: 4.6,
    category: "Learning Cards"
  },
  {
    id: 16,
    title: "Word Building Cards",
    image: "/dummyimage.jpg",
    rating: 4.9,
    category: "Learning Cards"
  },
  {
    id: 17,
    title: "Memory Game Cards",
    image: "/dummyimage.jpg",
    rating: 4.7,
    category: "Fun Cards"
  },
  {
    id: 18,
    title: "Action Cards",
    image: "/dummyimage.jpg",
    rating: 4.5,
    category: "Fun Cards"
  }
];

const categories = {
  stories: ["Most Popular", "Story Books", "Social Skills"],
  activities: ["Popular Activities", "Educational", "Creative"],
  cards: ["Popular Cards", "Learning Cards", "Fun Cards"]
};

const CarouselBoard: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("stories");

  const filterCarouselsByCategory = (category: string) => {
    return dummyCarousels.filter(item => item.category === category);
  };

  const renderCarouselGrid = (category: string) => {
    const items = filterCarouselsByCategory(category);
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {items.map((item) => (
          <div key={item.id} className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer bg-white">
            <div className="relative h-32">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-3">
              <h3 className="text-sm font-medium mb-2 line-clamp-2">{item.title}</h3>
              <div className="flex items-center">
                {[...Array(5)].map((_, index) => (
                  <svg
                    key={index}
                    className={`w-3 h-3 ${
                      index < item.rating ? "text-yellow-400" : "text-gray-200"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderAllContent = () => {
    return (
      <div className="space-y-16">
        {/* Stories Section */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Stories</h2>
          <div className="space-y-10">
            {categories.stories.map((category) => (
              <div key={category}>
                <h3 className="text-lg font-medium mb-4 text-gray-700">{category}</h3>
                {renderCarouselGrid(category)}
              </div>
            ))}
          </div>
        </div>

        {/* Activities Section */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Activities</h2>
          <div className="space-y-10">
            {categories.activities.map((category) => (
              <div key={category}>
                <h3 className="text-lg font-medium mb-4 text-gray-700">{category}</h3>
                {renderCarouselGrid(category)}
              </div>
            ))}
          </div>
        </div>

        {/* Cards Section */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Cards</h2>
          <div className="space-y-10">
            {categories.cards.map((category) => (
              <div key={category}>
                <h3 className="text-lg font-medium mb-4 text-gray-700">{category}</h3>
                {renderCarouselGrid(category)}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-semibold mb-2">
          Lets create a <span className="text-[#C099FF]">story</span>
        </h1>
        <p className="text-gray-600 text-sm">Create your first story with a simple prompt</p>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-2xl mx-auto mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="example: create a story about how to walk my dog"
            className="w-full px-4 py-7 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent pl-10"
          />
          <div className="absolute inset-y-0 left-3 flex items-center">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
        </div>
        
        {/* Story Type Selection */}
        <div className="flex items-center gap-3 mt-4 justify-center">
          <button className="px-4 py-1.5 rounded-full bg-purple-100 text-purple-700 text-sm font-medium">Story</button>
          <button className="px-4 py-1.5 rounded-full text-gray-600 text-sm font-medium hover:bg-gray-100">Activity</button>
          <button className="px-4 py-1.5 rounded-full text-gray-600 text-sm font-medium hover:bg-gray-100">Cards</button>
        </div>
      </div>

      {/* Set Preference Section */}
      <div className="mb-8">
        <h3 className="text-lg font-bold text-gray-700 mb-3">Set Preference</h3>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Image src="/avatar1.jpg" alt="Avatar" width={40} height={40} className="rounded-full" />
            <Image src="/avatar2.jpg" alt="Avatar" width={40} height={40} className="rounded-full" />
            <Image src="/avatar3.jpg" alt="Avatar" width={40} height={40} className="rounded-full" />
          </div>
          <button className="w-10 h-10 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 hover:border-gray-400">
            +
          </button>
        </div>
      </div>

      {/* Sample Prompts */}
      <div className="mb-12">
        <h3 className="text-lg font-bold text-[#000000] mb-3">Sample Prompts</h3>
        <div className="flex flex-wrap gap-3">
          {samplePrompts.map((prompt, index) => (
            <button
              key={index}
              className="px-4 py-2 rounded-full border border-gray-200 text-sm text-gray-600 hover:border-gray-300 hover:bg-gray-50"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Explore All Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Explore All</h2>
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent w-64"
            />
          </div>
        </div>

        <Tabs defaultValue="explore" className="w-full">
          <TabsList className="flex space-x-4 mb-8 bg-transparent">
            <TabsTrigger 
              value="explore" 
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-purple-600 data-[state=active]:text-purple-600 data-[state=active]:bg-transparent"
            >
              Explore All
            </TabsTrigger>
            <TabsTrigger 
              value="stories" 
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-purple-600 data-[state=active]:text-purple-600 data-[state=active]:bg-transparent"
            >
              Stories
            </TabsTrigger>
            <TabsTrigger 
              value="activities" 
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-purple-600 data-[state=active]:text-purple-600 data-[state=active]:bg-transparent"
            >
              Activities
            </TabsTrigger>
            <TabsTrigger 
              value="cards" 
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-purple-600 data-[state=active]:text-purple-600 data-[state=active]:bg-transparent"
            >
              Cards
            </TabsTrigger>
          </TabsList>

          <TabsContent value="explore">
            {renderAllContent()}
          </TabsContent>

          <TabsContent value="stories">
            <div className="space-y-10">
              {categories.stories.map((category) => (
                <div key={category}>
                  <h2 className="text-lg font-medium mb-4">{category}</h2>
                  {renderCarouselGrid(category)}
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="activities">
            <div className="space-y-10">
              {categories.activities.map((category) => (
                <div key={category}>
                  <h2 className="text-lg font-medium mb-4">{category}</h2>
                  {renderCarouselGrid(category)}
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="cards">
            <div className="space-y-10">
              {categories.cards.map((category) => (
                <div key={category}>
                  <h2 className="text-lg font-medium mb-4">{category}</h2>
                  {renderCarouselGrid(category)}
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CarouselBoard;