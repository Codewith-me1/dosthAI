'use client'

import { ArrowBigRight, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const characters = [
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
        {/* Prompt Input */}
        <div className="w-full h-30 max-w-2xl flex items-center bg-white border border-gray-200 rounded-xl px-3 py-3 shadow mb-8">
          <input
            type="text"
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            className="flex-1 bg-transparent outline-none text-gray-800 text-base sm:text-lg placeholder:text-gray-400"
            placeholder="example: create a story about how to walk my dog"
          />
          <ArrowRight className="text-gray-500"/>
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
            
                className={`flex flex-col items-center gap-1 px-2 py-1 rounded-lg  'border-transparent bg-white transition`}
              >
                  <span className="w-12 h-12 flex items-center justify-center rounded-lg bg-gray-100 border-2 border-dashed border-gray-300 text-2xl text-gray-400">+</span>
                <span className="text-xs text-gray-700 text-center max-w-[60px] truncate"></span>
              </button>
          </div>
        </div>
        {/* Sample Prompts */}
        <div className="w-full max-w-2xl">
          <div className="font-semibold text-sm mb-1">Sample Prompts</div>
          <div className="text-xs text-gray-400 mb-2">Choose a sample prompt to create a story</div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {samplePrompts.map((sp, idx) => (
              <button
                key={idx}
                className="w-full px-3 py-2 rounded-lg bg-[#F3F0FF] text-[#7B2FF2] text-xs font-medium shadow-sm border border-[#E0E0E0] text-left truncate"
              >
                {sp}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 