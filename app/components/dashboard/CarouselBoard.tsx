"use client";

import React, { useState } from 'react';
import { useEffect } from 'react';
import Image from 'next/image';
import { TabsList, Tabs, TabsContent, TabsTrigger } from '../ui/tabs';
import { Eye, Heart, Search, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CreateCharacterModal from './CreateCharacterModal';
import Card from './Card';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

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
  "This is a ",
  "asdad",
  "The Submarine Tale",
  "The Submarine Tale",
  
  "Virtual School",
  "An Unexpected Hero"
];

const dummyCarousels: CarouselItem[] = [
  // Stories - Most Popular
  {
    id: 1,
    title: "How to walk my dog lorem ipsum dolor amet?",
    image: "/dummyimage.jpg",
    rating: 4.8,
    category: "Most Popular"
  },
  {
    id: 2,
    title: "How to walk my dog lorem ipsum dolor amet?",
    image: "/dummyimage.jpg",
    rating: 4.6,
    category: "Most Popular"
  },
  {
    id: 3,
    title: "How to walk my dog lorem ipsum dolor amet?",
    image: "/dummyimage.jpg",
    rating: 4.7,
    category: "Most Popular"
  },
  {
    id: 4,
    title: "How to walk my dog lorem ipsum dolor amet?",
    image: "/dummyimage.jpg",
    rating: 4.5,
    category: "Most Popular"
  },
  {
    id: 5,
    title: "How to walk my dog lorem ipsum dolor amet?",
    image: "/dummyimage.jpg",
    rating: 4.9,
    category: "Most Popular"
  },
  {
    id: 6,
    title: "How to walk my dog lorem ipsum dolor amet?",
    image: "/dummyimage.jpg",
    rating: 4.7,
    category: "Most Popular"
  },
  // Story Books
  {
    id: 7,
    title: "How to walk my dog lorem ipsum dolor amet?",
    image: "/dummyimage.jpg",
    rating: 4.8,
    category: "Story Books"
  },
  {
    id: 8,
    title: "How to walk my dog lorem ipsum dolor amet?",
    image: "/dummyimage.jpg",
    rating: 4.6,
    category: "Story Books"
  },
  {
    id: 9,
    title: "How to walk my dog lorem ipsum dolor amet?",
    image: "/dummyimage.jpg",
    rating: 4.7,
    category: "Story Books"
  },
  {
    id: 10,
    title: "How to walk my dog lorem ipsum dolor amet?",
    image: "/dummyimage.jpg",
    rating: 4.5,
    category: "Story Books"
  },
  {
    id: 11,
    title: "How to walk my dog lorem ipsum dolor amet?",
    image: "/dummyimage.jpg",
    rating: 4.9,
    category: "Story Books"
  },
  {
    id: 12,
    title: "How to walk my dog lorem ipsum dolor amet?",
    image: "/dummyimage.jpg",
    rating: 4.7,
    category: "Story Books"
  },
  // Social Skills
  {
    id: 13,
    title: "How to walk my dog lorem ipsum dolor amet?",
    image: "/dummyimage.jpg",
    rating: 4.8,
    category: "Social Skills"
  },
  {
    id: 14,
    title: "How to walk my dog lorem ipsum dolor amet?",
    image: "/dummyimage.jpg",
    rating: 4.6,
    category: "Social Skills"
  },
  {
    id: 15,
    title: "How to walk my dog lorem ipsum dolor amet?",
    image: "/dummyimage.jpg",
    rating: 4.7,
    category: "Social Skills"
  },
  {
    id: 16,
    title: "How to walk my dog lorem ipsum dolor amet?",
    image: "/dummyimage.jpg",
    rating: 4.5,
    category: "Social Skills"
  },
  {
    id: 17,
    title: "How to walk my dog lorem ipsum dolor amet?",
    image: "/dummyimage.jpg",
    rating: 4.9,
    category: "Social Skills"
  },
  {
    id: 18,
    title: "How to walk my dog lorem ipsum dolor amet?",
    image: "/dummyimage.jpg",
    rating: 4.7,
    category: "Social Skills"
  },
  // Activities
  {
    id: 19,
    title: "Paint with Your Hands",
    image: "/dummyimage.jpg",
    rating: 4.8,
    category: "Popular Activities"
  },
  {
    id: 20,
    title: "Build a Mini Garden",
    image: "/dummyimage.jpg",
    rating: 4.6,
    category: "Popular Activities"
  },
  {
    id: 21,
    title: "Count the Stars",
    image: "/dummyimage.jpg",
    rating: 4.7,
    category: "Educational"
  },
  {
    id: 22,
    title: "Learn the Alphabet",
    image: "/dummyimage.jpg",
    rating: 4.9,
    category: "Educational"
  },
  {
    id: 23,
    title: "Make Paper Animals",
    image: "/dummyimage.jpg",
    rating: 4.5,
    category: "Creative"
  },
  {
    id: 24,
    title: "Draw Your Family",
    image: "/dummyimage.jpg",
    rating: 4.6,
    category: "Creative"
  },
  // Cards
  {
    id: 25,
    title: "Animal Kingdom Cards",
    image: "/dummyimage.jpg",
    rating: 4.8,
    category: "Popular Cards"
  },
  {
    id: 26,
    title: "Color Match Cards",
    image: "/dummyimage.jpg",
    rating: 4.7,
    category: "Popular Cards"
  },
  {
    id: 27,
    title: "Math Fun Cards",
    image: "/dummyimage.jpg",
    rating: 4.6,
    category: "Learning Cards"
  },
  {
    id: 28,
    title: "Word Building Cards",
    image: "/dummyimage.jpg",
    rating: 4.9,
    category: "Learning Cards"
  },
  {
    id: 29,
    title: "Memory Game Cards",
    image: "/dummyimage.jpg",
    rating: 4.7,
    category: "Fun Cards"
  },
  {
    id: 30,
    title: "Action Cards",
    image: "/dummyimage.jpg",
    rating: 4.5,
    category: "Fun Cards"
  },


  
];

const categories = {
  stories: ["Most Popular", "Story Books", "Social Skills"],
  activities: ["Popular Activities", "Educational", "Creative"],
  cards: ["Popular Cards", "Learning Cards", "Fun Cards"]
};

const CarouselBoard: React.FC = () => {

  const words = ['activity', 'cards', 'story']; // You can add more words here
const [index, setIndex] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    setIndex(prev => (prev + 1) % words.length);
  }, 2000); // Change word every 2 seconds

  return () => clearInterval(interval);
}, []);

  const [activeCategory, setActiveCategory] = useState("stories");
  const [selectedOption, setSelectedOption] = useState("story");
  const [isCharacterModalOpen, setIsCharacterModalOpen] = useState(false);

  const filterCarouselsByCategory = (category: string) => {
    return dummyCarousels.filter(item => item.category === category);
  };

  

  const renderCarouselGrid = (category: string) => {
    const items = filterCarouselsByCategory(category);
    const carouselId = `carousel-${category.replace(/\s+/g, '-').toLowerCase()}`;
    
    return (
      <div className="relative group">
        
        <div className="absolute left-0 top-1/4 -translate-y-1/2 z-10">
  <button 
    className={`swiper-button-prev-${carouselId} bg-white rounded-full p-4 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 -ml-4 hover:bg-gray-50`}
  >
    <ChevronLeft className="h-6 w-6 text-[#6100FF] " />
  </button>
</div>

<div className="absolute right-0 top-1/3 -translate-y-1/2 z-10">
  <button 
    className={`swiper-button-next-${carouselId} bg-white rounded-full p-4 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 -mr-4 hover:bg-gray-50`}
  >
    <ChevronRight className="h-6 w-6 text-[#6100FF] " />
  </button>
</div>

        <div className="overflow-hidden">
          <Swiper
            modules={[Navigation]}
            
            spaceBetween={30}
            slidesPerView={1}
            navigation={{
              nextEl: `.swiper-button-next-${carouselId}`, // Custom class
              prevEl: `.swiper-button-prev-${carouselId}`,
            }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 }
            }}
            className="!pb-10"
          >
            {items.map((item) => (
              <SwiperSlide className='max-w-[20rem]'  key={item.id}>
                  <Card
                    key={String(item.id)}
                    id={String(item.id)}
                    title={item.title}
                    image={item.image}
                    rating={item.rating}
                    category={item.category}
                    type={activeCategory === 'stories' ? 'story' : 'activity'}
                  />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    );
  };

  const renderAllContent = () => {
    return (
      <div className="space-y-16 px-4">
        {/* Stories Section */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Stories</h2>
          <div className="space-y-12">
            {categories.stories.map((category) => (
              <div key={category}>
                <h3 className="text-xl font-bold mb-6 text-gray-700">{category}</h3>
                {renderCarouselGrid(category)}
              </div>
            ))}
          </div>
        </div>

        {/* Activities Section */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Activities</h2>
          <div className="space-y-12">
            {categories.activities.map((category) => (
              <div key={category}>
                <h3 className="text-xl font-bold mb-6 text-gray-700">{category}</h3>
                {renderCarouselGrid(category)}
              </div>
            ))}
          </div>
        </div>

        {/* Cards Section */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Cards</h2>
          <div className="space-y-12">
            {categories.cards.map((category) => (
              <div key={category}>
                <h3 className="text-xl font-bold mb-6 text-gray-700">{category}</h3>
                {renderCarouselGrid(category)}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-[120rem] mx-auto">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-semibold mb-2">
          Lets create a {""}
          <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          className="text-[#C099FF] inline-block"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>

        </h1>
        <p className="text-gray-600 text-sm">Create your first story with a simple prompt</p>
      </div>

      {/* Radio Button Group */}
      <div className="flex items-center gap-3 mt-4 mb-4 justify-center">
        <div className="relative">
          <input
            type="radio"
            id="story"
            name="contentType"
            value="story"
            checked={selectedOption === "story"}
            onChange={(e) => setSelectedOption(e.target.value)}
            className="absolute opacity-0 w-full h-full cursor-pointer peer"
          />
          <label
            htmlFor="story"
            className="px-4 py-1.5 rounded-full text-sm font-medium cursor-pointer block peer-checked:bg-purple-100 peer-checked:text-purple-700 text-gray-600 hover:bg-gray-100"
          >
            Story
          </label>
        </div>

        <div className="relative">
          <input
            type="radio"
            id="activity"
            name="contentType"
            value="activity"
            checked={selectedOption === "activity"}
            onChange={(e) => setSelectedOption(e.target.value)}
            className="absolute opacity-0 w-full h-full cursor-pointer peer"
          />
          <label
            htmlFor="activity"
            className="px-4 py-1.5 rounded-full text-sm font-medium cursor-pointer block peer-checked:bg-purple-100 peer-checked:text-purple-700 text-gray-600 hover:bg-gray-100"
          >
            Activity
          </label>
        </div>

        <div className="relative">
          <input
            type="radio"
            id="cards"
            name="contentType"
            value="cards"
            checked={selectedOption === "cards"}
            onChange={(e) => setSelectedOption(e.target.value)}
            className="absolute opacity-0 w-full h-full cursor-pointer peer"
          />
          <label
            htmlFor="cards"
            className="px-4 py-1.5 rounded-full text-sm font-medium cursor-pointer block peer-checked:bg-purple-100 peer-checked:text-purple-700 text-gray-600 hover:bg-gray-100"
          >
            Cards
          </label>
        </div>
      </div>

      {/* Search Bar */}
      <div className="storySection flex flex-col items-center px-4 md:px-0">
  {/* Search Box */}
  <div className="relative w-full max-w-3xl mb-8">
    <div className="w-full">
      <input
        type="text"
        placeholder="example: create a story about how to walk my dog"
        className="w-full px-12 py-5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-700 text-base"
      />
      {/* Search Icon */}
      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
    </div>
  </div>

  {/* Set Preference Section */}
  <div className="mb-10 w-full max-w-3xl">
    <h3 className="text-xl font-semibold text-gray-800 mb-4">Set Preference</h3>
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-3">
        <div className="flex flex-col items-center">
          <Image src="/avatar/avatar1.jpg" alt="Avatar1" width={60} height={60} className="rounded-lg" />
          <span className="text-xs mt-1 text-gray-600">Anu & her mom</span>
        </div>
        <div className="flex flex-col items-center">
          <Image src="/avatar/avatar2.jpg" alt="Avatar2" width={60} height={60} className="rounded-lg" />
          <span className="text-xs mt-1 text-gray-600">Raj & Friends</span>
        </div>
        <div className="flex flex-col items-center">
          <Image src="/avatar/avatar1.jpg" alt="Avatar3" width={60} height={60} className="rounded-lg" />
          <span className="text-xs mt-1 text-gray-600">Karate Cat</span>
        </div>
      </div>
      {/* Plus button */}
      <button
        onClick={() => setIsCharacterModalOpen(true)}
        className="w-14 h-14 mb-5 flex flex-col items-center justify-center rounded-full border-2 border-dashed border-gray-300 hover:border-gray-400 hover:text-gray-600 text-gray-400 transition-all duration-200"
      >
        <Plus className="w-6 h-6" />
      </button>
    </div>
  </div>

  {/* Modal */}
  <CreateCharacterModal
    isOpen={isCharacterModalOpen}
    onClose={() => setIsCharacterModalOpen(false)}
  />

  {/* Sample Prompts */}
  <div className="w-full max-w-3xl ">
    <h3 className="text-lg md:text-lg font-bold text-gray-800 mb-4">Sample Prompts</h3>
  
  </div>
</div>

  {/* Sample Prompts */}
 
  <div className="w-full ml-0 md:ml-5 mb-12">
  <Swiper
    modules={[Navigation]}
    
    spaceBetween={30} // exactly 1px gap
    slidesPerView="auto" // show all slides together
    className="!pb-10"
    grabCursor={true}
  >
    {samplePrompts.map((prompt, index) => (
      <SwiperSlide key={index} className="!w-auto">
        <button
          className="flex items-center gap-2 whitespace-nowrap px-5 py-3 rounded-lg border border-gray-300 text-sm text-gray-700 bg-gray-50 hover:border-gray-400 hover:bg-white transition-all duration-200"
        >
          <span className="text-yellow-500">«</span> {prompt}
        </button>
      </SwiperSlide>
    ))}
  </Swiper>
</div>

      {/* Explore All Section */}
      <div>
        <div className="flex items-center justify-between mb-8">
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
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-[#6100FF] rounded-3xl data-[state=active]:text-purple-600 data-[state=active]:bg-[#F3F8FF]"
            >
              Explore All
            </TabsTrigger>
            <TabsTrigger 
              value="stories" 
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-[#6100FF] rounded-3xl data-[state=active]:text-purple-600 data-[state=active]:bg-[#F3F8FF]"
            >
              Stories
            </TabsTrigger>
            <TabsTrigger 
              value="activities" 
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-[#6100FF] rounded-3xl data-[state=active]:text-purple-600 data-[state=active]:bg-[#F3F8FF]"
            >
              Activities
            </TabsTrigger>
            <TabsTrigger 
              value="cards" 
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-[#6100FF] rounded-3xl data-[state=active]:text-purple-600 data-[state=active]:bg-[#F3F8FF]"
            >
              Cards
            </TabsTrigger>
          </TabsList>

          <TabsContent value="explore" className="space-y-12">
            {renderAllContent()}
          </TabsContent>

          <TabsContent value="stories" className="space-y-12 px-4">
            <div className="space-y-12">
              {categories.stories.map((category) => (
                <div key={category}>
                  <h2 className="text-xl font-bold mb-6">{category}</h2>
                  {renderCarouselGrid(category)}
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="activities" className="space-y-12 px-4">
            <div className="space-y-12">
              {categories.activities.map((category) => (
                <div key={category}>
                  <h2 className="text-xl font-bold mb-6">{category}</h2>
                  {renderCarouselGrid(category)}
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="cards" className="space-y-12 px-4">
            <div className="space-y-12">
              {categories.cards.map((category) => (
                <div key={category}>
                  <h2 className="text-xl font-bold mb-6">{category}</h2>
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