'use client'

import { ArrowBigRight, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import CreateCharacterModal from '../../components/dashboard/CreateCharacterModal';
import Link from "next/link";

const defaultCharacters = [
  { name: "Anna and her mom", img: "/avatar/avatar1.jpg" },
  { name: "Raj & friends", img: "/avatar/avatar2.jpg" },
];

const samplePrompts = [
  "The Reluctant Alex",
  "Virtual School",
  "An Unexpected End...",
  "The Reluctant Alex",
  "Virtual School",
  "An Unexpected End...",
];

export default function CreateStoryPage() {
  const [selectedType, setSelectedType] = useState("Story");
  const [selectedCharacter, setSelectedCharacter] = useState(0);
  const [prompt, setPrompt] = useState("");
  const [characters, setCharacters] = useState(defaultCharacters);
  const [isCharacterModalOpen, setIsCharacterModalOpen] = useState(false);

  return (
    <div className=" w-full bg-white ">
      {/* Floating G top right */}

      <div className="w-full flex flex-col items-center justify-center pt-8 pb-8">
        {/* Breadcrumb */}
        <div className="w-full max-w-2xl text-xs text-gray-500 mb-2">Explore / Create a Story</div>
        {/* Main Heading */}
        <h1 className="text-2xl sm:text-3xl font-semibold text-center mb-2">Lets create a <span className="text-[#7B2FF2]">story</span></h1>
        <p className="text-center text-gray-500 mb-6 max-w-lg mx-auto text-base font-normal">
          Create your first story, write a simple prompt! For example.<br />
          <span className="font-semibold text-black">Create a story about how to walk my dog</span>
        </p>
        {/* Toggle */}
        <div className="flex justify-center gap-6 mb-6">
          {['Story', 'Activity', 'Cards'].map(type => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`flex items-center gap-1 px-4 py-1.5 rounded-full border text-sm font-medium transition-all ${selectedType === type ? 'bg-[#F3F0FF] text-[#7B2FF2] border-[#7B2FF2] shadow' : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-100'}`}
            >
              {type}
            </button>
          ))}
        </div>
        {/* Prompt Input (refactored to match CarouselBoard) */}
        <div className="relative w-full max-w-3xl mb-8">
          <div className="w-full p-5 flex items-center border-2 rounded-lg border-gray-200">
            <div className="flex items-center pointer-events-none">
            </div>
            <input
              type="text"
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              placeholder="example: create a story about how to walk my dog"
              className="w-full px-5 py-5 rounded-lg focus:outline-none focus:ring-purple-500 focus:border-transparent text-gray-700 text-base"
            />
            {/* Search Icon/Button (right) */}
            <button
              type="button"
              className="flex items-center text-gray-400 justify-center h-10 w-10 ml-2 rounded-full hover:text-[#6100FF] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
              aria-label="Go to Create Story"
              // onClick={() => {}}
            >
              
             <Link href="/test" className=" flex items-center z-10">
        <button
          type="button"
          className="flex items-center text-gray-400 justify-center h-10 w-10 ml-2 rounded-full hover:text-[#6100FF]  transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 "
          aria-label="Go to Create Story"
        >
          <ArrowRight className="h-6 w-6" />
        </button>
      </Link>
            </button>
          </div>
        </div>
        {/* Set Preference */}
        <div className="w-full max-w-2xl mb-6">
          <div className="font-semibold text-sm mb-1">Set Preference</div>
          <div className="text-xs text-gray-400 mb-2">Choose a character for your stories and activities</div>
          <div className="flex gap-4 mb-2">
            {characters.map((char, idx) => (
              <button
                key={char.name}
                onClick={() => setSelectedCharacter(idx)}
                className={`flex flex-col items-center gap-1 px-2 py-1 rounded-lg border-2 ${selectedCharacter === idx ? 'border-[#7B2FF2] bg-[#F3F0FF]' : 'border-transparent bg-white'} transition`}
              >
                {char.img ? (
                  <Image src={char.img} alt={char.name} width={48} height={48} className="rounded-lg object-cover" />
                ) : (
                  <span className="w-12 h-12 flex items-center justify-center rounded-lg bg-gray-100 border-2 border-dashed border-gray-300 text-2xl text-gray-400">+</span>
                )}
                <span className="text-xs text-gray-700 text-center max-w-[60px] truncate">{char.name}</span>
              </button>
            ))}
            <button
              onClick={() => setIsCharacterModalOpen(true)}
              className={`flex flex-col items-center gap-1 px-2 py-1 rounded-lg border-transparent bg-white transition`}
            >
              <span className="w-12 h-12 flex items-center justify-center rounded-lg bg-gray-100 border-2 border-dashed border-gray-300 text-2xl text-gray-400">+</span>
              <span className="text-xs text-gray-700 text-center max-w-[60px] truncate"></span>
            </button>
          </div>
        </div>
        {/* Sample Prompts */}
        <div className="w-full max-w-5xl mx-auto">
          <div className="font-bold text-lg mb-1">Sample Prompts</div>
          <div className="text-sm text-gray-500 mb-4">Choose a sample prompt to create a story</div>
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 gap-4">
            {samplePrompts.map((sp, idx) => (
              <button
                key={idx}
                className="flex items-center w-full px-5 py-3 rounded-lg border border-gray-200 text-base text-gray-700 bg-white hover:border-gray-400 transition-all duration-200 truncate"
                style={{ fontWeight: 500 }}
                onClick={() => setPrompt(sp)}
              >
                <span className="text-yellow-500 mr-2 text-lg">&laquo;</span>
                <span className="truncate">{sp}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      <CreateCharacterModal
        isOpen={isCharacterModalOpen}
        onClose={() => setIsCharacterModalOpen(false)}
        onSave={(character) => {
          setCharacters((prev) => [...prev, { name: character.name, img: character.image }]);
          setSelectedCharacter(characters.length); // select the new one
          setIsCharacterModalOpen(false);
        }}
      />
    </div>
  );
} 